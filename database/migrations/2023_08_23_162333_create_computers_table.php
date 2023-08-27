<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('computers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id');
            $table->string('user');
            $table->string('name')->unique();
            $table->string('image')->nullable();
            $table->string('processor');
            $table->string('ram');
            $table->string('storage');
            $table->string('motherboard');
            $table->string('power_supply');
            $table->enum('operating_system', ['WINDOWS_7', 'WINDOWS_8', 'WINDOWS_10', 'WINDOWS_11', 'WINDOWS_XP', 'UBUNTU', 'DEBIAN', 'VENTURA', 'MONTEREY', 'BIG_SUR', 'CATALINA']);
            $table->boolean('operating_system_activation');
            $table->string('workgroup');
            $table->unsignedInteger('condition');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('computers');
    }
};
