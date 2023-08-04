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

if (
  !empty($name) &&
  !empty($email) &&
  !empty($phoneNumber) &&
  !empty($password) &&
  !empty($zipCode) &&
  !empty($neighborhood) &&
  !empty($street) &&
  !empty($numberHouse) &&
  !empty($references)
) {

  try {
    //////////////////////////////////////////////////////////////////////
    // Primero se valida que el email no exista en la base de datos
    //////////////////////////////////////////////////////////////////////

    $sql = "SELECT email from cliente where email = ?";

    $stmt_email = $conn->prepare($sql);
    $stmt_email->bind_param("s", $email);

    $stmt_email->execute();

    $stmt_email->store_result();

    $stmt_email->fetch();
    $number_of_rows = $stmt_email->num_rows;

    //////////////////////////////////////////////////////////////////////
    // Si $number_of_rows es igual a 0 (Zero) significa que no existe ese email en la DB
    //////////////////////////////////////////////////////////////////////
    if ($number_of_rows === 0) {

      //////////////////////////////////////////////////////////////////////
    // Primero se guarda la dirección para obtener el dirrecionid y se guarde como FK in la tabla cliente
    //////////////////////////////////////////////////////////////////////
      $sql_direccion = "INSERT INTO direccion (codigo_postal, colonia, calle, no_casa, Referencias) VALUES (?, ?, ?, ?, ?)";
  
      $stmt = $conn->prepare($sql_direccion);
      $stmt->bind_param("dssds", $zipCode, $neighborhood, $street, $numberHouse, $references);
    
      $stmt->execute();

      $last_id = $stmt->insert_id;

    //////////////////////////////////////////////////////////////////////
    // Una vez guardada la dirección se procede a guardar los datos del cliente
    //////////////////////////////////////////////////////////////////////

      $sql_cliente = "INSERT INTO cliente (nombres, email, telusuario, password, direccionid) VALUES (?, ?, ?, ?, ?)";

      $stmt_cliente = $conn->prepare($sql_cliente);
      $stmt_cliente->bind_param("ssssd", $name, $email, $phoneNumber, $password, $last_id);
    
      $stmt_cliente->execute();

      $last_id_cliente = $stmt_cliente->insert_id;

      //////////////////////////////////////////////////////////////////////
      // Una vez guardada el cliente consultamos ese nuevo cliente para regresarlo al Frontend
      //////////////////////////////////////////////////////////////////////

      $sql_new_cliente = "SELECT direccionid, email, idcliente, nombres, telusuario FROM cliente WHERE idcliente = ?";

      $stmt_new_cliente = $conn->prepare($sql_new_cliente);
      $stmt_new_cliente->bind_param("s", $last_id_cliente);
    
      $stmt_new_cliente->execute();

      $result = $stmt_new_cliente->get_result();

      $response = ["status" => 201, "data" => $result->fetch_assoc()];
    
      echo json_encode($response);

    } else {
      //////////////////////////////////////////////////////////////////////
      // Si llega el flujo de código aqui significa que existe el email
      //////////////////////////////////////////////////////////////////////
      $response = ["status" => 409, "data" => "Ya existe una cuenta con el email: " . $email];
    }
  
  } catch (Exception $e) {
      $response = ["status" => 500, "error" => $e->getMessage()];
      echo json_encode($response);
      $conn->close();
  }
} else {
  echo json_encode(["status" => 200, "data" => "Todos los campos son requeridos"]);
}

  
  $conn->close();
  
?>