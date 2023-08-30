<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomStoreRequest;
use App\Http\Requests\RoomUpdateRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if (!$request->inertia() && $request->expectsJson()) {
            return new RoomResource(Room::all());
        }

        return Inertia::render('Room/Index', [
            'rooms' => Room::all(['*'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Room/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoomStoreRequest $request)
    {
        try {
            $room = $request->validated();

            Room::create($room);

            return Redirect::route('rooms.index')->with(['message' => 'Successfull. Room created!']);
        } catch (\Throwable $th) {
            return Redirect::back()->with(['error' => $th->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        return Inertia::render('Room/Edit', ['room' => $room]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(RoomUpdateRequest $request, Room $room)
    {
        try {
            $room->fill($request->validated());
            $room->save();

            return Redirect::route('rooms.index')->with(['message' => 'Successfully! Room updated.']);
        } catch (\Throwable $th) {
            return Redirect::route('rooms.index')->with(['error' => $th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        try {
            $room->delete();

            return response()->json([
                'message' => 'Data ruangan berhasil dihapus',
                'status' => true,
                'data' => $room
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'status' => false,
                'data' => null
            ]);
        }
    }
}
