let carrito = null;

const btnEliminar = document.getElementById('btn-eliminar');
const btnComprar = document.getElementById('btn-comprar');

function obtenerCarrito() {
    const infoCarrito = localStorage.getItem('carrito');
    if (infoCarrito !== null) {
        carrito = JSON.parse(infoCarrito);
        mostrarListadoProductos();
        btnEliminar.classList.remove('disabled');
    } else {
        // Si está vacío el carrito se tiene que mostrar un mensaje de carrito vacío
        document.getElementById('mensaje-carrito-vacio').style.display = 'block';
        carrito = [];
        btnEliminar.classList.add('disabled');
    }
}

obtenerCarrito();

function mostrarListadoProductos() {
    let productoHtml = '';
    let total = 0;

    carrito.forEach((articulo) => {
        productoHtml+= /*html*/ `
        <div class="list-group-item producto">
            <div class="imagen-producto">
            <img class="img-producto" src="${articulo.producto.imagen}" alt="${articulo.producto.nombre}">
            </div>
            <div class="nombre-producto">
            ${articulo.producto.nombre}
            </div>
            <div class="cantidad-producto">
            ${articulo.cantidad}
            </div>
            <div class="precio-producto">
            $${articulo.producto.precioventa}
            </div>
        </div>
        `
        total = total + articulo.producto.precioventa * articulo.cantidad;
    });

    if (carrito.length > 0) {
        productoHtml += /*html*/ `
        <div class="list-group-item producto">
            <div class="total-producto">
                Total de pago:&nbsp;
                <strong>$${total}</strong>
            </div>
        </div>
        `;
    }

    document.getElementById('listado-productos').innerHTML = productoHtml; 
}

function eliminarCarrito() {
    localStorage.removeItem('carrito');
    obtenerCarrito();
    tieneProductosElCarrito();
    mostrarListadoProductos();
}

btnEliminar.addEventListener('click', eliminarCarrito);