<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComputerStoreRequest;
use App\Http\Requests\ComputerUpdateRequest;
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
        $query = request()->query();

        $computer = isset($query['from']) ? Computer::query()
            ->with(['accessories', 'softwares'])
            ->findOrFail($query['from'])
            ->only(['ram', 'storage', 'motherboard', 'operating_system', 'operating_system_activation', 'processor', 'motherboard', 'power_supply', 'case', 'accessories'])
            : null;

        return Inertia::render('Computer/Create', ['computer' => $computer]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ComputerStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        DB::beginTransaction();


            $data = $request->validated();
            $computer = Computer::query()->create($data);

            $accessories = $data['accessories'] ?? [];
            $softwares = $data['softwares'] ?? [];

            foreach ($accessories as $accessory) {
                Accessory::query()->create([
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
    public function update(ComputerUpdateRequest $request, Computer $computer)
    {
        DB::beginTransaction();
        try {

            $data = $request->validated();

            $computer->update($data);

            $accessories = $data['accessories'] ?? [];
            $softwares = $data['softwares'] ?? [];

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
     * Remove the specified resource from storage.
     */
    public function destroy(Computer $computer)
    {
        DB::beginTransaction();


        Accessory::where('computer_id', $computer->id)->delete();
        Software::where('computer_id', $computer->id)->delete();
        $computer->delete();

        DB::rollBack();

        if (!request()->inertia() && request()->expectsJson()) {
            return response()->json([
                'message' => 'Data ruangan berhasil dihapus',
                'status' => true,
                'data' => $computer
            ]);
        }

        return Redirect::route('computers.index')->with('message', 'Berhasil menghapus data');
    }
}
