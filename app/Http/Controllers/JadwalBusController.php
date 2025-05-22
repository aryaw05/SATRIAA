<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JadwalBus;
use App\Models\Bus;
use App\Models\Halte;

class JadwalBusController extends Controller
{
    public function index()
    {
        $jadwal = JadwalBus::with(['bus', 'halte'])->get();
        $buses = Bus::all();
        $haltes = Halte::all();
        return view('crudDataBus', compact('jadwal', 'buses', 'haltes'));
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

        return redirect()->route('index')->with('success', 'Jadwal berhasil ditambahkan');
    }

    public function update(Request $request, $id)
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
        $jadwal = JadwalBus::findOrFail($id);
        $jadwal->update($request->all());

        return redirect()->route('index')->with('success', 'Jadwal berhasil diupdate');
    }

    public function destroy($id)
    {
        JadwalBus::destroy($id);

        return redirect()->route('index')->with('success', 'Jadwal berhasil dihapus');
    }
}
