<?php

include '../config/connection.php';

$name = $_POST['name'];
$email = $_POST['email'];
$phoneNumber = $_POST['phoneNumber'];
$password = $_POST['password'];

$zipCode = $_POST['zipCode'];
$neighborhood = $_POST['neighborhood'];
$street = $_POST['street'];
$numberHouse = $_POST['numberHouse'];
$references = $_POST['references'];

try {

    $sql_cliente = "INSERT INTO cliente (nombres, email, telusuario, password, direccionid) VALUES (?, ?, ?, ?, ?)";
    $sql_direccion = "INSERT INTO direccion (codigo_postal, colonia, calle, no_casa, Referencias) VALUES (?, ?, ?, ?, ?)";
  
    // stmt ---> statement
    $stmt = $conn->prepare($sql_direccion);
    $stmt->bind_param("dssds", $zipCode, $neighborhood, $street, $numberHouse, $references);
  
    $stmt->execute();

    $last_id = $stmt->insert_id;

    $stmt_cliente = $conn->prepare($sql_cliente);
    $stmt_cliente->bind_param("ssssd", $name, $email, $phoneNumber, $password, $last_id);
  
    $stmt_cliente->execute();

    $last_id_cliente = $stmt_cliente->insert_id;
  
    // if ($conn->query($sql) === TRUE) {
    //   $result = "New records created successfully";
    // } else {
    //   $result = "Error: " . $sql . "<br>" . $conn->error;
    // }
  
    // $response = ["status" => 200, "data" => $stmt->affected_rows];
    $response = ["status" => 200, "data" => "Se generó regsitro del cliente con el id:" . $last_id_cliente];
  
    echo json_encode($response);
  
  } catch (Exception $e) {
      $response = ["status" => 500, "error" => $e->getMessage()];
      echo json_encode($response);
      $conn->close();
  }
  
  $conn->close();
  
?>