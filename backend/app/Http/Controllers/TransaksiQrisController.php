<?php

namespace App\Http\Controllers;

use App\Models\TransaksiQris;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TransaksiQrisController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // If user is not admin, only show their umkm's transactions
        if ($user->role !== 'admin') {
            if (!$user->umkm) {
                return response()->json([]);
            }
            $transactions = TransaksiQris::where('umkm_id', $user->umkm->id)->latest()->get();
        } else {
            $transactions = TransaksiQris::with('umkm')->latest()->get();
        }
        
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            if (!$user->umkm) {
                return response()->json(['message' => 'Silakan lengkapi profil UMKM Anda terlebih dahulu.'], 403);
            }
            if (!$user->pin) {
                return response()->json(['message' => 'Silakan buat PIN Transaksi di menu Pengaturan/Keamanan terlebih dahulu.'], 403);
            }
            if (!$request->pin || !Hash::check($request->pin, $user->pin)) {
                return response()->json(['message' => 'PIN Transaksi tidak valid.'], 403);
            }
        }

        $request->validate([
            'tanggal' => 'required|date',
            'jenis' => 'required|in:pemasukan,pengeluaran',
            'nominal' => 'required|numeric|min:0',
            'metode_pembayaran' => 'required|string|max:50',
            'status' => 'required|string|max:20',
        ]);

        $transaksi = TransaksiQris::create([
            'umkm_id' => $user->umkm->id,
            'tanggal' => $request->tanggal,
            'jenis' => $request->jenis,
            'nominal' => $request->nominal,
            'metode_pembayaran' => $request->metode_pembayaran,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Transaksi berhasil ditambahkan', 'data' => $transaksi], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'jenis' => 'required|in:pemasukan,pengeluaran',
            'nominal' => 'required|numeric|min:0',
            'metode_pembayaran' => 'required|string|max:50',
            'status' => 'required|string|max:20',
        ]);

        $transaksi = TransaksiQris::findOrFail($id);
        
        // Ensure user owns this transaction unless admin
        if ($request->user()->role !== 'admin') {
            if (!$request->user()->umkm || $transaksi->umkm_id !== $request->user()->umkm->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $user = $request->user();
            if (!$user->pin) {
                return response()->json(['message' => 'Silakan buat PIN Transaksi di menu Pengaturan/Keamanan terlebih dahulu.'], 403);
            }
            if (!$request->pin || !Hash::check($request->pin, $user->pin)) {
                return response()->json(['message' => 'PIN Transaksi tidak valid.'], 403);
            }
        }

        $transaksi->update($request->only(['tanggal', 'jenis', 'nominal', 'metode_pembayaran', 'status']));

        return response()->json(['message' => 'Transaksi berhasil diperbarui', 'data' => $transaksi]);
    }

    public function destroy(Request $request, $id)
    {
        $transaksi = TransaksiQris::findOrFail($id);
        
        // Ensure user owns this transaction unless admin
        if ($request->user()->role !== 'admin') {
            if (!$request->user()->umkm || $transaksi->umkm_id !== $request->user()->umkm->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $user = $request->user();
            if (!$user->pin) {
                return response()->json(['message' => 'Silakan buat PIN Transaksi di menu Pengaturan/Keamanan terlebih dahulu.'], 403);
            }
            if (!$request->pin || !Hash::check($request->pin, $user->pin)) {
                return response()->json(['message' => 'PIN Transaksi tidak valid.'], 403);
            }
        }

        $transaksi->delete();

        return response()->json(['message' => 'Transaksi berhasil dihapus']);
    }

    public function exportCsv(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'admin') {
            if (!$user->umkm) {
                return response()->json(['message' => 'UMKM not found'], 404);
            }
            $transactions = TransaksiQris::where('umkm_id', $user->umkm->id)->latest()->get();
        } else {
            $transactions = TransaksiQris::with('umkm')->latest()->get();
        }

        $csvFileName = 'laporan_transaksi_' . date('Y_m_d_His') . '.csv';
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$csvFileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use($transactions, $user) {
            $file = fopen('php://output', 'w');
            
            if ($user->role === 'admin') {
                fputcsv($file, ['ID', 'UMKM', 'Tanggal', 'Jenis', 'Nominal', 'Metode', 'Status']);
                foreach ($transactions as $row) {
                    fputcsv($file, [$row->id, $row->umkm->nama_umkm ?? 'Unknown', $row->tanggal, $row->jenis, $row->nominal, $row->metode_pembayaran, $row->status]);
                }
            } else {
                fputcsv($file, ['ID', 'Tanggal', 'Jenis', 'Nominal', 'Metode', 'Status']);
                foreach ($transactions as $row) {
                    fputcsv($file, [$row->id, $row->tanggal, $row->jenis, $row->nominal, $row->metode_pembayaran, $row->status]);
                }
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
