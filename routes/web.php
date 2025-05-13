<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::inertia('/', 'Home');
Route::get('/halte', [AdminController::class,'storeHalte'])->name('storeHalte');
Route::get('/', [AdminController::class,'retrieveHalte'])->name('retrieveHalte');
Route::post('/createHalte', [AdminController::class,'createHalte'])->name('createHalte');
Route::put('/editHalte/{id}', [AdminController::class, 'editHalte']);
Route::delete('/deleteHalte/{id}', [AdminController::class, 'deleteHalte']);

Route::get('/admin/input-halte', function () {
    return Inertia::render('Admin/InputHalte');
});
Route::get('/admin/input-data', function () {
    return Inertia::render('Admin/InputData');
});

