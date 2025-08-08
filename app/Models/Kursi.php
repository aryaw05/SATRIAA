<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kursi extends Model
{
    use HasFactory;
    protected $table = 'ketersediaan_tempat_duduk'; // Ubah sesuai dengan nama tabel yang sesuai
    protected $primaryKey = 'id_ketersediaan';
    public $timestamps = false;
    protected $fillable = [
        'id_bus',
        'tempat_duduk_tersedia',
        'waktu_update'
    ];
    
}
