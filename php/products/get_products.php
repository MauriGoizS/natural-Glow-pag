<?php

include '../config/connection.php';


try {

    $sql = "SELECT * FROM producto ";
    $result = $conn->query($sql);

    $response = ["status" => 200, "data" => $result->fetch_all(MYSQLI_ASSOC)];

    echo json_encode($response);

} catch (Exception $e) {
    $response = ["status" => 500, "error" => $e->getMessage()];
    echo json_encode($response);
    $conn->close();
}

$conn->close();

?>