<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;
    protected $table = 'buses'; // Ubah sesuai dengan nama tabel yang sesuai
    protected $primaryKey = 'id_bus';
    protected $fillable = [
        'nomor_bus',
        'plat_nomor',
        'jenis_bus',
        'kapasitas_tempat_duduk',
        'status',
        'kondisi',
        'password'

    ];
}
