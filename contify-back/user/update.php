<?php
include '../header.php';
include '../db.php';

// Recibir los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

$usuario = $data['usuario'];
$contraseña = $data['contraseña'];
$correo = $data['correo'];
$ingresos = $data['ingresos'];
$telefono = $data['telefono'];
$id=$data['id'];
// Actualizar los datos en la tabla usuarios
$stmt = $conn->prepare("UPDATE usuarios SET usuario=?, email=?, password=?, ingresos=?, telefono=? WHERE id_usuario=?");
$stmt->bind_param('sssdsi', $usuario, $correo, $contraseña, $ingresos, $telefono, $id);
$stmt->execute();

// Devolver una respuesta al archivo JavaScript
header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>
