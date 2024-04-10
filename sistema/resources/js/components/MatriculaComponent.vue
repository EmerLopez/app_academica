<template>
    <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE MATRICULAS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="matricula.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="matricula.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CARRERA</div>
                            <div class="col col-md-3">
                                <input v-model="matricula.carrera" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">MONTO</div>
                            <div class="col col-md-3">
                                <input v-model="matricula.monto" type="text" step = "0.01" class="form-control" @input="validarMonto">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CONDICION</div>
                            <div class="col col-md-3">
                            <select v-model="matricula.condicion" class="form-control">
                             <option value="BECA">BECA</option>
                            <option value="Media BECA">Media BECA</option>
                            <option value="Pagante">Pagante</option>
                        </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">MODALIDAD</div>
                            <div class="col col-md-3">
                            <select v-model="matricula.modalidad" class="form-control">
                            <option value="Presencial">Presencial</option>
                            <option value="Semi Presencial">Semi Presencial</option>
                            <option value="Virtual">Virtual</option>
                            </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarMatricula" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoMatricula" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE MATRICULAS</div>
                    <div class="card-body">
                        <form id="frmMatricula">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, carrera, monto, condicion, modalidad" type="search" v-model="valor" @keyup="buscarMatricula" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>CARRERA</th>
                                        <th>MONTO</th>
                                        <th>CONDICION</th>
                                        <th>MODALIDAD</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarMatricula(matricula)" v-for="matricula in matriculas" :key="matricula.idMatricula">
                                        <td>{{matricula.codigo}}</td>
                                        <td>{{matricula.nombre}}</td>
                                        <td>{{matricula.carrera}}</td>
                                        <td>{{matricula.monto}}</td>
                                        <td>{{matricula.condicion}}</td>
                                        <td>{{matricula.modalidad}}</td>
                                        <td><button @click.prevent.default="eliminarMatricula(matricula.idMatricula)" class="btn btn-danger">Eliminar</button></td>
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
    import axios from 'axios';
    import alertify from 'alertifyjs';
    export default {
        data() {
            return {
                valor:'',
                matriculas:[],
                accion:'nuevo',
                matricula:{
                    idMatricula: new Date().getTime(),
                    codigo:'',
                    nombre:'',
                    carrera:'',
                    monto: '',
                    condicion:'',
                    modalidad:'',
                }
            }
        },
        methods:{
            buscarMatricula(e){
                this.listar();
            },
            validarMonto() {
                // Validar el campo de monto para permitir solo números decimales y puntos
                this.matricula.monto = this.matricula.monto.replace(',', '.'); // Reemplazar comas por puntos
                this.matricula.monto = this.matricula.monto.replace(/[^0-9.]/g, ''); // Eliminar cualquier caracter que no sea número o punto
            },
            soloNumeros(event) {
           const input = event.target;
            input.value = input.value.replace(/\D/g, '');
        },
            async eliminarMatricula(idMatricula){
                if( confirm(`Esta seguro de eliminar la matricula?`) ){
                    this.accion='eliminar';
                    await db.matriculas.where("idMatricula").equals(idMatricula).delete();
                    axios({
                        url: 'matriculas',
                        method: 'DELETE',
                        data: {idMatricula}
                    }).then(resp=>{
                        if( resp.data.msg==='ok' ){
                            alertify.success('Matricula eliminada con exito');
                        }else{
                            alertify.error(`Error: ${resp.data.msg}`);
                        }
                    }).catch(err=>{
                        alertify.error(`Error: ${err}`);
                    })
                    this.nuevoMatricula();
                    this.listar();
                }
            },
            modificarMatricula(matricula){
                this.accion = 'modificar';
                this.matricula = matricula;
            },
            async guardarMatricula(){
                this.matricula.codigo = this.matricula.codigo.trim();
                let existingMatricula = null;
                // Si la acción es modificar, verificamos si el nombre del alumno ya existe
                if (this.accion === 'modificar') {
                    existingMatricula = await db.matriculas
                        .where('codigo')
                        .equals(this.matricula.codigo)
                        .and(matricula => matricula.id !== this.matricula.id) // Excluimos al alumno actual
                        .first();
                } else {
                    existingMatricula  = await db.matriculas
                        .where('codigo')
                        .equals(this.matricula.codigo)
                        .first();
                }
                if (existingMatricula) {
                    alertify.error('El nombre de matricula ya está en uso.');
                    return; // Evitar guardar o actualizar el alumno con un nombre duplicado
                }
                //Validacion de campos en blanco
                if (this.matricula.codigo.trim() === '' || this.matricula.nombre.trim() === '' 
                || this.matricula.carrera.trim() === '' || this.matricula.monto.trim() === ''
                || this.matricula.condicion.trim() === '' || this.matricula.modalidad.trim() === '')  {
                alertify.error('Por favor llene todos los campos');
                return;
                    }

                //almacenamiento del objeto matriculas en indexedDB
                await db.matriculas.bulkPut([{...this.matricula}]);
                let method = 'POST';
                if( this.accion === 'modificar' ){
                    method = 'PUT';
                }
                axios({
                    url: 'matriculas',
                    method,
                    data: this.matricula
                }).then(resp=>{
                    if( resp.data.msg==='ok' ){
                        alertify.success('Matricula guardada con exito');
                    }else{
                        alertify.error(`Error: ${resp.data.msg}`);
                    }
                }).catch(err=>{
                    alertify.error(`Error: ${err}`);
                });
                this.nuevoMatricula();
                this.listar();
            },
            nuevoMatricula(){
                this.accion = 'nuevo';
                this.matricula = {
                    idMatricula: new Date().getTime(),
                    codigo:'',
                    nombre:'',
                    carrera:'',
                    monto:'',
                    condicion:'',
                    modalidad:'',
                }
            },
            async listar(){
                let collections = db.matriculas.orderBy('codigo')
                .filter(matricula=>matricula.codigo.includes(this.valor) ||
                    matricula.nombre.toLowerCase().includes(this.valor.toLowerCase()));
                this.matriculas = await collections.toArray();
                if( this.matriculas.length<=0 ){
                    let respuesta = await fetch('matriculas'),
                        data = await respuesta.json();
                    this.matriculas = data;
                    db.matriculas.bulkPut(data);
                }
            }
        }
    }
</script>