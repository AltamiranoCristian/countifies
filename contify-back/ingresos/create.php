<?php
include '../header.php';
include '../db.php';

// Inserción de datos
$data = json_decode(file_get_contents('php://input'), true);
$fecha = $data['fecha'];
$cuenta = $data['cuenta'];
$categoria = $data['categoria'];
$importe = $data['importe'];
$nota = $data['nota'];

// Insertar los datos en la base de datos
$stmt = $conn->prepare("INSERT INTO ingresos (fecha, tipo_ingreso, categoria, importe, descripcion, id_usuario) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param('sssssi', $fecha, $cuenta, $categoria, $importe, $nota, $data['id']);
$stmt->execute();

// Verificar si la inserción fue exitosa
if ($stmt->affected_rows > 0) {
    $response = ['success' => true, 'message' => 'Inserción exitosa'];
} else {
    $response = ['success' => false, 'message' => 'Error en la inserción: ' . $stmt->error];
}

$stmt->close();
$conn->close();

// Devolver una respuesta JSON al archivo JavaScript
header('Content-Type: application/json');
echo json_encode($response);
?>
