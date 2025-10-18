<?php

namespace App\Http\Controllers;

use App\Events\LocationUpdated;
use App\Models\Bus;
use App\Models\Halte;
use App\Models\JadwalBus;
use App\Models\TrackingBus;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function storeHalte()
    {
        $halte = Halte::get();
        return Inertia::render('Admin/InputHalte', [
            'halte' => $halte
        ]);
    }
    public function retrieveData()
    {
        $halte = Halte::all();
        $tracking = TrackingBus::with('bus')->get();
        
        return Inertia::render('Admin/Layout/DashboardLayout', [
            'halte' => $halte

        ]);
    }
    public function retrieveAdminBusData()
    {
        $buses = Bus::all();
        return Inertia::render('Admin/InputBus', [
            'buses' => $buses
        ]);
    }
    public function retrieveHalte()
    {
        $halte = Halte::get();
        return Inertia::render('Home', [
            'halte' => $halte
        ]);
    }

    public function createHalte(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_halte' => 'required',
            'lokasi_lat' => 'required|numeric|between:-90,90',
            'lokasi_long' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', 'Terjadi kesalahan pada input. Silakan ulangi kembali.');
        }

        try {
            Halte::create([
                'nama_halte' => $request->nama_halte,
                'lokasi_lat' => $request->lokasi_lat,
                'lokasi_long' => $request->lokasi_long
            ]);

            return redirect()->back()->with('success', 'Data halte berhasil disimpan!');
        } catch (QueryException $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan data. Periksa kembali input Anda!');
        }
    }

    public function editHalte(Request $request, $id)
    {
        $request->validate([
            'nama_halte'   => 'required',
            'lokasi_lat'   => 'required|numeric|between:-90,90',
            'lokasi_long'  => 'required|numeric|between:-180,180',
        ]);

        $halte = Halte::findOrFail($id);
        $halte->update($request->only(['nama_halte', 'lokasi_lat', 'lokasi_long']));

        return redirect()->back()->with('success', 'Data Halte berhasil diupdate!');
    }

    public function deleteHalte($id)
    {
        $halte = Halte::findOrFail($id);
        $halte->delete();

        return redirect()->back()->with('success', 'Data Halte berhasil dihapus!');
    }


    // Method untuk jadwal Bus
    public function Jadwalstore(Request $request)
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



    // Method untuk simpan akun kernet
    public function storeKernet(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama'     => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput()
                ->with('error', 'Terjadi kesalahan pada input akun kernet. Silakan ulangi kembali.');
        }

        try {
            User::create([
                'nama'     => $request->nama,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'role'     => 'kernet',
            ]);

            return redirect()->back()->with('success', 'Akun kernet berhasil dibuat!');
        } catch (QueryException $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Gagal menyimpan akun kernet. Silakan coba lagi.');
        }
    }

    // Method untuk menampilkan daftar akun kernet
    public function listKernet()
    {
        $kernet = User::where('role', 'kernet')->get(); 
        return Inertia::render('Admin/Kernet/Index', [
            'kernet' => $kernet
        ]);
    }

    public function deleteKernet($id)
    {
        try {
            $user = User::where('role', 'kernet')->findOrFail($id);
            $user->delete();

            return redirect()->back()->with('success', 'Akun kernet berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus akun kernet.');
        }
    }
}
