<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackingBus extends Model
{
    use HasFactory;

    protected $table = 'tracking_buses'; 

    protected $primaryKey = 'id_tracking'; 

    protected $fillable = [
        'id_bus',
        'lokasi_lat',
        'lokasi_long',
        'waktu_update',
    ];

    public $timestamps = false; 

    public function bus()
    {
        return $this->belongsTo(Bus::class, 'id_bus', 'id_bus');
    }
}
