Vue.component('v-select-matricula', VueSelect.VueSelect);
Vue.component('componente-alumnos', {
    data() {
        return {
            valor:'',
            alumnos:[],
            accion:'nuevo',
            alumno:{
                matricula:{
                    id:'',
                    label:''
                },
                idAlumno: new Date().getTime(),
                codigo:'',
                nombre:'',
                responsable:'',
                fechanacimiento:'',
                departamento:'',
                municipio:'',
                direccion:'',
                sexo:'',
                telefono:'',
                carrera:'',
                correo:''
                
            }
        }
    },
    methods:{
        buscarAlumno(e){
            this.listar();
        },
        async eliminarAlumno(idAlumno){
            if( confirm(`Esta seguro de elimina la alumno?`) ){
                this.accion='eliminar';
                await db.alumnos.where("idAlumno").equals(idAlumno).delete();
                let respuesta = await fetch(`private/modulos/alumnos/alumnos.php?accion=eliminar&alumnos=${JSON.stringify(this.alumno)}`),
                    data = await respuesta.json();
                this.nuevoAlumno();
                this.listar();
            }
        },
        modificarAlumno(alumno){
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        async guardarAlumno(){
            //almacenamiento del objeto categorias en indexedDB
            await db.alumnos.bulkPut([{...this.alumno}]);
            let respuesta = await fetch(`private/modulos/alumnos/alumnos.php?accion=${this.accion}&alumnos=${JSON.stringify(this.alumno)}`),
                data = await respuesta.json();
            this.nuevoalumno();
            this.listar();
        },
        nuevoAlumno(){
            this.accion = 'nuevo';
            this.alumno = {
                matricula:{
                    id:'',
                    label:''
                },
                idAlumno: new Date().getTime(),
                codigo:'',
                nombre:'',
                responsable:'',
                fechanacimiento:'',
                departamento:'',
                municipio:'',
                direccion:'',
                sexo:'',
                telefono:'',
                carrera:'',
                correo:''
                
            }
        },
        async listar(){
            let collections = db.alumnos.orderBy('nombre');
            this.alumnos = await collections.toArray();
            this.alumnos = this.alumnos.map(alumno=>{
                return {
                    id: alumno.idAlumno,
                    label:alumno.nombre
                }
            });
            let collection = db.alumnos.orderBy('codigo').filter(
                alumno=>alumno.codigo.includes(this.valor) || 
                alumno.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.responsable.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.fechanacimiento.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.departamento.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.municipio.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.direccion.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.sexo.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.telefono.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.carrera.toLowerCase().includes(this.valor.toLowerCase()) || 
                alumno.correo.toLowerCase().includes(this.valor.toLowerCase())
            );
            this.alumnos = await collection.toArray();
            if( this.alumnos.length<=0 ){
                let respuesta = await fetch('private/modulos/alumnos/alumnos.php?accion=consultar'),
                    data = await respuesta.json();
                this.alumnos = data.map(alumno=>{
                    return {
                        alumno:{
                            id:alumno.idAlumno,
                            label:alumno.nomcat
                        }, 
                        idAlumno : alumno.idAlumno,
                        codigo: alumno.codigo,
                        nombre: alumno.nombre,
                        responsable: alumno.carrera,
                        fechanacimiento: alumno.carrera,
                        departamento: alumno.carrera,
                        municipio: alumno.carrera,
                        direccion: alumno.carrera,
                        sexo: alumno.carrera,
                        telefono: alumno.carrera,
                        carrera: alumno.carrera,
                        correo: alumno.cantidadM                   
                    }
                });
                db.alumnos.bulkPut(this.alumnos);
            }
            }
        },
    template: `
    <div class="my-4">
        <div class="row">
            <div class="col col-md-6">
                <div class="card">
                    <div class="card-header text-bg">REGISTRO DE ALUMNOS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo</div>
                            <div class="col col-md-3">
                                <v-select-matricula required v-model="alumno.matricula" 
                                    :options="matricula">Por favor seleccione un codigo</v-select-matricula>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.nombre" required pattern="^[a-zA-ZáíéóúñÑ]{3,50}([a-zA-ZáíéóúñÑ ]{1,50})$" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Responsable</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.responsable" required pattern="^[a-zA-ZáíéóúñÑ]{3,50}([a-zA-ZáíéóúñÑ ]{1,50})$" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Fecha de nacimiento</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.fechanacimiento" required type="date" class="form-control">
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
                            <div class="col col-md-2">Municipio</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.municipio" type="text" required pattern="^[a-zA-ZáíéóúñÑ]{5,50}([a-zA-ZáíéóúñÑ ]{1,50})$" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Direccion</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.direccion" required pattern="^[a-zA-ZáíéóúñÑ]{5,50}([a-zA-ZáíéóúñÑ ]{1,50})$" type="text" class="form-control">
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
                            <div class="col col-md-2">Telefono</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.telefono" required pattern="[0-9-]{9,}" maxlength="9" type="tel" oninput="this.value = this.value.replace(/[^0-9-]/g, '').slice(0, 9);" class="form-control">
                            </div>
                        </div> 
                        <div class="row p-1">
                            <div class="col col-md-2">Carrera</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.carrera" required pattern="^[a-zA-ZáíéóúñÑ]{5,50}([a-zA-ZáíéóúñÑ ]{1,50})$" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Correo</div>
                            <div class="col col-md-5">
                                <input v-model="alumno.correo" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" type="email" class="form-control">
                            </div>
                        </div>
                        
                        <div class="row p-1">
                        <div class="col text-center">
                            <div class="d-flex justify-content-center ">
                                <button @click.prevent.default="guardarAlumno" class="btn btn-outline-success">GUARDAR</button>
                                <div style="margin-right: 20px;"></div>
                                <button @click.prevent.default="nuevoAlumno" class="btn btn-outline-warning">NUEVO</button>
                            </div>
                        </div>
                        </div>
                        
                
                    </div>
                    
                </div>
            </div>
            <div class="my-4">
            <div class="col col-col-md-15">
                <div class="card text-bg">
                    <div class="card-header">LISTADO DE ALUMNOS</div>
                    <div class="card-body">
                        <form id="frmAlumno">
                            <table class="table table table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre" type="search" v-model="valor" @keyup="buscarAlumno" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>RESPONSABLE</th>
                                        <th>FECHA NACIMIENTO</th>
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
                                        <td>{{alumno.matricula.label}}</td>
                                        <td>{{alumno.nombre}}</td>
                                        <td>{{alumno.responsable}}</td>
                                        <td>{{alumno.fechanacimiento}}</td>
                                        <td>{{alumno.departamento}}</td>
                                        <td>{{alumno.municipio}}</td>
                                        <td>{{alumno.direccion}}</td>
                                        <td>{{alumno.sexo}}</td>
                                        <td>{{alumno.telefono}}</td>
                                        <td>{{alumno.carrera}}</td>
                                        <td>{{alumno.correo}}</td>
                                        <td><button @click.prevent.default="eliminarAlumno(alumno.idAlumno)" class="btn btn-danger">del</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    `
});