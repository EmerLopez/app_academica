var app = new Vue({
    el: '#app',
    data:{
        forms:{
            alumno:{mostrar:false},
            matricula:{mostrar:false},
            
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
        }
    }
});
async function seleccionarFoto(imagen, refName) {
    let archivo = imagen.files[0];
    if (archivo) {
        let blob = await img(archivo, 1),
            reader = new FileReader();
        reader.onload = e => {
            if (app.$refs[refName] && app.$refs[refName].alumno) {
                app.$refs[refName].alumno.foto = e.target.result;
            } else {
                console.error(`Referencia ${refName} o alumno no está definido.`);
            }
        };
        reader.readAsDataURL(blob);
    }
}
