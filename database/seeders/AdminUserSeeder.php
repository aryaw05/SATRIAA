<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = env('ADMIN_PASSWORD');

        if (empty($password)) {
            $this->command->error('ADMIN_PASSWORD belum diset di file .env!');
            return;
        }

        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'password' => Hash::make($password),
                'nama' => 'Admin User',
                'role' => 'admin', 
             ]
        );
    }
}
