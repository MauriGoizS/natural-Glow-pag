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

echo json_encode($name);

$conn->close();

?>