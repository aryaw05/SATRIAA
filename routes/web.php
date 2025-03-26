<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('admin');
});

Route::get('/halte', [AdminController::class,'storeHalte'])->name('storeHalte');
Route::post('/createHalte', [AdminController::class,'createHalte'])->name('createHalte');
Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);
