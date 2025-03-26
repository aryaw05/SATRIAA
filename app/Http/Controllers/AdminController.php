<?php

namespace App\Http\Controllers;

use App\Models\Halte;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AdminController extends Controller
{
    public function storeHalte()
    {
        $halte = Halte::get();
        return view('admin', compact('halte'));
    }

    public function createHalte(Request $request)
    {
        $request->validate([
            'nama_halte' => 'required',
            'lokasi_lat' => 'required|numeric',
            'lokasi_long' => 'required|numeric'
        ]);

        Halte::create([
            'nama_halte' => $request->nama_halte,
            'lokasi_lat' => $request->lokasi_lat,
            'lokasi_long' => $request->lokasi_long
        ]);

        return redirect('/halte');
    }
    
    public function editHalte(Request $request, $id)
        {
    $request->validate([
        'nama_halte' => 'required',
        'lokasi_lat' => 'required|numeric',
        'lokasi_long' => 'required|numeric'
    ]);

    $halte = Halte::findOrFail($id);
    $halte->update($request->all());

    return redirect('/halte')->with('success', 'Data Halte berhasil diupdate!');
    }


    public function deleteHalte($id)
    {
        $halte = Halte::findOrFail($id);
        $halte->delete();

        return redirect('/halte')->with('success', 'Data Halte berhasil dihapus!');
    }
}
