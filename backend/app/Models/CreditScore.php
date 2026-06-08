<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['umkm_id', 'score', 'kategori', 'status_kelayakan'])]
class CreditScore extends Model
{
    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}
