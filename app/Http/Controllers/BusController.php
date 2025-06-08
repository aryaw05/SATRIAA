<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusController extends Controller
{
    // Menampilkan semua data bus
    public function index()
    {
        $buses = Bus::all();
    }

    // Menampilkan form input bus
    public function create()
    {
        return view('bus.create'); // view untuk form tambah bus
    }

    // Simpan data bus
    public function store(Request $request)
    {
        $request->validate([
            'nomor_bus' => 'required|string|max:20',
            'rute' => 'required|string|max:255',
            'kapasitas_tempat_duduk' => 'required|integer',
            'status' => 'required|string|max:255',
            'kondisi' => 'required|string|max:255',
        ]);

        Bus::create($request->all());

        // Redirect ke halaman list bus dengan pesan sukses
        return redirect()->route('bus.index')->with('success', 'Bus berhasil ditambahkan');
    }

    // Menampilkan form edit bus
    public function edit(Bus $bus)
    {
        return view('bus.edit', compact('bus'));  // view untuk form edit bus
    }

    // Update data bus
    public function update(Request $request, Bus $bus)
    {
        $request->validate([
            'nomor_bus' => 'required|string|max:20',
            'rute' => 'required|string|max:255',
            'kapasitas_tempat_duduk' => 'required|integer',
            'status' => 'required|string|max:255',
            'kondisi' => 'required|string|max:255',
        ]);

        $bus->update($request->all());

        // Redirect ke halaman list bus dengan pesan sukses
        return redirect()->route('bus.index')->with('success', 'Bus berhasil diupdate');
    }

    // Hapus data bus
    public function destroy(Bus $bus)
    {
        $bus->delete();

        // Redirect ke halaman list bus dengan pesan sukses
        return redirect()->route('bus.index')->with('success', 'Bus berhasil dihapus');
    }
}
