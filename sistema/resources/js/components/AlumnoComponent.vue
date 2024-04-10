<template>
    <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE ALUMNO</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">RESPONSABLE</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.responsable" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">FECHAN</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.fechaN" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Departamento</div>
                            <div class="col col-md-5">
                                <select v-model="alumno.departamento" class="form-control">
                                <option value="">Seleccione un departamento</option>
                                <option value="Ahuachapán">Ahuachapán</option>
                                <option value="Cabañas">Cabañas</option>
                                <option value="Chalatenango">Chalatenango</option>
                                <option value="Cuscatlán">Cuscatlán</option>
                                <option value="La Libertad">La Libertad</option>
                                <option value="La Paz">La Paz</option>
                                <option value="La Unión">La Unión</option>
                                <option value="Morazán">Morazán</option>
                                <option value="San Miguel">San Miguel</option>
                                <option value="San Salvador">San Salvador</option>
                                <option value="San Vicente">San Vicente</option>
                                <option value="Santa Ana">Santa Ana</option>
                                <option value="Sonsonate">Sonsonate</option>
                                <option value="Usulután">Usulután</option>
                            </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">MUNICIPIO</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.municipio" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">DIRECCION</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.direccion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Sexo</div>
                            <div class="col col-md-5">
                            <select v-model="alumno.sexo" class="form-control">
                            <option value="">Seleccione una opcion</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">TELEFONO</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.telefono" type="text" class="form-control" @input="formatoTelefono" maxlength="9" pattern="[0-9]*">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CARRERA</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.carrera" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CORREO</div>
                            <div class="col col-md-3">
                                <input v-model="alumno.correo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarAlumno" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoAlumno" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE ALUMNOS</div>
                    <div class="card-body">
                        <form id="frmAlumno">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="10">
                                            <input placeholder="nombre, responsable, fechan, departamento, municipio, direccion, sexo, telefono, carrera, correo" type="search" v-model="valor" @keyup="buscarAlumno" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>NOMBRE</th>
                                        <th>RESPONSABLE</th>
                                        <th>FECHAN</th>
                                        <th>DEPARTAMENTO</th>
                                        <th>MUNICIPIO</th>
                                        <th>DIRECCION</th>
                                        <th>SEXO</th>
                                        <th>TELEFONO</th>
                                        <th>CARRERA</th>
                                        <th>CORREO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarAlumno(alumno)" v-for="alumno in alumnos" :key="alumno.idAlumno">
                                        <td>{{alumno.nombre}}</td>
                                        <td>{{alumno.responsable}}</td>
                                        <td>{{alumno.fechaN}}</td>
                                        <td>{{alumno.departamento}}</td>
                                        <td>{{alumno.municipio}}</td>
                                        <td>{{alumno.direccion}}</td>
                                        <td>{{alumno.sexo}}</td>
                                        <td>{{alumno.telefono}}</td>
                                        <td>{{alumno.carrera}}</td>
                                        <td>{{alumno.correo}}</td>
                                        <td><button @click.prevent.default="eliminarAlumno(alumno.idAlumno)" class="btn btn-danger">Eliminar</button></td>
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
                alumnos:[],
                accion:'nuevo',
                alumno:{
                    idAlumno: new Date().getTime(),
                    nombre:'',
                    responsable:'',
                    fechaN:'',
                    departamento:'',
                    municipio:'',
                    direccion:'',
                    sexo:'',
                    telefono:'',
                    carrera:'',
                    correo:'',
                }
            }
        },
        methods:{
            buscarAlumno(e){
                this.listar();
            },
            formatoTelefono(event) {
                this.alumno.telefono = this.alumno.telefono.replace(/-/g, '');

                // Aplicar formato de teléfono (agregar guión después de cada 4 caracteres)
                this.alumno.telefono = this.alumno.telefono.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1-');
        },
            async eliminarAlumno(idAlumno){
                if( confirm(`Esta seguro de elimina el alumno?`) ){
                    this.accion='eliminar';
                    await db.alumnos.where("idAlumno").equals(idAlumno).delete();
                    axios({
                        url: 'alumnos',
                        method: 'DELETE',
                        data: {idAlumno}
                    }).then(resp=>{
                        if( resp.data.msg==='ok' ){
                            alertify.success('Alumno eliminado con exito');
                        }else{
                            alertify.error(`Error: ${resp.data.msg}`);
                        }
                    }).catch(err=>{
                        alertify.error(`Error: ${err}`);
                    })
                    this.nuevoAlumno();
                    this.listar();
                }
            },
            modificarAlumno(alumno){
                this.accion = 'modificar';
                this.alumno = alumno;
            },
            async guardarAlumno(){
                this.alumno.nombre = this.alumno.nombre.trim();
                let existingAlumno = null;
                // Si la acción es modificar, verificamos si el nombre del alumno ya existe
                if (this.accion === 'modificar') {
                    existingAlumno = await db.alumnos
                        .where('nombre')
                        .equals(this.alumno.nombre)
                        .and(alumno => alumno.id !== this.alumno.id) // Excluimos al alumno actual
                        .first();
                } else {
                    existingAlumno = await db.alumnos
                        .where('nombre')
                        .equals(this.alumno.nombre)
                        .first();
                }
                if (existingAlumno) {
                    alertify.error('El nombre del alumno ya está en uso.');
                    return; // Evitar guardar o actualizar el alumno con un nombre duplicado
                }
                //Validacion de campos en blanco
                if (this.alumno.nombre.trim() === '' || this.alumno.responsable.trim() === '' 
                || this.alumno.fechaN.trim() === '' || this.alumno.departamento.trim() === ''
                || this.alumno.municipio.trim() === '' || this.alumno.direccion.trim() === ''
                || this.alumno.sexo.trim() === '' || this.alumno.telefono.trim() === ''
                || this.alumno.carrera.trim() === '' || this.alumno.correo.trim() === '')  {
                alertify.error('Por favor llene todos los campos');
                return;
                    }

                //almacenamiento del objeto alumnos en indexedDB
                await db.alumnos.bulkPut([{...this.alumno}]);


                let method = 'POST';
                if( this.accion === 'modificar' ){
                    method = 'PUT';
                }
                axios({
                    url: 'alumnos',
                    method,
                    data: this.alumno
                }).then(resp=>{
                    if( resp.data.msg==='ok' ){
                        alertify.success('Alumno guardado con exito');
                    }else{
                        alertify.error(`Error: ${resp.data.msg}`);
                    }
                }).catch(err=>{
                    alertify.error(`Error: ${err}`);
                });
                this.nuevoAlumno();
                this.listar();
            },
            nuevoAlumno(){
                this.accion = 'nuevo';
                this.alumno = {
                    idAlumno: new Date().getTime(),
                    nombre:'',
                    responsable:'',
                    fechaN:'',
                    departamento:'',
                    municipio:'',
                    direccion:'',
                    sexo:'',
                    telefono:'',
                    carrera:'',
                    correo:'',
                }
            },
            async listar(){
                let collections = db.alumnos.orderBy('nombre')
                .filter(alumno=>alumno.nombre.includes(this.valor) ||
                    alumno.responsable.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.fechaN.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.departamento.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.municipio.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.direccion.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.sexo.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.telefono.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.carrera.toLowerCase().includes(this.valor.toLowerCase()) ||
                    alumno.correo.toLowerCase().includes(this.valor.toLowerCase()));
                this.alumnos = await collections.toArray();
                if( this.alumnos.length<=0 ){
                    let respuesta = await fetch('alumnos'),
                        data = await respuesta.json();
                    this.alumnos = data;
                    db.alumnos.bulkPut(data);
                }
            }
        }
    }
</script>