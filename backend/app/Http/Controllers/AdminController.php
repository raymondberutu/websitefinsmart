<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // === USER MANAGEMENT ===
    public function indexUsers()
    {
        return response()->json(User::with('umkm')->latest()->get());
    }

    public function storeUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,user',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json(['message' => 'User berhasil dibuat', 'data' => $user], 201);
    }

    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User berhasil dihapus']);
    }

    // === ARTIKEL (EDUKASI) MANAGEMENT ===
    public function indexArtikels()
    {
        return response()->json(Artikel::latest()->get());
    }

    public function storeArtikel(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'gambar' => 'nullable|string',
        ]);

        $artikel = Artikel::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'gambar' => $request->gambar,
            'penulis_id' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Artikel berhasil diterbitkan', 'data' => $artikel], 201);
    }

    public function destroyArtikel($id)
    {
        $artikel = Artikel::findOrFail($id);
        $artikel->delete();
        return response()->json(['message' => 'Artikel berhasil dihapus']);
    }
}
