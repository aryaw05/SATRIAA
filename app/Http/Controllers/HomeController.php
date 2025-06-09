<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Halte;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $buses = Bus::all();
        $halte = Halte::all();

        return Inertia::render('Home', [
            'buses' => $buses,
            'halte' => $halte
        ]);
    }
}
