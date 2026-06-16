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
        Schema::create('credit_simulations', function (Blueprint $table) {
            $table->string('id')->primary(); // we will use string ID like SIM-001
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('pendapatan', 15, 2);
            $table->integer('total_transaksi');
            $table->integer('lama_usaha');
            $table->integer('karyawan');
            $table->string('status_tempat');
            $table->integer('skor_akhir');
            $table->string('status_kelayakan');
            $table->string('plafon_rekomendasi');
            $table->string('bunga_rekomendasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_simulations');
    }
};
