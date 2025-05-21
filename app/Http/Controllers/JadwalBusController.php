<?php

namespace App\Http\Controllers;

use App\Models\jadwalBus;
use App\Models\Bus;
use App\Models\Halte;
use Illuminate\Http\Request;

class JadwalBusController extends Controller
{
    public function index()
    {
        $jadwal = jadwalBus::with(['bus', 'halte'])->get();
        $buses = Bus::all();
        $haltes = Halte::all();
        return view('crudDataBus', compact('jadwal', 'buses', 'haltes'));
    }


    public function create()
    {
        $buses = Bus::all();
        $haltes = Halte::all();
        return view('crudDataBus', compact('buses', 'haltes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_bus' => 'required|exists:buses,id_bus',
            'id_halte' => 'required|exists:haltes,id_halte',
            'waktu_berangkat' => 'required|date_format:H:i',
            'waktu_tiba' => 'required|date_format:H:i|after:waktu_berangkat',
        ]);

        jadwalBus::create($request->all());
        return redirect()->route('crudDataBus.index')->with('success', 'Jadwal bus berhasil ditambahkan.');
    }

    public function show(jadwalBus $jadwal)
    {
        return view('crudDataBus', compact('jadwal'));
    }

    public function edit(jadwalBus $jadwal)
    {
        $buses = Bus::all();
        $haltes = Halte::all();
        return view('crudDataBus', compact('jadwal', 'buses', 'haltes'));
    }

    public function update(Request $request, jadwalBus $jadwal)
    {
        $request->validate([
            'id_bus' => 'required|exists:buses,id_bus',
            'id_halte' => 'required|exists:haltes,id_halte',
            'waktu_berangkat' => 'required|date_format:H:i',
            'waktu_tiba' => 'required|date_format:H:i|after:waktu_berangkat',
        ]);


        $jadwal->update($request->all());
        return redirect()->route('crudDataBus.index')->with('success', 'Jadwal bus berhasil diperbarui.');
    }

    public function destroy(jadwalBus $jadwal)
    {
        $jadwal->delete();
        return redirect()->route('crudDataBus.index')->with('success', 'Jadwal bus berhasil dihapus.');
    }
}
