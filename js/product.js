const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('idProducto');

let producto = null;

async function getProduct() {
    const form = new FormData();
    form.append('idProd', idProducto);
    const response = await fetch('/interfazCompleto/php/products/get_product.php', { method: 'POST', body: form});
    const result = await response.json();
    console.log(result.data);
    return result.data;
}

getProduct()
.then(product => {
    producto = product;
    displayProduct();
})
.catch(error => {
    console.error('Ocurrio un error:', error);
});

function displayProduct() {  
    document.getElementById('producto').innerHTML = /*html*/ `
    <div class="col-md-6 order-md-1">
        <div class="contenedor-imagen">
            <img src="${producto.imagen}" alt="${producto.descripcion}" class="img-fluid">
        </div>
        <br>
        <div id="car">
            <h2>Caracteristicas del producto</h2>
            <h3>Nombre:</h3>
            <p>${producto.nombre}</p>
            <h3>Descripción: </h3>
            <p>${producto.descripcion}</p>
            <h3>ingredientes: </h3>
            <p>s</p>

        </div>

    </div>

    <div class="col-md-6 order-md-2" id="carrito">
        <h2 class="text-center">${producto.nombre}</h2>
        <h3>$ ${producto.precioventa} MXN</h3>
        <p><img src="imagenes/entrega_318-552263.avif" width="35px" alt=""> Envio a domicilio</p>
        <p>Cantidad disponible: ${producto.cantidadexistente}</p>
        <div class="d-flex flex-column align-items-center justify-content-center">
            
            <a name="" id="" class="btn btn-primary tamano" href="https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA42NTU_jMBCG_8scOIWWgmCXSBFK0qqCbZsSYOFmDc7ENWvXXmdSlyL-Owos973N-_XMGxin9FbwqydIgfbeaKkZEvAGuXXBCt1ACtZDAp1m-ieNHSoY0BJT6CB9G0CKmoJaFwZUi6YjSAB73ojWuAjp1y9IQHeC9kxhi0ZEet5pGtLvhXKQwobZd-l4HGMcWQoSG-dRuZF0dmT3Y4-6uerZis71QVKmnFOGjgbHUqN7m0kvP6VE61GrbbZcLMVyLeYir8R8thL5YiGKOl9NP6-yWv0WRV3l0yOLzIKdM9nP88nk7PLk8suKLjT_T1HS6CYrX-KvMn-J3Fem2BT1TMf8B6p20j-ohx3L20dZnG_U9VOFfHpxc39AdSxv5tf5obzzF6YO6_ZvlLqMh92xqF15Rie3-W4qijiD9wRa7FhwQPkHUg49vX8AiGjvYtABAAA/user" role="button">Comprar con Mercado Pago</a>
            <a href="/interfazCompleto/carrito.html"><button type="button" class="btn btn-outline-dark tamano2">AGREGAR AL CARRITO</button></a>
        </div>
    </div>
    `
}

