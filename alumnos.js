Vue.component('v-select-categoria', VueSelect.VueSelect);
Vue.component('componente-productos', {
    data() {
        return {
            valor:'',
            alumnos:[],
            matriculas:[],
            accion:'nuevo',
            alumno:{
                matricula:{
                    id:'',
                    label:''
                },
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
                foto:'',
                
            }
        }
    },
    methods:{
        buscarAlumno(){
            this.listar();
        },
        async eliminarAlumno(idAlumno){
            if( confirm(`Esta seguro de eliminar en alumno?`) ){
                await db.alumnos.where("idAlumno").equals(idAlumno).delete();
                this.alumno.foto = '';
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
            //almacenamiento del objeto productos en indexedDB
            if( this.alumno.matricula.id=='' ||
                this.alumno.matricula.label=='' ){
                console.error("Por favor seleccione una matricula");
                return;
            }
            
            //almacenamiento del objeto alumnos en indexedDB
            if( this.alumno.matricula.id=='' ||
                this.alumno.matricula.label=='' ){
                console.error("Por favor seleccione una categoria");
                return;
            }
            await db.alumnos.bulkPut([{...this.alumno}]);
            let respuesta = await fetch(`private/modulos/alumnos/alumnos.php?accion=${this.accion}&alumnos=${JSON.stringify(this.alumno)}`),
                data = await respuesta.json();
            this.nuevoAlumno();
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
                nombre:'',
                responsable:'',
                fechaN:'',
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
            let collections = db.matriculas.orderBy('codigo');
            this.matriculas = await collections.toArray();
            this.matriculas = this.matriculas.map(matricula=>{
                return {
                    id: matricula.idMatricula,
                    label:matricula.codigo
                }
            });
            let collection = db.alumnos.orderBy('nombre').filter(
                alumno=>alumno.nombre.includes(this.valor) || 
                    alumno.responsable.toLowerCase().includes(this.valor.toLowerCase()) || 
                    alumno.fechaN.toLowerCase().includes(this.valor.toLowerCase()) || 
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
                    this.mounted();
                    this.alumnos = data.map(alumno=>{
                    return {
                        matricula:{
                            id:alumno.idMatricula,
                            label:alumno.nomcat
                        }, 
                        idAlumno : alumno.idAlumno,
                        nombre: alumno.nombre,
                        responsable: alumno.responsable,
                        fechaN: alumno.fechaN,
                        departamento: alumno.departamento,
                        municipio: alumno.municipio,
                        direccion: alumno.direccion,
                        sexo: alumno.sexo,
                        telefono: alumno.telefono,
                        carrera: alumno.carrera,
                        correo: alumno.correo,
                        foto:alumno.foto.split(' ').join('+')
                    }
                });
                db.alumnos.bulkPut(this.alumnos);
            }
        }
    },
    mounted() {
        // Llama a listar() cuando el componente se monta
        this.listar();
    },
    template: `
        <div class="row">
            <div class="col col-md-5">
                <div class="card">
                    <div class="card-header text-bg-dark">REGISTRO DE ALUMNOS</div>
                    <div class="catd-body">
                        <form id="frmAlumno" @reset.prevent.default="nuevoAlumno" @submit.prevent.default="guardarAlumno">
                            <div class="row p-1">
                                <div class="col col-md-2">CODIGO</div>
                                <div class="col col-md-8">
                                    <v-select-categoria required v-model="alumno.matricula" 
                                        :options="matriculas">Por favor seleccione un codigo</v-select-categoria>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">NOMBRE</div>
                                <div class="col col-md-10">
                                    <input v-model="alumno.nombre" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">RESPONSABLE</div>
                                <div class="col col-md-8">
                                    <input v-model="alumno.responsable" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">FECHA NACIMIENTO</div>
                                <div class="col col-md-10">
                                    <input v-model="alumno.fechaN" required typed="number" type="date" class="form-control">
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
                                    <input v-model="alumno.municipio"  type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">DIRECCION</div>
                                <div class="col col-md-3">
                                    <input v-model="alumno.direccion"  type="text" class="form-control">
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
                                    <input v-model="alumno.telefono" required type="number" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">CARRERA</div>
                                <div class="col col-md-3">
                                    <input v-model="alumno.carrera"  type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">CORREO</div>
                                <div class="col col-md-3">
                                    <input v-model="alumno.correo"  type="text" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">
                                    <img :src="alumno.foto" width="50"/>
                                </div>
                                <div class="col col-md-8">
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Seleccione la foto</label>
                                        <input class="form-control" type="file" id="formFile" required 
                                            accept="image/*" onChange="seleccionarFoto(this, 'alumnos')">
                                    </div>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col">
                                    <input type="submit" class="btn btn-success" value="GUARDAR"/>
                                    <input type="reset" class="btn btn-warning" value="NUEVO" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col col-md-7">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE ALUMNOS</div>
                    <div class="card-body">
                        <form id="frmAlumno">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="13">
                                            <input placeholder="nombre, responsable, fecha nacimiento, departamento, municipio, direccion, sexo, telefono, carrera, correo" type="search" v-model="valor" @keyup="buscarAlumno" class="form-control">
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
                                        <th>FOTO</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarAlumno(alumno)" v-for="alumno in alumnos" :key="alumno.idAlumno">
                                        <td>{{alumno.matricula.label}}</td>
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
                                        <td><img :src="alumno.foto" width="50"/></td>
                                        <td><button @click.prevent.default="eliminarAlumno(alumno.idAlumno)" class="btn btn-danger">Eliminar</button></td>
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