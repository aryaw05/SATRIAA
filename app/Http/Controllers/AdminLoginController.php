<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminLoginController extends Controller
{
    // Menampilkan form login
    public function showLoginForm()
    {
        return view('login'); // login.blade.php
    }

    // Proses login
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            // Login berhasil → arahkan ke view dasbordadmin.blade.php
            return view('dasbordadmin');
        }

        // Jika gagal login
        return redirect()->back()->with('error', 'Username atau password salah.');
    }

    // Logout
    public function logout()
    {
        Auth::logout();  // Logout pengguna

        // Redirect ke halaman login setelah logout
        return redirect()->route('/login');
    }
}
