<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tipe',
        'nominal',
        'saldo_sebelum',
        'saldo_sesudah',
        'referensi',
        'deskripsi',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
