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
        Schema::create('haltes', function (Blueprint $table) {
            $table->increments('id_halte');
            $table->string('nama_halte', 100);
            $table->decimal('lokasi_lat', 9, 6);
            $table->decimal('lokasi_long', 9, 6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('haltes');
    }
};
