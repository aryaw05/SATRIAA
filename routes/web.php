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

// Route::get('/admin/input-halte', function () {
//     return Inertia::render('Admin/InputHalte');
// });
Route::get('/admin/input-data', function () {
    return Inertia::render('Admin/InputData');
});

Route::get('/admin/dashboard-kernet', function () {
    return Inertia::render('Admin/kernet');
});
Route::get('/admin/login', function () {
    return Inertia::render('Admin/login');
});

Route::get('/admin/gps', function () {
    return Inertia::render('Admin/gps');
});



