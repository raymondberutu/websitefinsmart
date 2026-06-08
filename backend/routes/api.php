<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\UmkmController;
use App\Http\Controllers\TransaksiQrisController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login/google-mock', [AuthController::class, 'mockGoogleLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

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
