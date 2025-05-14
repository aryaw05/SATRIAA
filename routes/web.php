<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KondisiBusController;
use App\Http\Controllers\updateKursiController;
use Illuminate\Support\Facades\Route;


// Route::inertia('/', 'Home');
Route::get('/halte', [AdminController::class,'storeHalte'])->name('storeHalte');
Route::get('/', [AdminController::class,'retrieveHalte'])->name('retrieveHalte');
Route::post('/createHalte', [AdminController::class,'createHalte'])->name('createHalte');
Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);


Route::get('/updateKursi', [updateKursiController::class,'updateKursi'])->name('updateKursi');
Route::post('/update', [updateKursiController::class,'update'])->name('update');

Route::get('/updateKondisi', [KondisiBusController::class,'updateKondisi'])->name('updateKondisi');
Route::post('/updateKondisiBus', [KondisiBusController::class,'update'])->name('update');