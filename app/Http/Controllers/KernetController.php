<?php

namespace App\Http\Controllers;

use App\Events\updateKapasitasBusEvent;
use App\Models\Bus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KernetController extends Controller
{
    public function index()
    {
        // Ambil semua data bus (tanpa filter status)
        $buses = Bus::all();
        return Inertia::render('Kernet/kernet', compact('buses'));
    }

    public function updateBusStatus(Request $request, Bus $bus)
    {
        $request->validate([
            'status' => 'required|string|max:255',
        ]);

        $bus->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status bus berhasil diperbarui');
    }


    public function updateKapasitas(Request $request, Bus $bus)
{
    $request->validate([
        'kapasitas_tempat_duduk' => 'integer',
    ]);

    $bus->fill([
        'kapasitas_tempat_duduk' => $request->kapasitas_tempat_duduk,
    ]);

    $kapasitasBerubah = $bus->isDirty('kapasitas_tempat_duduk'); 

    $bus->save();

    if ($kapasitasBerubah) {
        broadcast(new updateKapasitasBusEvent([
            [
                'id_bus' => $bus->id_bus,
                'kepadatan' => $bus->kapasitas_tempat_duduk,
            ]
        ]));
    }

    return redirect()->back()->with('success', 'Kapasitas dan kondisi bus berhasil diperbarui');
}
 public function updateKondisi(Request $request, Bus $bus)
{
    $request->validate([
        'kondisi' => 'string|max:255',
    ]);

    $bus->fill([
        'kondisi' => $request->kondisi,
    ]);

    $kapasitasBerubah = $bus->isDirty('kondisi'); 

    $bus->save();

    if ($kapasitasBerubah) {
        broadcast(new updateKapasitasBusEvent([
            [
                'id_bus' => $bus->id_bus,
                'kondisi' => $bus->kondisi,
            ]
        ]));
    }

    return redirect()->back()->with('success', 'Kapasitas dan kondisi bus berhasil diperbarui');
}

    public function updateStatus ( Request $request, Bus $bus)
    {
        $request->validate([
            'status' => 'boolean',
        ]);

        $bus->update([
            'status' => $request->status,
        ]);
        
        return redirect()->back()->with('success', 'Status bus berhasil diperbarui');

    }
}
