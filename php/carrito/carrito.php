<?php
include '../config/connection.php';

$carrito = json_decode($_POST['carrito']);
$cliente = json_decode($_POST['cliente']);

try {
    $total = 0;

    foreach ($carrito as $item) {
        $total = $total + $item->producto->precioventa * $item->cantidad;
    }
    
    $sql = "INSERT INTO carrito (fechapedido, total, clienteid, productoid) VALUES ('". date('Y-m-d') ."', " . $total . ", " . $cliente->idcliente . ", 0)";
    // $stmt = $conn->prepare($sql);

    // $stmt->bind_param("sdii", date('Y-m-d'), $total, $cliente->idcliente, 0);
    // $stmt->execute();

    // $last_id = $stmt->insert_id;

    $conn->query($sql);
    $last_id = $conn->insert_id;

    $sql_carrito_prod = "INSERT INTO carrito_producto (cant_prod, precio, descuento, carritoid, productoid) VALUES (?, ?, ?, ?, ?)";
    // $stmt_carrito_prod = $conn->prepare($sql_carrito_prod);

    foreach ($carrito as $item) {
        $sql_carrito_prod = "INSERT INTO carrito_producto (cant_prod, precio, descuento, carritoid, productoid) VALUES (". $item->cantidad .", ". $item->producto->precioventa .", ". 0 .", ". $last_id .", ". $item->producto->idproducto .")";
        // $stmt_carrito_prod->bind_param("ddddd", $item->cantidad, $item->producto->precioventa, 0, $last_id, $item->producto->idproducto);
        // $stmt_carrito_prod->execute();
        $conn->query($sql_carrito_prod);
    }
    $response = ["status" => 201, "data" => [
        "mensaje" => "La compra fue realizada con éxito",
        "idCompra" => $last_id 
    ]];

    // $response = [ "status" => 200, "data" => $sql];
    
    echo json_encode($response);

}  catch (Exception $e) {
    $response = ["status" => 500, "error" => $e->getMessage()];
    echo json_encode($response);
    $conn->close();
}

$conn->close();

?>
