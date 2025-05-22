<?php

namespace App\Http\Controllers;

use App\Models\Halte;
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

        return redirect('/halte')->with('success', 'Data Halte berhasil diupdate!');
    }
    
    public function deleteHalte($id)
    {
        $halte = Halte::findOrFail($id);
        $halte->delete();

        return redirect('/halte')->with('success', 'Data Halte berhasil dihapus!');
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
        $kernet = User::where('role', 'kernet')->get(); // Ambil semua user dengan role kernet
        return view('list_kernet', compact('kernet'));
    }
}
