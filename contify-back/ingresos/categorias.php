<?php
include '../header.php';
include '../db.php';

// Obtén el ID del usuario
$usuario = $_GET['usuario']; // Reemplaza con el ID del usuario correspondiente

// Realiza la consulta SQL para obtener los datos de ingresos o egresos del usuario
$sql = "SELECT categoria, SUM(importe) AS total FROM ingresos WHERE id_usuario = $usuario GROUP BY categoria";
$resultado = mysqli_query($conn, $sql);

// Crea un array para almacenar los datos de la consulta
$datos = array();

// Recorre los resultados y guarda los datos en el array
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

// Retorna los datos en formato JSON
echo json_encode($datos);
?>
