<?php

include '../config/connection.php';

$idProduct = $_POST['idProd'];

try {

  $sql = "SELECT * FROM producto WHERE idproducto = ?";

  // stmt ---> statement
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $idProduct);

  $stmt->execute();

  $result = $stmt->get_result();

  $response = ["status" => 200, "data" => $result->fetch_assoc()];

  echo json_encode($response);

} catch (Exception $e) {
    $response = ["status" => 500, "error" => $e->getMessage()];
    echo json_encode($response);
    $conn->close();
}

$conn->close();

?>