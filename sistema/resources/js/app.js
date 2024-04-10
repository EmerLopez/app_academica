import './bootstrap';
import { createApp } from 'vue';
import Dexie from 'dexie';
import inscripcions from './components/InscripcionComponent.vue';
import matriculas from './components/MatriculaComponent.vue';
import alumnos from './components/AlumnoComponent.vue';
window.db = '';

const app = createApp({
    components:{
        inscripcions,
        matriculas,
        alumnos,
    },
    data(){
        return{
            forms:{
                inscripcion:{mostrar:false},
                matricula:{mostrar:false},
                alumno:{mostrar:false},
                
            }
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        },
        funcdb(){
            db = new Dexie("db_sistema");
            db.version(4).stores({
                inscripcions: 'idInscripcion, codigo, nombre, carrera, cantidadM',
                matriculas:'idMatricula, codigo, nombre, carrera , monto , condicion , modalidad',
                alumnos: 'idAlumno, nombre, responsable, fechaN , departamento , municipio , direccion, sexo, telefono,carrera, correo',
            });
        }
    },
    created(){
        this.funcdb();
    }
});
app.mount('#app');
