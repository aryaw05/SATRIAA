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
            'username' => 'admin',
            'password' => Hash::make('123'), // password: admin123
            'role' => 'admin',
        ]);

        // Bus user
        User::create([
            'nama' => 'Petugas Bus',
            'username' => 'bus',
            'password' => Hash::make('123'), // password: bus123
            'role' => 'bus',
        ]);
    }
}
