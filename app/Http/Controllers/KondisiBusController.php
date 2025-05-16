<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Carbon\Carbon;
use Illuminate\Http\Request;

class KondisiBusController extends Controller
{
    public function updateKondisi()
    {
        $Bus = Bus::get();
        return view('updateKondisiBus', compact('Bus'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'id_bus' => 'required',
            'kondisi' => 'required',
        ]);
    
        $bus = Bus::where('id_bus', $request->id_bus)->first();
    
        if ($bus) {
            $bus->update([
                'kondisi' => $request->kondisi,
                'waktu_update' => Carbon::now(),
            ]);
        } else {
            return redirect()->back()->with('error', 'Data bus tidak ditemukan.');
        }
    
        return redirect()->back()->with('success', 'Data bus berhasil diperbarui.');
    }

    public function pageAdmin()
    {
        $Bus = Bus::get();
        return view('pageAdmin', compact('Bus'));
    }
    public function pageUser()
    {
        $Bus = Bus::get();
        return view('pageUser', compact('Bus'));
    }
}
