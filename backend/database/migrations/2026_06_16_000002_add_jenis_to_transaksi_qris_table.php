<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transaksi_qris', function (Blueprint $table) {
            $table->enum('jenis', ['pemasukan', 'pengeluaran'])->default('pemasukan')->after('tanggal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksi_qris', function (Blueprint $table) {
            $table->dropColumn('jenis');
        });
    }
};
