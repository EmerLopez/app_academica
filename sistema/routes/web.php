<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\InscripcionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(InscripcionController::class)->group(function(){
    Route::get('/inscripcions', 'index');
    Route::post('/inscripcions', 'store');
    Route::put('/inscripcions', 'update');
    Route::delete('/inscripcions', 'destroy');
});
Route::controller(MatriculaController::class)->group(function(){
    Route::get('/matriculas', 'index');
    Route::post('/matriculas', 'store');
    Route::put('/matriculas', 'update');
    Route::delete('/matriculas', 'destroy');
});

Route::controller(AlumnoController::class)->group(function(){
    Route::get('/alumnos', 'index');
    Route::post('/alumnos', 'store');
    Route::put('/alumnos', 'update');
    Route::delete('/alumnos', 'destroy');
});
Route::get('/', function () {
    return view('welcome');
});
Route::get('/usuario/{id}/{nombre}/{apellidos}', function ($id=0, $nombre='', $apellidos='') {
    return 'Usuario '.$id. ' '.$nombre.' '.$apellidos;
})->where('id', '[0-9]+');
