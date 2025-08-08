<?php

namespace App\Http\Controllers;

use App\Events\LocationUpdated;
use App\Models\TrackingBus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\updateKapasitasBusEvent;

class BusLocationController extends Controller
{
   public function updateLocation(Request $request)
    {
        $request->validate([
            'id_bus' => 'required|exists:buses,id_bus',
            'lokasi_lat' => 'required|numeric',
            'lokasi_long' => 'required|numeric',
        ]);

        // Simpan atau update data tracking
        $tracking = TrackingBus::updateOrCreate(
            ['id_bus' => $request->id_bus],
            [
                'lokasi_lat' => $request->lokasi_lat,
                'lokasi_long' => $request->lokasi_long,
                'waktu_update' => now(),
            ]
        );
          broadcast(new LocationUpdated([
              [
            'id_bus' => $tracking->id_bus,
            'lokasi_lat' => $tracking->lokasi_lat,
            'lokasi_long' => $tracking->lokasi_long,
          ]
        ]));

    }
      

}
