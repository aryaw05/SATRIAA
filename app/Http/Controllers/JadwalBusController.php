<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalBus;
use App\Models\Bus;
use App\Models\Halte;
use Inertia\Inertia;

class JadwalBusController extends Controller
{



    public function store(Request $request)
    {
        $request->validate([
            'id_bus' => 'exists:buses,id_bus',
            'id_halte' => 'exists:haltes,id_halte',
            'waktu_berangkat' => 'required|date_format:H:i',
            'waktu_tiba' => 'required|date_format:H:i',
        ]);

        if ($request->waktu_tiba <= $request->waktu_berangkat) {
            return back()->withErrors(['waktu_tiba' => 'Waktu tiba harus setelah waktu berangkat'])->withInput();
        }

        JadwalBus::create($request->all());

        return redirect()->route('bus.index')->with('success', 'Jadwal berhasil ditambahkan');
    }

    // public function update(Request $request, $id)
    // {
    //     $jadwal = JadwalBus::findOrFail($id);
    //     $jadwal->update($request->all());

    //     return redirect()->route('bus.index')->with('success', 'Jadwal berhasil diupdate');
    // }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_bus' => 'required|exists:buses,id_bus',
            'id_halte' => 'required|exists:haltes,id_halte',
            'waktu_berangkat' => 'required|date_format:H:i:s',
            'waktu_tiba' => 'required|date_format:H:i:s|after:waktu_berangkat'
        ]);
        $jadwal = JadwalBus::findOrFail($id);
        $jadwal->update($validated);

        return redirect()->route('bus.index')->with('success', 'Jadwal berhasil diupdate');
    }

    public function destroy($id)
    {
        JadwalBus::destroy($id);

        return redirect()->route('bus.index')->with('success', 'Jadwal berhasil dihapus');
    }
}
