<?php
include('../../Config/Config.php');
extract($_REQUEST);

$matriculas = isset($matriculas) ? $matriculas : '[]';
$accion=$accion ?? '';
$class_matriculas = new matriculas($conexion);
print_r( json_encode($class_matriculas->recibir_datos($matriculas)) );

class matriculas{
    private $datos=[], $db, $respuesta = ['msg'=>'ok'];
    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($matriculas){
        global $accion;
        if($accion==='consultar'){
            return $this->administrar_matriculas();
        }else{
            $this->datos = json_decode($matriculas, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if( empty($this->datos['idMatricula']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo de la categoria';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        if( empty($this->datos['carrera']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        if( empty($this->datos['monto']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        if( empty($this->datos['condicion']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        if( empty($this->datos['modalidad']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        return $this->administrar_matriculas();
    }
    private function administrar_matriculas(){
        global $accion;
        if( $this->respuesta['msg'] === 'ok' ){
            if( $accion==='nuevo' ){
                return $this->db->consultas('INSERT INTO matriculas VALUES(?,?,?,?,?,?,?,?)',
                $this->datos['idMatricula'],$this->datos['codigo'],$this->datos['nombre'],$this->datos['carrera'],$this->datos['monto'],$this->datos['condicion'],$this->datos['modalidad'],$this->datos['foto']);
            }else if($accion==='modificar' ){
                return $this->db->consultas('UPDATE matriculas SET codigo=?, nombre=?, carrera=?, monto=?, condicion=?, modalidad=?, foto=? WHERE idMatricula=?',
                $this->datos['codigo'],$this->datos['nombre'],$this->datos['carrera'],$this->datos['monto'],$this->datos['condicion'],$this->datos['modalidad'], $this->datos['foto'],$this->datos['idMatricula']);
            }else if($accion==='eliminar'){
                return $this->db->consultas('DELETE matriculas FROM matriculas WHERE idMatricula=?',
                $this->datos['idMatricula']);
            }else if($accion==='consultar'){
                $this->db->consultas('SELECT * FROM matriculas');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>