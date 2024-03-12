var db;
const funcdb = ()=>{
    db = new Dexie("db_appacademica");
    db.version(1).stores({
        matriculas:'idMatricula,codigo,nombre, carrera, monto, condicion, modalidad',
        inscripcions:'idInscripcion,codigo,nombre,carrera,cantidadM',
        alumnos:'idAlumno, codigo, nombre, responsable, fechaN, departamento, municipio, direccion, sexo, telefono, carrera correo'
      });
};
funcdb();