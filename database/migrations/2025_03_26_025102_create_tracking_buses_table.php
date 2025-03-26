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
        Schema::create('tracking_buses', function (Blueprint $table) {
            $table->increments('id_tracking');
            $table->unsignedInteger('id_bus');
            $table->decimal('lokasi_lat', 9, 6);
            $table->decimal('lokasi_long', 9, 6);
            $table->timestamp('waktu_update')->useCurrent();

            $table->foreign('id_bus')->references('id_bus')->on('buses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracking_buses');
    }
};
