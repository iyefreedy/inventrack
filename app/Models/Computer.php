<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Computer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'room_id',
        'user',
        'image',
        'name',
        'processor',
        'ram',
        'storage',
        'motherboard',
        'operating_system',
        'operating_system_activation',
        'power_supply',
        'workgroup',
        'condition',
        'deleted_at',
        'created_at',
        'updated_at'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function accessories()
    {
        return $this->hasMany(Accessory::class);
    }

    public function softwares()
    {
        return $this->hasMany(Software::class);
    }
}
