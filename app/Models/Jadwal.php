<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{

    protected $table = 'jadwal';
    protected $fillable = ['bus_id', 'nama_halte', 'waktu_berangkat', 'waktu_tiba'];

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }
}
