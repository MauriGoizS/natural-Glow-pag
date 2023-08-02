const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('idProducto');

console.log('idProducto', idProducto);

function getProduct() {
    const form = new FormData();
    form.append('idProduct', idProducto);
}