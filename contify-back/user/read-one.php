<?php
include '../header.php';
include '../db.php';

// Obtener la clave del área a editar desde la solicitud POST
$usuario = $_GET['user'];
$password= $_GET['password'];


// Obtener los datos del área a partir de su clave
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ? AND password= ?");
$stmt->bind_param('ss', $usuario, $password);
$stmt->execute();
$result = $stmt->get_result();
$dato = mysqli_fetch_assoc($result);;
if($dato != null){
  echo json_encode($dato);
}else{
  echo "No hay registro";
}   
?>