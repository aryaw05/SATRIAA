<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::create([
            'nama' => 'Admin Satu',
            'username' => 'adminadmin',
            'password' => Hash::make('123456'), // password: 123
            'role' => 'admin',
        ]);

        // Bus user
        User::create([
            'nama' => 'Petugas Bus',
            'username' => 'kernetkernet',
            'password' => Hash::make('123456'), // password: 123
            'role' => 'kernet',
        ]);
    }
}
