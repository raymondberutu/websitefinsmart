<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\UmkmController;
use App\Http\Controllers\TransaksiQrisController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login/google-mock', [AuthController::class, 'mockGoogleLogin']);
    Route::post('/login/verify-2fa', [AuthController::class, 'verify2FA']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Profile & Security Routes
        Route::post('/user/profile', [\App\Http\Controllers\ProfileController::class, 'updateProfile']);
        Route::post('/user/change-password', [\App\Http\Controllers\ProfileController::class, 'changePassword']);
        Route::post('/user/setup-pin', [\App\Http\Controllers\ProfileController::class, 'setupPin']);
        Route::post('/user/toggle-2fa', [\App\Http\Controllers\ProfileController::class, 'toggle2FA']);

        // E-Wallet Routes
        Route::get('/wallet/dashboard', [\App\Http\Controllers\WalletController::class, 'getDashboard']);
        Route::get('/wallet/riwayat', [\App\Http\Controllers\WalletController::class, 'riwayat']);
        Route::post('/wallet/topup', [\App\Http\Controllers\WalletController::class, 'topUp']);
        Route::post('/wallet/transfer', [\App\Http\Controllers\WalletController::class, 'transfer']);
        Route::post('/wallet/pembayaran', [\App\Http\Controllers\WalletController::class, 'pembayaran']);

        // Credit Scoring & Analysis Routes
        Route::post('/credit/simulate', [\App\Http\Controllers\CreditScoringController::class, 'simulate']);
        Route::get('/credit/history', [\App\Http\Controllers\CreditScoringController::class, 'history']);
        Route::get('/credit/analysis', [\App\Http\Controllers\CreditScoringController::class, 'analysis']);
        Route::get('/credit/recommendations', [\App\Http\Controllers\CreditScoringController::class, 'recommendations']);

    // UMKM Routes
    Route::get('/umkm/me', [UmkmController::class, 'show']);
    Route::post('/umkm', [UmkmController::class, 'update']);
    Route::get('/admin/umkm', [UmkmController::class, 'index']);
    Route::delete('/admin/umkm/{id}', [UmkmController::class, 'destroy']);

    // Transaksi Routes
    Route::get('/transaksi/export', [TransaksiQrisController::class, 'exportCsv']);
    Route::apiResource('transaksi', TransaksiQrisController::class);

    // Admin Specific Routes
    Route::get('/admin/users', [\App\Http\Controllers\AdminController::class, 'indexUsers']);
    Route::post('/admin/users', [\App\Http\Controllers\AdminController::class, 'storeUser']);
    Route::delete('/admin/users/{id}', [\App\Http\Controllers\AdminController::class, 'destroyUser']);
    
    Route::get('/admin/artikels', [\App\Http\Controllers\AdminController::class, 'indexArtikels']);
    Route::post('/admin/artikels', [\App\Http\Controllers\AdminController::class, 'storeArtikel']);
    Route::delete('/admin/artikels/{id}', [\App\Http\Controllers\AdminController::class, 'destroyArtikel']);
});
