<?php

namespace App\Http\Controllers;

use App\Models\Kernet;
use Illuminate\Http\Request;

class KernetController extends Controller
{
    public function create()
    {
        return view('createkernet'); // Halaman form tambah kernet
    }

    public function store(Request $request)
    {
        // Validasi input data
        $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'telepon' => 'required|string|max:15',
        ]);

        // Simpan data kernet
        Kernet::create([
            'nama' => $request->nama,
            'alamat' => $request->alamat,
            'telepon' => $request->telepon,
        ]);

        return redirect()->route('dasbordadmin')->with('success', 'Kernet berhasil ditambahkan!');
    }
}
