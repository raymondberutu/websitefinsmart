<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UmkmController extends Controller
{
    public function show(Request $request)
    {
        $umkm = $request->user()->umkm;
        if (!$umkm) {
            return response()->json(['message' => 'UMKM not found'], 404);
        }
        return response()->json($umkm);
    }

    public function update(Request $request)
    {
        $request->validate([
            'nama_umkm' => 'required|string|max:255',
            'jenis_usaha' => 'required|string|max:100',
            'lokasi' => 'required|string',
            'pendapatan' => 'required|numeric',
        ]);

        $user = $request->user();
        
        $umkm = $user->umkm()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'nama_umkm' => $request->nama_umkm,
                'jenis_usaha' => $request->jenis_usaha,
                'lokasi' => $request->lokasi,
                'pendapatan' => $request->pendapatan,
            ]
        );

        return response()->json([
            'message' => 'Profil UMKM berhasil disimpan',
            'umkm' => $umkm
        ]);
    }

    // For Admin
    public function index()
    {
        $umkms = Umkm::with('user')->latest()->get();
        return response()->json($umkms);
    }

    public function destroy($id)
    {
        $umkm = Umkm::findOrFail($id);
        $umkm->delete();
        return response()->json(['message' => 'UMKM berhasil dihapus']);
    }
}
