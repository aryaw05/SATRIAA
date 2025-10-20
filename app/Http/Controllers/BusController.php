<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\TrackingBus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class BusController extends Controller
{
    // Menampilkan semua data bus
    public function index()
    {
        $buses = Bus::all();
    }


    public function store(Request $request)
    {
        $request->validate([
            'nomor_bus' => 'required|string|max:20',
            'jenis_bus' => 'required|string|max:20',
            'plat_nomor' => 'required|string|max:20',
            'kapasitas_tempat_duduk' => 'integer',
            'status' => 'nullable|string|max:255',
            'kondisi' => 'string|max:255',
            'password' => 'required|string|min:6',
        ]);
        $data = $request->all();

        $validated['status'] = $validated['status'] ?? 'aktif';
        $data['password'] = Hash::make($data['password']);

       $bus =  Bus::create($data);;

        TrackingBus::create([
        'id_bus' => $bus->id_bus, 
        'lokasi_lat' => 0.0, 
        'lokasi_long' => 0.0,
        'waktu_update' => now(),
    ]);

        // Redirect ke halaman list bus dengan pesan sukses
        return redirect()->route('bus.index')->with('success', 'Bus berhasil ditambahkan');
    }

    // Update data bus
    public function update(Request $request, Bus $bus)
    {
        $request->validate([
            'nomor_bus' => 'required|string|max:20',
            'jenis_bus' => 'required|string|max:20',
            'plat_nomor' => 'required|string|max:20',
            'kapasitas_tempat_duduk' => 'integer',
            'status' => 'nullable|string|max:255',
            'kondisi' => 'string|max:255',
            'password' => 'nullable|string|min:3',
        ]);

        $data = $request->validate([
            'nomor_bus' => 'required|string|max:20',
            'jenis_bus' => 'required|string|max:20',
            'plat_nomor' => 'required|string|max:20',
            'kapasitas_tempat_duduk' => 'integer',
            'status' => 'nullable|string|max:255',
            'kondisi' => 'string|max:255',
            'password' => 'nullable|string|min:3',
        ]);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $bus->update($data);
        // Redirect ke halaman list bus dengan pesan sukses
        return redirect()->route('bus.index')->with('success', 'Bus berhasil diupdate');
    }

    // Hapus data bus
    public function destroy(Bus $bus)
    {
        $bus->delete();
        return redirect()->route('bus.index')->with('success', 'Bus berhasil dihapus');
    }
}
