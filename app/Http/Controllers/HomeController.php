<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Halte;
use App\Models\JadwalBus;
use App\Models\TrackingBus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $buses = Bus::all();
        $halte = Halte::all();
        $jadwal = JadwalBus::with(['bus', 'halte'])->get();
        $tracking   = TrackingBus::with('bus')->get();
        return Inertia::render('Home', [
            'buses' => $buses,
            'halte' => $halte,
            'jadwal' => $jadwal,
            'tracking' => $tracking,

        ]);
    }
}
