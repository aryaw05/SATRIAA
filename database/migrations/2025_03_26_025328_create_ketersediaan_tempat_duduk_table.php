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
        Schema::create('ketersediaan_tempat_duduk', function (Blueprint $table) {
            $table->increments('id_ketersediaan');
            $table->unsignedInteger('id_bus');
            $table->integer('tempat_duduk_tersedia');
            $table->timestamp('waktu_update')->useCurrent();

            $table->foreign('id_bus')->references('id_bus')->on('buses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ketersediaan_tempat_duduk');
    }
};
