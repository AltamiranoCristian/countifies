<?php
// Aquí puedes establecer la conexión a tu base de datos
include '../header.php';
include '../db.php';
// Obtén el valor de la columna enviado desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['usuario'];

// Realiza la consulta para contar los registros
$sql = "SELECT COUNT(*) AS total FROM ingresos WHERE id_usuario = $username";
$result = $conn->query($sql);

// Verifica si la consulta se ejecutó correctamente
if ($result) {
    // Obtiene el número total de registros
    $row = mysqli_fetch_assoc($result);
    $total = $row['total'];

    // Crea un arreglo con el resultado
    $response = ['total' => $total];

    // Devuelve la respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Si hay un error en la consulta, devuelve una respuesta de error
    $response = ['error' => 'Error al contar los registros'];
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
