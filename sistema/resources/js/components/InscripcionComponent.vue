<template>
    <div class="row">
        <div class="col col-md-5">
            <div class="card">
                <div class="card-header text-bg-dark">REGISTRO DE INSCRIPCIONES</div>
                <div class="catd-body">
                    <form id="frmInscripcion" @reset.prevent.default="nuevoInscripcion" @submit.prevent.default="guardarInscripcion">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-8">
                                <!--v-select-categoria required v-model="inscripcion.categoria" 
                                    :options="categorias">Por favor seleccione una categoria</!--v-select-categoria-->
                                    <input v-model="inscripcion.codigo" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="inscripcion.nombre" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CARRERA</div>
                            <div class="col col-md-10">
                                <input v-model="inscripcion.carrera" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CANTIDAD DE MATERIAS</div>
                            <div class="col col-md-8">
                                <input v-model="inscripcion.cantidadM" required type="text" class="form-control" @input="soloNumeros">
                            </div>
                        </div>
                       
                        
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarInscripcion" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoInscripcion" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col col-md-7">
            <div class="card text-bg-dark">
                <div class="card-header">LISTADO DE INSCRIPCIONES</div>
                <div class="card-body">
                    <form id="frmInscripcion">
                        <table class="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR</th>
                                    <th colspan="7">
                                        <input placeholder="codigo, nombre, carrera" type="search" v-model="valor" @keyup="buscarInscripcion" class="form-control">
                                    </th>
                                </tr>
                                <tr>
                                    
                                    <th>CODIGO</th>
                                    <th>NOMBRE</th>
                                    <th>CARRERA</th>
                                    <th>CANTIDAD DE MATERIAS</th>
                                    <th></th>
                                    <th></th>
                                 
                                </tr>
                            </thead>
                            <tbody>
                                <tr @click="modificarInscripcion(inscripcion)" v-for="inscripcion in inscripcions" :key="inscripcion.idInscripcion">
                                    <td>{{inscripcion.codigo}}</td>
                                    <td>{{inscripcion.nombre}}</td>
                                    <td>{{inscripcion.carrera}}</td>
                                    <td>{{inscripcion.cantidadM}}</td>
                                    
                                    <td><button @click.prevent.default="eliminarInscripcion(inscripcion.idInscripcion)" class="btn btn-danger">Eliminar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import alertify from "alertifyjs";

export default {
   data() {
        return {
            valor:'',
            inscripcions:[],
            accion:'nuevo',
            inscripcion:{
                
                idInscripcion: new Date().getTime(),
                codigo:'',
                nombre:'',
                carrera:'',
                cantidadM:'',
                
            }
        }
    },
    methods:{
        buscarInscripcion(e){
            this.listar();
        },
        soloNumeros(event) {
           const input = event.target;
            input.value = input.value.replace(/\D/g, '');
        },
        async eliminarInscripcion(idInscripcion){
                if( confirm(`Esta seguro de eliminar la inscripcion?`) ){
                    this.accion='eliminar';
                    await db.inscripcions.where("idInscripcion").equals(idInscripcion).delete();
                    axios({
                        url: 'inscripcions',
                        method: 'DELETE',
                        data: {idInscripcion}
                    }).then(resp=>{
                        if( resp.data.msg==='ok' ){
                            alertify.success('Inscripcion eliminada con exito');
                        }else{
                            alertify.error(`Error: ${resp.data.msg}`);
                        }
                    }).catch(err=>{
                        alertify.error(`Error: ${err}`);
                    })
                    this.nuevoInscripcion();
                    this.listar();
                }
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
            this.inscripcion = inscripcion;
        },
        async guardarInscripcion(){
            this.inscripcion.codigo = this.inscripcion.codigo.trim();
                let existingInscripcion = null;
                // Si la acción es modificar, verificamos si el nombre del alumno ya existe
                if (this.accion === 'modificar') {
                    existingInscripcion = await db.inscripcions
                        .where('codigo')
                        .equals(this.inscripcion.codigo)
                        .and(inscripcion => inscripcion.id !== this.inscripcion.id) // Excluimos al alumno actual
                        .first();
                } else {
                    existingInscripcion = await db.inscripcions
                        .where('codigo')
                        .equals(this.inscripcion.codigo)
                        .first();
                }
                if (existingInscripcion) {
                    alertify.error('El nombre de inscripcion ya está en uso.');
                    return; // Evitar guardar o actualizar el alumno con un nombre duplicado
                }
                //Validacion de campos en blanco
                if (this.inscripcion.codigo.trim() === '' || this.inscripcion.nombre.trim() === '' 
                || this.inscripcion.carrera.trim() === '' || this.inscripcion.cantidadM.trim() === '')  {
                alertify.error('Por favor llene todos los campos');
                return;
                    }
            await db.inscripcions.bulkPut([{...this.inscripcion}]);
            let method = 'POST';
            if( this.accion === 'modificar' ){
                method = 'PUT';
            }
            axios({
                url: 'inscripcions',
                method,
                data: this.inscripcion
            }).then(resp=>{
                if( resp.data.msg==='ok' ){
                    alertify.success('Inscripcion guardada con exito');
                }else{
                    alertify.error(`Error: ${resp.data.msg}`);
                }
            }).catch(err=>{
                alertify.error(`Error: ${err}`);
            });
            this.nuevoInscripcion();
            this.listar();
        },
        nuevoInscripcion(){
            this.accion = 'nuevo';
            this.inscripcion = {
                idInscripcion: new Date().getTime(),
                codigo:'',
                nombre:'',
                carrera:'',
                cantidadM:''
                
            }
        },
        async listar(){
                let collections = db.inscripcions.orderBy('codigo')
                .filter(inscripcion=>inscripcion.codigo.includes(this.valor) ||
                    inscripcion.nombre.toLowerCase().includes(this.valor.toLowerCase()) ||
                    inscripcion.carrera.toLowerCase().includes(this.valor.toLowerCase()) ||
                    inscripcion.cantidadM.toLowerCase().includes(this.valor.toLowerCase()));
                this.inscripcions = await collections.toArray();
                if( this.inscripcions.length<=0 ){
                    let respuesta = await fetch('inscripcions'),
                        data = await respuesta.json();
                    this.inscripcions = data;
                    db.inscripcions.bulkPut(data);
                }
            }
    }
}
</script>