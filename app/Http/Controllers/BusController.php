<?php

namespace App\Http\Controllers;

use App\Models\Bus;
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
            'password' => 'required|string|min:3',
        ]);
        $data = $request->all();

        $validated['status'] = $validated['status'] ?? 'aktif';
        $data['password'] = Hash::make($data['password']);

        Bus::create($data);;

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
            'plat_nomor' => 'required|string|max:20',
            'jenis_bus' => 'required|string|max:20',
            'rute' => 'required|string|max:255',
            'kapasitas_tempat_duduk' => 'required|integer',
            'status' => 'required|string|max:255',
            'kondisi' => 'required|string|max:255',
            'password' => 'required|string|min:3',
        ]);

        $data = $request->validated();
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
