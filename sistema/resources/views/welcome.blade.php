<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>App Academica</title>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <!-- Styles -->
        <link rel="stylesheet" href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://unpkg.com/vue-select@3.0.0/dist/vue-select.css">
        <!-- Alertify -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/css/alertify.min.css">
        <!-- Default theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>
        <!-- Semantic UI theme -->
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
    </head>
    <body>
        <div class="container-fluid" id="app">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand">::.. App Academica ..::</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link" @click="abrirFormulario('matricula')">Matricula</a>
                            <a class="nav-link" @click="abrirFormulario('inscripcion')">Inscripcion</a>
                            <a class="nav-link" @click="abrirFormulario('alumno')">Alumno</a>
                            
                        </div>
                    </div>
                </div>
            </nav>
            <div id="appSistema">
                <matriculas ref="matricula" v-show="forms['matricula'].mostrar"></matriculas>
                <inscripcions ref="inscripcion" v-show="forms['inscripcion'].mostrar"></inscripcions>
                <alumnos ref="alumno" v-show="forms['alumno'].mostrar"></alumnos>
                
                
            </div>
        </div>

        @vite('resources/js/app.js')
    </body>
</html>
