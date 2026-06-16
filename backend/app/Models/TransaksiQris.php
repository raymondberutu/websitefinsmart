<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['umkm_id', 'tanggal', 'jenis', 'nominal', 'metode_pembayaran', 'status'])]
class TransaksiQris extends Model
{
    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}
