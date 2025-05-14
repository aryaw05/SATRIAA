<?php
// routes/web.php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\KernetController;
use Illuminate\Support\Facades\Route;


Route::get('/halte', [AdminController::class, 'storeHalte'])->name('storeHalte');
Route::post('/createHalte', [AdminController::class, 'createHalte'])->name('createHalte');
Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);

// Login routes
Route::get('/login', [AdminLoginController::class, 'showLoginForm'])->name('login');  // Route untuk halaman login
Route::post('/admin/login', [AdminLoginController::class, 'login'])->name('admin.login.post');  // Route untuk proses login
Route::get('/logout', [AdminLoginController::class, 'logout'])->name('logout');  // Route untuk logout

// Route untuk menambah kernet
Route::get('/admin/kernet/tambah', [KernetController::class, 'create'])->name('addKernet');
Route::post('/admin/kernet/tambah', [KernetController::class, 'store'])->name('storeKernet');




Route::get('/admin/dasboard', [AdminController::class, 'dasboard'])->name('dasbordadmin');

