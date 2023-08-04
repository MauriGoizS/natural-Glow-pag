<?php

include '../config/connection.php';

$email = $_POST['email'];
$password = $_POST['password'];


if (!empty($email) && !empty($password)) {

    try {
        $sql = "SELECT direccionid, email, idcliente, nombres, telusuario FROM cliente WHERE email = ? AND password = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $password);

        $stmt->execute();

        $result = $stmt->get_result();

        $response = ["status" => 200, "data" => $result->fetch_assoc()];

        echo json_encode($response);

    } catch (Exception $e) {
        $response = ["status" => 500, "error" => $e->getMessage()];
        echo json_encode($response);
        $conn->close();
    }
} else {
    echo json_encode(["status" => 200, "data" => "Correo y contraseña son requeridos"]);
}

$conn->close();

?>