<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "naturalglowfi";


// $connection = mysql_connect($servername, $user, $password);
// $db = mysql_select_db($database, $connection);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>