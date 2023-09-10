<?php

namespace App\Http\Controllers;

use App\Models\Computer;
use App\Models\Room;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $computers = Computer::with(['room'])->get()->groupBy('room.floor');

        return Inertia::render('Dashboard', ['data' => $computers]);
    }
}
