<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kursi;
use Carbon\Carbon;

class updateKursiController extends Controller
{
    public function updateKursi()
    {
        $kursi = Kursi::get();
        return view('updateKursi', compact('kursi'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'id_bus' => 'required',
            'tempat_duduk_tersedia' => 'required',
        ]);
    
        $bus = Kursi::where('id_bus', $request->id_bus)->first();
    
        if ($bus) {
            $bus->update([
                'tempat_duduk_tersedia' => $request->tempat_duduk_tersedia,
                'waktu_update' => Carbon::now(),
            ]);
        } else {
            return redirect()->back()->with('error', 'Data bus tidak ditemukan.');
        }
    
        return redirect()->back()->with('success', 'Data bus berhasil diperbarui.');
    }
}
