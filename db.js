var db;
const funcdb = ()=>{
    db = new Dexie("db_appv2");
    db.version(30).stores({
        matriculas:'idMatricula, codigo,nombre, carrera, monto, condicion, modalidad',
        alumnos:'idAlumno, nombre, responsable, fechaN, departamento, municipio, direccion, sexo, telefono, carrera, correo',
      });
};
funcdb();