<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20',
            'receive_notifications' => 'boolean',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->receive_notifications = $request->has('receive_notifications') ? $request->boolean('receive_notifications') : $user->receive_notifications;

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->profile_photo && Storage::disk('public')->exists($user->profile_photo)) {
                Storage::disk('public')->delete($user->profile_photo);
            }

            $path = $request->file('photo')->store('profile_photos', 'public');
            $user->profile_photo = $path;
        }

        $user->save();

        return response()->json([
            'message' => 'Profil berhasil diperbarui.',
            'user' => $user->load('umkm')
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/',
                'confirmed',
                'different:current_password'
            ],
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password saat ini tidak cocok.'],
            ]);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password berhasil diubah.'
        ]);
    }

    public function setupPin(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'pin' => 'required|digits:6|confirmed'
        ]);

        $user->pin = Hash::make($request->pin);
        $user->save();

        return response()->json(['message' => 'PIN Transaksi berhasil disimpan.']);
    }

    public function toggle2FA(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'enabled' => 'required|boolean'
        ]);

        $user->two_factor_enabled = $request->enabled;
        if (!$request->enabled) {
            $user->two_factor_code = null;
        }
        $user->save();

        $status = $user->two_factor_enabled ? 'diaktifkan' : 'dinonaktifkan';
        return response()->json([
            'message' => "Verifikasi 2 Langkah berhasil $status.",
            'user' => $user
        ]);
    }
}
