<?php
include('../../Config/Config.php');
extract($_REQUEST);

$inscripcions = isset($inscripcions) ? $inscripcions : '[]';
$accion=$accion ?? '';
$class_inscripcions = new inscripcions($conexion);
print_r( json_encode($class_inscripcions->recibir_datos($inscripcions)) );

class inscripcions{
    private $datos=[], $db, $respuesta = ['msg'=>'ok'];
    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($inscripcions){
        global $accion;
        if($accion==='consultar'){
            return $this->administrar_inscripcions();
        }else{
            $this->datos = json_decode($inscripcions, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if( empty($this->datos['idInscripcion']) ){
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
        if( empty($this->datos['carrera']) ){
            $this->respuesta['msg'] = 'Por favor ingrese la marca del producto';
        }
        if( empty($this->datos['cantidadM']) ){
            $this->respuesta['msg'] = 'Por favor ingrese la presentacion del producto';
        }
        
        return $this->administrar_inscripcions();
    }
    private function administrar_inscripcions(){
        global $accion;
        if( $this->respuesta['msg'] === 'ok' ){
            if( $accion==='nuevo' ){
                return $this->db->consultas('INSERT INTO inscripcions VALUES(?,?,?,?,?,?,?,?)',
                $this->datos['idInscripcion'],$this->datos['matricula']['id'],$this->datos['codigo'],
                    $this->datos['nombre'],$this->datos['carrera'],$this->datos['cantidadM']);
            }else if($accion==='modificar' ){
                return $this->db->consultas('UPDATE inscripcions SET idCategoria=?, codigo=?, nombre=?, carrera=?, cantidadM=? WHERE idInscripcion=?',
                $this->datos['matricula']['id'], $this->datos['codigo'],$this->datos['nombre'], $this->datos['carrera'], $this->datos['cantidadM'], $this->datos['idInscripcion']);
            }else if($accion==='eliminar'){
                return $this->db->consultas('DELETE inscripcions FROM inscripcions WHERE idInscripcion=?',
                $this->datos['idInscripcion']);
            }else if($accion==='consultar'){
                $this->db->consultas('
                    SELECT inscripcions.idInscripcion, inscripcions.idMatricula, inscripcions.codigo, inscripcions.nombre, 
                        inscripcions.carrera, inscripcions.cantidadM, matriculas.codigo AS nomcat
                    FROM inscripcions
                        INNER JOIN matriculas ON (inscripcions.idMatricula = matriculas.idMatricula)
                ');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>