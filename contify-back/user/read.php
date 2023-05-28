<?php
include '../header.php';
include '../db.php';

$sql = "SELECT * FROM usuarios ";

$result = $conn->query($sql);

// Crear un array con los resultados
$data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}
// Devolver los datos en formato JSON
echo json_encode($data);
?>