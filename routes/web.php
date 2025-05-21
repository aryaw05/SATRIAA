<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KondisiBusController;
use App\Http\Controllers\updateKursiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusLoginController;
use App\Http\Controllers\JadwalBusController;
use Inertia\Inertia;

Route::middleware('web')->group(function () {
  Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {

    // UPDATE Kursi
    Route::get('/pageAdmin', [KondisiBusController::class, 'pageAdmin'])->name('pageAdmin');
    Route::get('/updateKursi', [updateKursiController::class,'updateKursi'])->name('updateKursi');
    Route::post('/update', [updateKursiController::class,'update'])->name('update');
    Route::get('/updateKondisi', [KondisiBusController::class,'updateKondisi'])->name('updateKondisi');
    Route::post('/updateKondisiBus', [KondisiBusController::class,'update'])->name('update');


    Route::get('/admin/dashboard', [AdminController::class,'storeHalte'])->name('storeHalte');
    Route::post('/createHalte', [AdminController::class,'createHalte'])->name('createHalte');
    Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
    Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);
  });

  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':kernet'])->group(function () {
    Route::get('/kernet/dashboard', [BusLoginController::class, 'pageUser'])->name('pageUser'); 
    Route::post('/logBus', [BusLoginController::class, 'prosesLoginBus'])->name('prosesLoginBus')->middleware('auth');
    Route::post('/logoutBus', [BusLoginController::class, 'logoutBus'])->name('logoutBus')->middleware('auth');

    Route::get('/Bus', [BusLoginController::class,'dashboard'])->name('dashboard');
    Route::get('/admin/input-data', function () {
    return Inertia::render('Admin/InputData');
});
});
});

Route::get('/crudDataBus', [JadwalBusController::class,'index'])->name('index');
Route::post('/crudDataBus/create', [JadwalBusController::class,'store'])->name('store');
Route::put('/crudDataBus/update/{id}', [JadwalBusController::class,'update'])->name('update');
Route::delete('/crudDataBus/delete/{id}', [JadwalBusController::class,'destroy'])->name('destroy');
// Route::resource('crudDataBus', \App\Http\Controllers\JadwalBusController::class);
