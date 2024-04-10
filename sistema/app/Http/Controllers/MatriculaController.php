<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //select * from categorias
        return Matricula::get();
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
        //insert into categorias
        Matricula::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Matricula $matricula)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Matricula $matricula)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Matricula $matricula)
    {
        //update categorias
        $matricula::where('idMatricula', $request['idMatricula'])->update([
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre'],
            'carrera'=>$request['carrera'],
            'monto'=>$request['monto'],
            'condicion'=>$request['condicion'],
            'modalidad'=>$request['modalidad']
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Matricula $matricula)
    {
        //delete from categorias
        $matricula::where('idMatricula', $request['idMatricula'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
