<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kernet extends Model
{
    // Menentukan kolom yang dapat diisi secara massal
    protected $fillable = [
        'nama', 
        'alamat', 
        'telepon'
    ];

    // Menentukan nama tabel jika tidak mengikuti konvensi Laravel
    protected $table = 'kernet'; // Jika nama tabel Anda berbeda

    // Menonaktifkan penggunaan created_at dan updated_at jika tidak ada di tabel
    public $timestamps = false; // Jika tabel tidak menggunakan kolom timestamps
}
