async function getProduct() {
    const form = new FormData();
    form.append('idProd', idProducto);
    const response = await fetch('/interfazCompleto/php/products/get_product.php', { method: 'POST', body: form});
    const result = await response.json();
    console.log(result.data);
    return result.data;
}