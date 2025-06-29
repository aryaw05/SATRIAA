<?php

namespace App\Http\Controllers;

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

    public function updateKapasitasDanKondisi(Request $request, Bus $bus)
    {
        $request->validate([
            'kapasitas_tempat_duduk' => 'integer',
            'kondisi' => 'string|max:255',
        ]);

        $bus->update([
            'kapasitas_tempat_duduk' => $request->kapasitas_tempat_duduk,
            'kondisi' => $request->kondisi,
        ]);

        return redirect()->back()->with('success', 'Kapasitas dan kondisi bus berhasil diperbarui');
    }
}
