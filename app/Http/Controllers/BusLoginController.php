<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class BusLoginController extends Controller
{
    public function pageUser()
    {
        // Ambil semua bus yang statusnya aktif
        $buses = DB::table('buses')->where('status', 'aktif')->get();
        return Inertia::render('Admin/kernet', compact('buses'));
    }

    public function prosesLoginBus(Request $request)
    {
        $request->validate([
            'id_bus' => 'required|exists:buses,id_bus',
            'password' => 'required',
        ]);

        $bus = DB::table('buses')->where('id_bus', $request->id_bus)->first();
        if (!$bus) {
            return back()->withErrors(['id_bus' => 'ID bus tidak ditemukan']);
        }

        if ($bus && Hash::check($request->password, $bus->password)) {
            session(['logBus' => $bus->id_bus]);

            return redirect('/kernet/dashboard/bus');
        }

        return back()->withErrors(['password' => 'Password bus salah']);
    }

    public function dashboard()
    {
        $id_bus = Session::get('logBus');

        if (!$id_bus) {
            return redirect('/kernet/dashboard')->withErrors(['Silakan login terlebih dahulu']);
        }

        $bus = Bus::find($id_bus);
        if (!$bus) {
            return redirect('/kernet/dashboard')->withErrors(['Bus tidak ditemukan']);
        }

        return Inertia::render('Kernet/gps', compact('bus'));
    }
    public function logoutBus()
    {
        Session::forget('logBus');
        return redirect('/kernet/dashboard');
    }
}
