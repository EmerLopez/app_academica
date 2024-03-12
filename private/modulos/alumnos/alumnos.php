<?php
include('../../Config/Config.php');
extract($_REQUEST);

$alumnos = isset($alumnos) ? $alumnos : '[]';
$accion=$accion ?? '';
$class_alumnos = new alumnos($conexion);
print_r( json_encode($class_alumnos->recibir_datos($alumnos)) );

class alumnos{
    private $datos=[], $db, $respuesta = ['msg'=>'ok'];
    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($alumnos){
        global $accion;
        if($accion==='consultar'){
            return $this->administrar_alumnos();
        }else{
            $this->datos = json_decode($alumnos, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if( empty($this->datos['idAlumno']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la ID';
        }
        if( empty($this->datos['matricula']['id']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la Categoria';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo del producto';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre del producto';
        }
        if( empty($this->datos['responsable']) ){
            $this->respuesta['msg'] = 'Por favor ingrese la marca del producto';
        }
        if( empty($this->datos['fechaN']) ){
            $this->respuesta['msg'] = 'Por favor ingrese la presentacion del producto';
        }
        if( empty($this->datos['departamento']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        if( empty($this->datos['municipio']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        if( empty($this->datos['direccion']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        if( empty($this->datos['sexo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        if( empty($this->datos['telefono']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        if( empty($this->datos['carrera']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        if( empty($this->datos['correo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        return $this->administrar_alumnos();
    }
    private function administrar_alumnos(){
        global $accion;
        if( $this->respuesta['msg'] === 'ok' ){
            if( $accion==='nuevo' ){
                return $this->db->consultas('INSERT INTO alumnos VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                $this->datos['idAlumno'],$this->datos['matricula']['id'],$this->datos['codigo'],
                    $this->datos['nombre'],$this->datos['responsable'],$this->datos['fechaN'],$this->datos['departamento'],$this->datos['municipio'],$this->datos['direccion'],$this->datos['sexo'],$this->datos['telefono'],$this->datos['carrera'],$this->datos['correo']);
            }else if($accion==='modificar' ){
                return $this->db->consultas('UPDATE alumnos SET idMatricula=?, codigo=?, nombre=?, responsable=?, fechaN=?, departamento=?, municipio=?, direccion=?, sexo=?, telefono=?, carrera=?, correo=? WHERE idAlumno=?',
                $this->datos['matricula']['id'], $this->datos['codigo'],$this->datos['nombre'], $this->datos['responsable'], $this->datos['fechaN'], 
                $this->datos['departamento'], $this->datos['municipio'], $this->datos['direccion'],$this->datos['sexo'],$this->datos['telefono'],$this->datos['carrera'],$this->datos['correo'],$this->datos['idAlumno']);
            }else if($accion==='eliminar'){
                return $this->db->consultas('DELETE alumnos FROM alumnos WHERE idAlumno=?',
                $this->datos['idAlumno']);
            }else if($accion==='consultar'){
                $this->db->consultas('
                    SELECT alumnos.idAlumno, alumnos.idMatricula, alumnos.codigo, alumnos.nombre, 
                        alumnos.responsable, alumnos.fechaN, alumnos.departamento, alumnos.municipio, alumnos.direccion, alumnos.sexo, alumnos.telefono, alumnos.carrera, alumnos.correo,  matricula.codigo AS nomcat
                    FROM alumnos
                        INNER JOIN matriculas ON (alumnos.idMatricula = matriculas.idMatricula)
                ');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>