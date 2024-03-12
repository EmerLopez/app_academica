Vue.component('v-select-matricula', VueSelect.VueSelect);
Vue.component('componente-inscripcions', {
    data() {
        return {
            valor:'',
            inscripcions:[],
            accion:'nuevo',
            inscripcion:{
                matricula:{
                    id:'',
                    label:''
                },
                idInscripcion: new Date().getTime(),
                codigo:'',
                nombre:'',
                carrera:'',
                cantidad_m:''
            }
        }
    },
    methods:{
        buscarInscripcion(e){
            this.listar();
        },
        async eliminarInscripcion(idInscripcion){
            if( confirm(`Esta seguro de elimina la inscripcion?`) ){
                this.accion='eliminar';
                await db.incripcions.where("idIncripcion").equals(idInscripcion).delete();
                let respuesta = await fetch(`private/modulos/incripcions/incripcions.php?accion=eliminar&incripcions=${JSON.stringify(this.incripcion)}`),
                    data = await respuesta.json();
                this.nuevoInscripcion();
                this.listar();
            }
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
            this.inscripcion = inscripcion;
        },
        async guardarInscripcion(){
            if( this.inscripcion.matricula.id=='' ||
                this.inscripcion.matricula.label=='' ){
                console.error("Por favor seleccione un numero de matricula");
                return;
            }
            await db.incripcions.bulkPut([{...this.incripcion}]);
            let respuesta = await fetch(`private/modulos/incripcions/incripcions.php?accion=${this.accion}&incripcions=${JSON.stringify(this.incripcion)}`),
                data = await respuesta.json();
            this.nuevoIncripcion();
            this.listar();
        },
        nuevoInscripcion(){
            this.accion = 'nuevo';
            this.inscripcion = {
                matricula:{
                    id:'',
                    label:''
                },
                idInscripcion: new Date().getTime(),
                codigo:'',
                nombre:'',
                carrera:'',
                cantidad_m:''
                
            }
        },
       async listar(){
        let collections = db.inscripcions.orderBy('nombre');
        this.matriculas = await collections.toArray();
        this.matriculas = this.inscripcions.map(matricula=>{
            return {
                id: matricula.idMatricula,
                label:matricula.nombre
            }
        });
        let collection = db.incripcions.orderBy('codigo').filter(
            inscripcion=>inscripcion.codigo.includes(this.valor) || 
                inscripcion.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                inscripcion.carrera.toLowerCase().includes(this.valor.toLowerCase()) || 
                inscripcion.cantidadM.toLowerCase().includes(this.valor.toLowerCase())
        );
        this.inscripcions = await collection.toArray();
        if( this.inscripcions.length<=0 ){
            let respuesta = await fetch('private/modulos/inscripcions/inscripcions.php?accion=consultar'),
                data = await respuesta.json();
            this.inscripcions = data.map(inscripcion=>{
                return {
                    matricula:{
                        id:inscripcion.idMatricula,
                        label:inscripcion.nomcat
                    }, 
                    idInscripcion : inscripcion.idInscripcion,
                    codigo: inscripcion.codigo,
                    nombre: inscripcion.nombre,
                    carrera: inscripcion.carrera,
                    cantidadM: inscripcion.cantidadM                   
                }
            });
            db.inscripcions.bulkPut(this.inscripcions);
        }
        }
    },
    template: `
    <div class="my-4">
        <div class="row">
            <div class="col col-md-6">
                <div class="card">
                    <div class="card-header text-bg">REGISTRO DE INSCRIPCIONES</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <v-select-matricula required v-model="inscripcion.matricula" 
                                    :options="matricula">Por favor seleccione un codigo</v-select-matricula>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="inscripcion.nombre" required pattern="^[a-zA-ZáíéóúñÑ]{3,50}([a-zA-ZáíéóúñÑ ]{1,50})$" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CARRERA</div>
                            <div class="col col-md-5">
                                <input v-model="inscripcion.carrera"  required pattern="^[a-zA-ZáíéóúñÑ]{3,50}([a-zA-ZáíéóúñÑ ]{1,50})$" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">CANTIDAD DE MATERIAS</div>
                            <div class="col col-md-5">
                                <input v-model="inscripcion.cantidad_m" required pattern="[0-9]{1,10}" type="number" min="0" class="form-control">
                            </div>
                        </div>
                        
                        <div class="row p-1">
                        <div class="col text-center">
                            <div class="d-flex justify-content-center ">
                                <button @click.prevent.default="guardarInscripcion" class="btn btn-outline-success">GUARDAR</button>
                                <div style="margin-right: 20px;"></div>
                                <button @click.prevent.default="nuevoInscripcion" class="btn btn-outline-warning">NUEVO</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg">
                    <div class="card-header">LISTADO DE INSCRIPCIONES</div>
                    <div class="card-body">
                        <form id="frmInscripcion">
                            <table class="table table table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre" type="search" v-model="valor" @keyup="buscarInscripcion" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>CARRERA</th>
                                        <th>CANTIDAD MATERIAS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarInscripcion(inscripcion)" v-for="inscripcion in inscripcions" :key="inscripcion.idInscripcion">
                                        <td>{{inscripcion.matricula.label}}</td>
                                        <td>{{inscripcion.nombre}}</td>
                                        <td>{{inscripcion.carrera}}</td>
                                        <td>{{inscripcion.cantidad_m}}</td>
                                        <td><button @click.prevent.default="eliminarInscripcion(inscripcion.idInscripcion)" class="btn btn-danger">del</button></td>
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