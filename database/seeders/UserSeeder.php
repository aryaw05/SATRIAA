<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Bus user
        User::create([
            'nama' => 'Petugas Bus',
            'username' => 'kernet',
            'password' => Hash::make('123'), // password: 123
            'role' => 'kernet',
        ]);
    }
}
