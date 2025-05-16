<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('login');
    }

    public function login(Request $request)
{
    $credentials = $request->validate([
        'username' => 'required',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        // dd('LOGIN OK → user = ', Auth::user());

        $user = Auth::user();
        if ($user->role === 'admin') {
            return redirect('/pageAdmin');
        } elseif ($user->role === 'bus') {
            return redirect('/pageUser');
        }
    }

    return back()->withErrors([
        'username' => 'Username atau password salah.',
    ]);
}

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}