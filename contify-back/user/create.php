<?php
include '../header.php';
include '../db.php';

// inserción de datos
$data = json_decode(file_get_contents('php://input'), true);

// Insertar los datos en la base de datos
$stmt = $conn->prepare("INSERT INTO usuarios (usuario, email, password, ingresos, telefono) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param('sssds', $data['user'], $data['email'], $data['password'], $data['amount'], $data['phone']);
$stmt->execute();

// Devolver una respuesta JSON al archivo JavaScript
$response = ['success' => true];
echo json_encode($response);
?>
