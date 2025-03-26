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
        Schema::create('jadwal_buses', function (Blueprint $table) {
            $table->increments('id_jadwal');
            $table->unsignedInteger('id_bus');
            $table->unsignedInteger('id_halte');
            $table->time('waktu_berangkat');
            $table->time('waktu_tiba');

            $table->foreign('id_bus')->references('id_bus')->on('buses')->onDelete('cascade');
            $table->foreign('id_halte')->references('id_halte')->on('haltes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_buses');
    }
};
