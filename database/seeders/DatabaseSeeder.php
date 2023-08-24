<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AccessoryType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        AccessoryType::create([
            'name' => 'Input Device',
            'slug' => 'input',
        ]);
        AccessoryType::create([
            'name' => 'Output Device',
            'slug' => 'output',
        ]);
        AccessoryType::create([
            'name' => 'Storage Device',
            'slug' => 'storage',
        ]);
        AccessoryType::create([
            'name' => 'Communication Device',
            'slug' => 'communication',
        ]);
        AccessoryType::create([
            'name' => 'Networking Device',
            'slug' => 'networking',
        ]);
        AccessoryType::create([
            'name' => 'Power Accessories',
            'slug' => 'power',
        ]);
        AccessoryType::create([
            'name' => 'Cooling Accessory',
            'slug' => 'cooling',
        ]);
        AccessoryType::create([
            'name' => 'Other Accessory',
            'slug' => 'other',
        ]);
    }
}
