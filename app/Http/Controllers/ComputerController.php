<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComputerStoreRequest;
use App\Models\Accessory;
use App\Models\Computer;
use App\Models\Software;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Computer/Index', [
            'data' => Computer::with(['room', 'accessories', 'softwares'])->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Computer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComputerStoreRequest $request)
    {
        DB::beginTransaction();
        try {

            $data = $request->validated();
            $computer = Computer::create($data);

            $accessories = $data['accessories'];
            $softwares = $data['softwares'];

            foreach ($accessories as $accessory) {
                Accessory::create([
                    'name' => $accessory['name'],
                    'type' => $accessory['type'],
                    'condition' => $accessory['condition'],
                    'computer_id' => $computer->id,
                ]);
            }

            foreach ($softwares as $software) {
                Software::create([
                    'name' => $software['name'],
                    'computer_id' => $computer->id,
                ]);
            }
            DB::commit();

            return Redirect::route('computers.index')->with([
                'message' => 'Data berhasil disimpan'
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->with([
                'error' => $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Computer $computer)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Computer $computer)
    {
        return Inertia::render('Computer/Edit', [
            'computer' => $computer->with(['room', 'accessories', 'softwares'])->find($computer->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Computer $computer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Computer $computer)
    {
        DB::beginTransaction();



        try {
            Accessory::where('computer_id', $computer->id)->delete();
            Software::where('computer_id', $computer->id)->delete();
            $computer->delete();

            DB::commit();

            if (!request()->inertia() && request()->expectsJson()) {
                return response()->json([
                    'message' => 'Data ruangan berhasil dihapus',
                    'status' => true,
                    'data' => $computer
                ]);
            }

            return Redirect::route('computers.index')->with('message', 'Berhasil menghapus data');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            if (!request()->inertia() && request()->expectsJson()) {
                return response()->json([
                    'message' => $th->getMessage(),
                    'status' => false,
                    'data' => $computer
                ]);
            }
            return Redirect::back()->with('error', 'Terjadi kesalahan pada sisi server.');
        }
    }
}
