<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Seeder Users
        DB::table('users')->insert([
            ['nama' => 'Admin User', 'username' => 'admin@example.com', 'password' => bcrypt('password'), 'role' => 'admin'],
            ['nama' => 'Sopir 1', 'username' => 'sopir1@example.com', 'password' => bcrypt('password'), 'role' => 'bus'],
            ['nama' => 'Sopir 2', 'username' => 'sopir2@example.com', 'password' => bcrypt('password'), 'role' => 'bus']
        ]);

        // Seeder Buses
        DB::table('buses')->insert([

            [
                'nomor_bus' => 'B001',
                'plat_nomor' => 'AG 1234 CC',
                'jenis_bus' => 'low-floor',
                'kapasitas_tempat_duduk' => 40,
                'status' => 'aktif',
                'kondisi' => 'baik',
                'password' => bcrypt('123'), // tambahkan password bus
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomor_bus' => 'B002',
                'plat_nomor' => 'AG 5678 DD',
                'jenis_bus' => 'Microbus',
                'kapasitas_tempat_duduk' => 35,
                'status' => 'aktif',
                'kondisi' => 'baik',
                'password' => bcrypt('123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nomor_bus' => 'B003',
                'plat_nomor' => 'AG 9012 EE',
                'jenis_bus' => 'Microbus',
                'kapasitas_tempat_duduk' => 45,
                'status' => 'tidak aktif',
                'kondisi' => 'baik',
                'password' => bcrypt('123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);


        // Seeder Tracking Bus
        DB::table('tracking_buses')->insert([
            ['id_bus' => 1, 'lokasi_lat' => -6.201000, 'lokasi_long' => 106.817000, 'waktu_update' => now()],
            ['id_bus' => 2, 'lokasi_lat' => -6.202000, 'lokasi_long' => 106.818000, 'waktu_update' => now()],
            ['id_bus' => 3, 'lokasi_lat' => -6.203000, 'lokasi_long' => 106.819000, 'waktu_update' => now()]
        ]);

        // Seeder Ketersediaan Tempat Duduk
        DB::table('ketersediaan_tempat_duduk')->insert([
            ['id_bus' => 1, 'tempat_duduk_tersedia' => 20, 'waktu_update' => now()],
            ['id_bus' => 2, 'tempat_duduk_tersedia' => 15, 'waktu_update' => now()],
            ['id_bus' => 3, 'tempat_duduk_tersedia' => 25, 'waktu_update' => now()]
        ]);

        // Seeder Halte
        DB::table('haltes')->insert([
            ['nama_halte' => 'Halte A', 'lokasi_lat' => -6.220000, 'lokasi_long' => 106.830000],
            ['nama_halte' => 'Halte B', 'lokasi_lat' => -6.221000, 'lokasi_long' => 106.831000],
            ['nama_halte' => 'Halte C', 'lokasi_lat' => -6.222000, 'lokasi_long' => 106.832000]
        ]);
        $this->call([
            UserSeeder::class,
        ]);
    }
}
