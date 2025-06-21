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
        Schema::create('buses', function (Blueprint $table) {
            $table->increments('id_bus');
            $table->string('nomor_bus', 20);


            $table->string('plat_nomor', 20);
            $table->string('jenis_bus', 20);
            $table->integer('kapasitas_tempat_duduk')->nullable()->default(100);
            $table->string('status', 255)->nullable();
            $table->string('kondisi', 255)->nullable();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buses');
    }
};
