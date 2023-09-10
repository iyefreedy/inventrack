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
        $computers = Computer::with(['room'])->get();
        $pie = $computers->groupBy('room.floor');
        $bar = $computers->only(['condition']);

        return Inertia::render('Dashboard', ['pie' => $pie, 'bar' => $bar]);
    }
}
