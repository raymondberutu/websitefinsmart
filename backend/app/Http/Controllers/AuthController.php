<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
                'confirmed'
            ],
            'role' => 'in:admin,user',
        ]);

        $role = $request->role ?? 'user';
        // Generate a 6-digit verification code
        $verificationCode = sprintf("%06d", mt_rand(1, 999999));

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $role,
            'verification_code' => $verificationCode,
        ]);

        // In a real application, we would email/SMS the verification code here.
        // For development, we just return a success message.

        return response()->json([
            'message' => 'Registrasi berhasil. Silakan periksa email Anda untuk kode verifikasi.',
            // Including code for testing purpose
            'dev_verification_code' => $verificationCode 
        ], 201);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan.'], 404);
        }

        if ($user->email_verified_at) {
            return response()->json(['message' => 'Akun sudah diverifikasi sebelumnya.'], 400);
        }

        if ($user->verification_code !== $request->code) {
            return response()->json(['message' => 'Kode verifikasi tidak valid.'], 400);
        }

        $user->email_verified_at = now();
        $user->verification_code = null;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Akun berhasil diverifikasi.',
            'user' => $user->load('umkm'),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string', // Can be email or username
            'password' => 'required',
        ]);

        $user = User::where('email', $request->identifier)
                    ->orWhere('username', $request->identifier)
                    ->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'identifier' => ['Kredensial yang diberikan tidak cocok dengan data kami.'],
            ]);
        }

        if (!$user->email_verified_at) {
            return response()->json([
                'message' => 'Akun belum diverifikasi. Silakan masukkan kode verifikasi yang dikirim ke email Anda.',
                'requires_verification' => true,
                'email' => $user->email
            ], 403);
        }

        if ($user->two_factor_enabled) {
            $user->two_factor_code = sprintf("%06d", mt_rand(1, 999999));
            $user->save();

            // Simulate sending email/SMS
            error_log("2FA Code for {$user->email}: {$user->two_factor_code}");

            return response()->json([
                'message' => 'Verifikasi Dua Langkah diperlukan.',
                'requires_2fa' => true,
                'email' => $user->email,
                'dev_2fa_code' => $user->two_factor_code
            ], 200);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('umkm'),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function verify2FA(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->two_factor_code !== $request->code) {
            return response()->json(['message' => 'Kode OTP tidak valid.'], 400);
        }

        $user->two_factor_code = null;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'user' => $user->load('umkm'),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'token' => Hash::make($token),
                'created_at' => now()
            ]
        );

        // In a real application, send the token via email here.

        return response()->json([
            'message' => 'Link reset password telah dikirim ke email Anda.',
            'dev_token' => $token // For testing
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/',
                'confirmed'
            ],
        ]);

        $resetRecord = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$resetRecord || !Hash::check($request->token, $resetRecord->token)) {
            return response()->json(['message' => 'Token tidak valid atau sudah kadaluarsa.'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password berhasil diubah. Silakan login dengan password baru.']);
    }

    public function mockGoogleLogin(Request $request)
    {
        $user = User::firstOrCreate(
            ['email' => 'raymondberutu@gmail.com'],
            [
                'name' => 'Raymond Berutu',
                'username' => 'raymond',
                'password' => Hash::make('password123'),
                'role' => 'user',
                'email_verified_at' => now()
            ]
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('umkm'),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user()->load('umkm'));
    }
}
