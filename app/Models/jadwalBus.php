<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jadwalBus extends Model
{
    use HasFactory;
    protected $table = 'jadwal_buses'; // Ubah sesuai dengan nama tabel yang sesuai
    protected $primaryKey = 'id_jadwal';
    protected $fillable = [
        'id_bus',
        'id_halte',
        'waktu_berangkat',
        'waktu_tiba'
    ];
    public function bus()
    {
        return $this->belongsTo(Bus::class, 'id_bus');
    }

    public function halte()
    {
        return $this->belongsTo(Halte::class, 'id_halte');
    }
}
