<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KondisiBusController;
use App\Http\Controllers\updateKursiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('web')->group(function () {
  Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/pageAdmin', [KondisiBusController::class, 'pageAdmin'])->name('pageAdmin');
    Route::get('/updateKursi', [updateKursiController::class,'updateKursi'])->name('updateKursi');
    Route::post('/update', [updateKursiController::class,'update'])->name('update');
    Route::get('/updateKondisi', [KondisiBusController::class,'updateKondisi'])->name('updateKondisi');
    Route::post('/updateKondisiBus', [KondisiBusController::class,'update'])->name('update');
    Route::get('/halte', [AdminController::class,'storeHalte'])->name('storeHalte');
    Route::post('/createHalte', [AdminController::class,'createHalte'])->name('createHalte');
    Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
    Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);
  });
  Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':bus'])->group(function () {
    Route::get('/pageUser', [KondisiBusController::class, 'pageUser'])->name('pageUser');
    Route::get('/', [AdminController::class,'retrieveHalte'])->name('retrieveHalte');
  });
});


