<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['judul', 'gambar', 'isi', 'penulis_id'])]
class Artikel extends Model
{
    public function penulis()
    {
        return $this->belongsTo(User::class, 'penulis_id');
    }
}
