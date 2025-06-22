<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KondisiBusController;
use App\Http\Controllers\updateKursiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusLoginController;
use App\Http\Controllers\JadwalBusController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KernetController;
use Inertia\Inertia;

Route::middleware('web')->group(function () {
  Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    // jadwal
    Route::post('/admin/dashboard/jadwal/add', [JadwalBusController::class, 'store'])->name('store');
    Route::put('/admin/dashboard/jadwal/edit/{id}', [JadwalBusController::class, 'update'])->name('jadwal.update');
    Route::delete('/admin/dashboard/jadwal/delete/{id}', [JadwalBusController::class, 'destroy'])->name('destroy');

    // UPDATE Kursi
    Route::get('/pageAdmin', [KondisiBusController::class, 'pageAdmin'])->name('pageAdmin');
    Route::get('/updateKursi', [updateKursiController::class, 'updateKursi'])->name('updateKursi');
    Route::post('/update', [updateKursiController::class, 'update'])->name('update');
    Route::get('/updateKondisi', [KondisiBusController::class, 'updateKondisi'])->name('updateKondisi');
    Route::post('/updateKondisiBus', [KondisiBusController::class, 'update'])->name('update');

    // CRUD BUS

    Route::get('/admin/dashboard/bus', [AdminController::class, 'retrieveData'])->name('bus.index');   // halaman setelah simpan (daftar bus)
    Route::post('/admin/dashboard/bus/add', [BusController::class, 'store'])->name('bus.store');  // simpan data
    Route::put('/admin/dashboard/bus/edit/{bus}', [BusController::class, 'update'])->name('bus.update');
    Route::delete('/admin/dashboard/bus/delete/{bus}', [BusController::class, 'destroy'])->name('bus.destroy');

    // akun Kernet

    Route::post('/admin/dashboard/kernet/add', [AdminController::class, 'storeKernet'])->name('admin.storeKernet');
    Route::delete('/admin/dashboard/kernet/delete/{id}', [AdminController::class, 'deleteKernet'])->name('admin.deleteKernet');

    Route::get('/admin/dashboard/kernet', [App\Http\Controllers\AdminController::class, 'listKernet'])->name('kernet.list');


    Route::get('/admin/dashboard', [AdminController::class, 'storeHalte'])->name('storeHalte');
    Route::post('/createHalte', [AdminController::class, 'createHalte'])->name('createHalte');
    Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
    Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);
  });

  // kernet
  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':kernet'])->group(function () {
    Route::get('/kernet/dashboard', [KernetController::class, 'index'])->name('kernet');
    Route::post('/logBus', [BusLoginController::class, 'prosesLoginBus'])->name('prosesLoginBus')->middleware('auth');
    Route::post('/logoutBus', [BusLoginController::class, 'logoutBus'])->name('logoutBus')->middleware('auth');
    Route::get('/kernet/dashboard/bus', [BusLoginController::class, 'dashboard'])->name('dashboard');
    Route::put('/kernet/dashboard/bus/updateStatus/{bus}', [KernetController::class, 'updateBusStatus'])->name('bus.update');
    Route::put('/kernet/dashboard/bus/updateKapasitas/{bus}', [KernetController::class, 'updateKapasitasDanKondisi'])->name('bus.update');
  });
});


// Route::resource('crudDataBus', \App\Http\Controllers\JadwalBusController::class);

Route::get('/', [HomeController::class, 'index'])->name('index');
