<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'nama_umkm', 'lokasi', 'jenis_usaha', 'pendapatan'])]
class Umkm extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaksiQris()
    {
        return $this->hasMany(TransaksiQris::class);
    }

    public function creditScores()
    {
        return $this->hasMany(CreditScore::class);
    }
}
