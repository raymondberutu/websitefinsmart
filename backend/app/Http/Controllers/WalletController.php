<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller
{
    public function getDashboard(Request $request)
    {
        $user = $request->user();
        $recentTransactions = WalletTransaction::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();
            
        return response()->json([
            'saldo' => $user->saldo,
            'recent_transactions' => $recentTransactions
        ]);
    }

    public function riwayat(Request $request)
    {
        $user = $request->user();
        $transactions = WalletTransaction::where('user_id', $user->id)
            ->latest()
            ->get();
            
        return response()->json($transactions);
    }

    public function topUp(Request $request)
    {
        $request->validate([
            'nominal' => 'required|numeric|min:10000',
            'metode' => 'required|string'
        ]);

        $user = $request->user();

        DB::beginTransaction();
        try {
            $saldoSebelum = $user->saldo;
            $user->saldo += $request->nominal;
            $user->save();

            $transaction = WalletTransaction::create([
                'user_id' => $user->id,
                'tipe' => 'top_up',
                'nominal' => $request->nominal,
                'saldo_sebelum' => $saldoSebelum,
                'saldo_sesudah' => $user->saldo,
                'referensi' => $request->metode,
                'deskripsi' => 'Top Up Saldo via ' . $request->metode,
                'status' => 'Berhasil'
            ]);

            DB::commit();
            return response()->json([
                'message' => 'Top Up berhasil',
                'saldo' => $user->saldo,
                'transaction' => $transaction
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Top Up gagal diproses'], 500);
        }
    }

    public function transfer(Request $request)
    {
        $user = $request->user();
        
        if (!$user->pin) {
            return response()->json(['message' => 'Silakan buat PIN Transaksi di menu Pengaturan/Keamanan terlebih dahulu.'], 403);
        }

        $request->validate([
            'tujuan' => 'required|string',
            'nominal' => 'required|numeric|min:10000',
            'pin' => 'required|string',
            'catatan' => 'nullable|string'
        ]);

        if (!Hash::check($request->pin, $user->pin)) {
            return response()->json(['message' => 'PIN Transaksi tidak valid.'], 403);
        }

        if ($user->saldo < $request->nominal) {
            return response()->json(['message' => 'Saldo tidak mencukupi.'], 400);
        }

        $tujuanUser = User::where('email', $request->tujuan)->orWhere('username', $request->tujuan)->first();

        if (!$tujuanUser) {
            return response()->json(['message' => 'Pengguna tujuan tidak ditemukan.'], 404);
        }

        if ($tujuanUser->id === $user->id) {
            return response()->json(['message' => 'Tidak dapat transfer ke akun sendiri.'], 400);
        }

        DB::beginTransaction();
        try {
            // Deduct sender
            $senderSaldoSebelum = $user->saldo;
            $user->saldo -= $request->nominal;
            $user->save();

            $senderTrx = WalletTransaction::create([
                'user_id' => $user->id,
                'tipe' => 'transfer_out',
                'nominal' => $request->nominal,
                'saldo_sebelum' => $senderSaldoSebelum,
                'saldo_sesudah' => $user->saldo,
                'referensi' => $tujuanUser->email,
                'deskripsi' => $request->catatan ?? ('Transfer ke ' . $tujuanUser->name),
                'status' => 'Berhasil'
            ]);

            // Add to receiver
            $receiverSaldoSebelum = $tujuanUser->saldo;
            $tujuanUser->saldo += $request->nominal;
            $tujuanUser->save();

            WalletTransaction::create([
                'user_id' => $tujuanUser->id,
                'tipe' => 'transfer_in',
                'nominal' => $request->nominal,
                'saldo_sebelum' => $receiverSaldoSebelum,
                'saldo_sesudah' => $tujuanUser->saldo,
                'referensi' => $user->email,
                'deskripsi' => $request->catatan ?? ('Menerima transfer dari ' . $user->name),
                'status' => 'Berhasil'
            ]);

            DB::commit();
            return response()->json([
                'message' => 'Transfer berhasil',
                'saldo' => $user->saldo,
                'transaction' => $senderTrx
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Transfer gagal diproses'], 500);
        }
    }

    public function pembayaran(Request $request)
    {
        $user = $request->user();
        
        if (!$user->pin) {
            return response()->json(['message' => 'Silakan buat PIN Transaksi di menu Pengaturan/Keamanan terlebih dahulu.'], 403);
        }

        $request->validate([
            'jenis_tagihan' => 'required|string',
            'nomor_pelanggan' => 'required|string',
            'nominal' => 'required|numeric|min:1000',
            'pin' => 'required|string'
        ]);

        if (!Hash::check($request->pin, $user->pin)) {
            return response()->json(['message' => 'PIN Transaksi tidak valid.'], 403);
        }

        if ($user->saldo < $request->nominal) {
            return response()->json(['message' => 'Saldo tidak mencukupi.'], 400);
        }

        DB::beginTransaction();
        try {
            $saldoSebelum = $user->saldo;
            $user->saldo -= $request->nominal;
            $user->save();

            $transaction = WalletTransaction::create([
                'user_id' => $user->id,
                'tipe' => 'pembayaran',
                'nominal' => $request->nominal,
                'saldo_sebelum' => $saldoSebelum,
                'saldo_sesudah' => $user->saldo,
                'referensi' => $request->nomor_pelanggan,
                'deskripsi' => 'Pembayaran ' . $request->jenis_tagihan . ' (' . $request->nomor_pelanggan . ')',
                'status' => 'Berhasil'
            ]);

            DB::commit();
            return response()->json([
                'message' => 'Pembayaran berhasil',
                'saldo' => $user->saldo,
                'transaction' => $transaction
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Pembayaran gagal diproses'], 500);
        }
    }
}
