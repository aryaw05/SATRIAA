<?php

namespace App\Http\Controllers;

use App\Events\DataHalteEvent;
use App\Models\Bus;
use App\Models\Halte;
use Illuminate\Http\Request;
use App\Models\JadwalBus;
use Inertia\Inertia;

class JadwalBusController extends Controller
{

    public function index()
    {
        $jadwal = JadwalBus::with(['bus', 'halte'])->get();
        $buses  = Bus::all();
        $halte  = Halte::all();
        return Inertia::render('Admin/Jadwal/Index', [
            'jadwal' => $jadwal,
            'buses' => $buses,
            'halte' => $halte
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_bus' => 'required|exists:buses,id_bus',
            'id_halte' => 'required|exists:haltes,id_halte',
            'waktu_berangkat' => 'required|date_format:H:i',
            'waktu_tiba' => 'required|date_format:H:i',
        ]);

        if ($request->waktu_tiba <= $request->waktu_berangkat) {
            return back()->withErrors(['waktu_tiba' => 'Waktu tiba harus setelah waktu berangkat'])->withInput();
        }

        JadwalBus::create($request->all());

           // Ambil nama bus dan nama halte berdasarkan ID
    $namaBus = Bus::where('id_bus', $request->id_bus)->value('nomor_bus');
    $namaHalte = Halte::where('id_halte', $request->id_halte)->value('nama_halte');

    // Broadcast event
    broadcast(new DataHalteEvent(
        $namaBus,
        $namaHalte,
        $request->waktu_berangkat,
        $request->waktu_tiba
    ));

        return redirect()->route('bus.index')->with('success', 'Jadwal berhasil ditambahkan');

        // broadcast(new DataHalteEvent())
    }

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
