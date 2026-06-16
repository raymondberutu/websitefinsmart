<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditSimulation extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'pendapatan',
        'total_transaksi',
        'lama_usaha',
        'karyawan',
        'status_tempat',
        'skor_akhir',
        'status_kelayakan',
        'plafon_rekomendasi',
        'bunga_rekomendasi',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
