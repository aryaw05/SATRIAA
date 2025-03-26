<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Halte extends Model
{
    use HasFactory;

    use HasFactory;
    protected $table = 'haltes'; // Ubah sesuai dengan nama tabel yang sesuai
    protected $primaryKey = 'id_halte';
    protected $fillable = [
        'nama_halte',
        'lokasi_lat',
        'lokasi_long'
    ];
}

