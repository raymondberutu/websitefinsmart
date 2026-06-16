<?php

namespace App\Http\Controllers;

use App\Models\CreditSimulation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CreditScoringController extends Controller
{
    public function simulate(Request $request)
    {
        $request->validate([
            'pendapatan' => 'required|numeric',
            'total_transaksi' => 'required|numeric',
            'lama_usaha' => 'required|numeric',
            'karyawan' => 'required|numeric',
            'status_tempat' => 'required|string',
        ]);

        $score = 0;

        // 1. Pendapatan
        if ($request->pendapatan > 10000000) {
            $score += 300;
        } elseif ($request->pendapatan >= 5000000) {
            $score += 200;
        } else {
            $score += 100;
        }

        // 2. Transaksi
        if ($request->total_transaksi > 100) {
            $score += 200;
        } elseif ($request->total_transaksi >= 50) {
            $score += 150;
        } else {
            $score += 100;
        }

        // 3. Lama Usaha
        if ($request->lama_usaha > 24) {
            $score += 200;
        } elseif ($request->lama_usaha >= 12) {
            $score += 150;
        } else {
            $score += 100;
        }

        // 4. Karyawan
        if ($request->karyawan > 5) {
            $score += 150;
        } elseif ($request->karyawan >= 2) {
            $score += 100;
        } else {
            $score += 50;
        }

        // 5. Tempat
        if ($request->status_tempat === 'Milik Sendiri') {
            $score += 150;
        } elseif ($request->status_tempat === 'Sewa') {
            $score += 100;
        } else {
            $score += 50;
        }

        // Tentukan Status dan Plafon
        $status = 'Tidak Layak';
        $plafon = 'Tidak ada';
        $bunga = '-';

        if ($score >= 800) {
            $status = 'Sangat Layak';
            $plafon = 'Rp 25.000.000 - Rp 50.000.000';
            $bunga = '0.5% - 0.8% per bulan';
        } elseif ($score >= 600) {
            $status = 'Layak';
            $plafon = 'Rp 10.000.000 - Rp 25.000.000';
            $bunga = '0.9% - 1.2% per bulan';
        } elseif ($score >= 400) {
            $status = 'Kurang Layak';
            $plafon = 'Rp 2.000.000 - Rp 10.000.000';
            $bunga = '1.3% - 1.5% per bulan';
        }

        $id = 'SIM-' . strtoupper(Str::random(6));

        $simulation = CreditSimulation::create([
            'id' => $id,
            'user_id' => $request->user()->id,
            'pendapatan' => $request->pendapatan,
            'total_transaksi' => $request->total_transaksi,
            'lama_usaha' => $request->lama_usaha,
            'karyawan' => $request->karyawan,
            'status_tempat' => $request->status_tempat,
            'skor_akhir' => $score,
            'status_kelayakan' => $status,
            'plafon_rekomendasi' => $plafon,
            'bunga_rekomendasi' => $bunga,
        ]);

        return response()->json($simulation);
    }

    public function history(Request $request)
    {
        $history = CreditSimulation::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($history);
    }

    public function analysis(Request $request)
    {
        $latest = CreditSimulation::where('user_id', $request->user()->id)
            ->latest()
            ->first();

        if (!$latest) {
            return response()->json(null);
        }

        // Kalkulasi persentase untuk chart
        // Cashflow = f(Pendapatan)
        $cashflow = min(100, max(20, ($latest->pendapatan / 10000000) * 100));
        // Capacity = f(Transaksi)
        $capacity = min(100, max(20, ($latest->total_transaksi / 100) * 100));
        // Risk = inverse f(Lama Usaha + Tempat)
        // Skor lama usaha & tempat max = 200 + 150 = 350
        $riskScoreRaw = 0;
        if ($latest->lama_usaha > 24) $riskScoreRaw += 200;
        elseif ($latest->lama_usaha >= 12) $riskScoreRaw += 150;
        else $riskScoreRaw += 100;

        if ($latest->status_tempat === 'Milik Sendiri') $riskScoreRaw += 150;
        elseif ($latest->status_tempat === 'Sewa') $riskScoreRaw += 100;
        else $riskScoreRaw += 50;

        $risk = 100 - min(100, max(10, ($riskScoreRaw / 350) * 100)); // The lower the riskScoreRaw, the higher the risk percentage

        return response()->json([
            'skor' => $latest->skor_akhir,
            'status' => $latest->status_kelayakan,
            'metrics' => [
                'cashflow' => round($cashflow),
                'capacity' => round($capacity),
                'risk' => round($risk)
            ]
        ]);
    }

    public function recommendations(Request $request)
    {
        $latest = CreditSimulation::where('user_id', $request->user()->id)
            ->latest()
            ->first();

        if (!$latest) {
            return response()->json([]);
        }

        $score = $latest->skor_akhir;
        $recommendations = [];

        if ($score >= 800) {
            $recommendations[] = ['id' => 1, 'bank' => 'Bank Rakyat Indonesia (BRI)', 'product' => 'KUR Mikro BRI', 'rate' => '0.2%', 'limit' => 'S.d Rp 50 Juta', 'matched' => 98];
            $recommendations[] = ['id' => 2, 'bank' => 'Bank Mandiri', 'product' => 'Kredit Usaha Mikro', 'rate' => '0.5%', 'limit' => 'S.d Rp 25 Juta', 'matched' => 90];
        } elseif ($score >= 600) {
            $recommendations[] = ['id' => 2, 'bank' => 'Bank Mandiri', 'product' => 'Kredit Usaha Mikro', 'rate' => '0.5%', 'limit' => 'S.d Rp 25 Juta', 'matched' => 88];
            $recommendations[] = ['id' => 3, 'bank' => 'Amartha FinTech', 'product' => 'Modal Kerja Syariah', 'rate' => '1.1%', 'limit' => 'S.d Rp 15 Juta', 'matched' => 80];
        } elseif ($score >= 400) {
            $recommendations[] = ['id' => 3, 'bank' => 'Amartha FinTech', 'product' => 'Modal Kerja Syariah', 'rate' => '1.1%', 'limit' => 'S.d Rp 15 Juta', 'matched' => 75];
            $recommendations[] = ['id' => 4, 'bank' => 'KoinWorks', 'product' => 'KoinBisnis', 'rate' => '1.5%', 'limit' => 'S.d Rp 10 Juta', 'matched' => 65];
        } else {
            $recommendations[] = ['id' => 5, 'bank' => 'Mekaar PNM', 'product' => 'Pendanaan Ultra Mikro', 'rate' => '2.0%', 'limit' => 'S.d Rp 3 Juta', 'matched' => 60];
        }

        return response()->json($recommendations);
    }

    public function indexAll(Request $request)
    {
        $history = CreditSimulation::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($history);
    }
}
