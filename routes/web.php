<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KondisiBusController;
use App\Http\Controllers\updateKursiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusLoginController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;

Route::middleware('web')->group(function () {
  Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {

    // UPDATE Kursi
    Route::get('/pageAdmin', [KondisiBusController::class, 'pageAdmin'])->name('pageAdmin');
    Route::get('/updateKursi', [updateKursiController::class, 'updateKursi'])->name('updateKursi');
    Route::post('/update', [updateKursiController::class, 'update'])->name('update');
    Route::get('/updateKondisi', [KondisiBusController::class, 'updateKondisi'])->name('updateKondisi');
    Route::post('/updateKondisiBus', [KondisiBusController::class, 'update'])->name('update');

    // CRUD BUS

    Route::get('/admin/dashboard/bus', [AdminController::class, 'inputDataBus'])->name('bus.index');   // halaman setelah simpan (daftar bus)
    Route::post('/admin/dashboard/bus/add', [BusController::class, 'store'])->name('bus.store');  // simpan data
    Route::put('/admin/dashboard/bus/edit/{bus}', [BusController::class, 'update'])->name('bus.update');
    Route::delete('/admin/dashboard/bus/delete/{bus}', [BusController::class, 'destroy'])->name('bus.destroy');

    // akun Kernet
    Route::get('/admin/dashboard/kernet', function () {
      return view('admin1');
    });
    Route::post('/admin/kernet/store', [AdminController::class, 'storeKernet'])->name('admin.storeKernet');
    Route::get('/admin/kernet/store', [App\Http\Controllers\AdminController::class, 'listKernet'])->name('kernet.list');


    Route::get('/admin/dashboard', [AdminController::class, 'storeHalte'])->name('storeHalte');
    Route::post('/createHalte', [AdminController::class, 'createHalte'])->name('createHalte');
    Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
    Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);
  });

  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':kernet'])->group(function () {
    Route::get('/kernet/dashboard', [BusLoginController::class, 'pageUser'])->name('pageUser');
    Route::post('/logBus', [BusLoginController::class, 'prosesLoginBus'])->name('prosesLoginBus')->middleware('auth');
    Route::post('/logoutBus', [BusLoginController::class, 'logoutBus'])->name('logoutBus')->middleware('auth');
    Route::get('/Bus', [BusLoginController::class, 'dashboard'])->name('dashboard');
    Route::get('/admin/input-data', function () {
      return Inertia::render('Admin/InputData');
    });
  });
});

Route::get('/', [HomeController::class, 'index'])->name('index');
