<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //select * from alumno
        return Alumno::get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //insert into alumnos
        Alumno::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Alumno $alumno)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alumno $alumno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alumno $alumno)
    {
        //update alumnos
        $alumno::where('idAlumno', $request['idAlumno'])->update([
            'nombre'=>$request['nombre'],
            'responsable'=>$request['responsable'],
            'fechaN'=>$request['fechaN'],
            'departamento'=>$request['departamento'],
            'municipio'=>$request['municipio'],
            'direccion'=>$request['direccion'],
            'sexo'=>$request['sexo'],
            'telefono'=>$request['telefono'],
            'carrera'=>$request['carrera'],
            'correo'=>$request['correo']
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Alumno $alumno)
    {
        //delete from Alumnos
        $alumno::where('idAlumno', $request['idAlumno'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
