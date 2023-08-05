function cerrarSesion() {
    localStorage.removeItem('cliente');
    window.location.href = '/interfazCompleto/index.html';
}

function usuarioEstaLogueado() {
    const cliente = localStorage.getItem('cliente');
    if (cliente !== null) {
        const clienteObject = JSON.parse(cliente);
        console.log('Esta imprimiendo clienteObject', clienteObject);
        document.getElementById('user-name').innerText = clienteObject.nombres;
    } else {
        document.getElementById('user-name').innerText = '';
    }
}

document.getElementById('navbar').innerHTML = /*html*/ `
<div class="container-fluid">
    <button id="button" class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container-nav">
        <div class="logo">
            <a href="/interfazCompleto/">
                <img src="/interfazCompleto/imagenes/logo.jpg" width="60px" alt="">
            </a>
        </div>
        <div class="actions">
            <a class="carrito-icono" href="/interfazCompleto/carrito.html">
                <img id="img2" src="/interfazCompleto/imagenes/carrito.png">
                <span id="badge-carrito" class="badge-carrito"></span>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavba" aria-controls="offcanvasDarkNavbar aria-label=" Toggle
                navigation">
                <img id="img3" src="/interfazCompleto/imagenes/user.png"
                    width="50px" alt="">
            </button>
            <span id="user-name"></span>
        </div>
    </div>

    <div class="offcanvas offcanvas-start text-bg-dark bg-success" tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header bg-success">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Productos</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"
                        href="/interfazCompleto/apartado/cuidadoCabello.html">Cuidado de cabello</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"
                        href="/interfazCompleto/apartado/cuidadoFacial.html">Cuidado facial</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"
                        href="/interfazCompleto/apartado/cuidadoPiel.html">Cuidado de la piel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"
                        href="/interfazCompleto/apartado/maquillaje.html">Maquillaje</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="offcanvas offcanvas-end text-bg-dark bg-success" tabindex="-1" id="offcanvasDarkNavba"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header bg-success">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Usuario</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/interfazCompleto/login.html">Iniciar Sesion</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/interfazCompleto/registro.html">Registrarse</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/interfazCompleto/estatus.html">Seguimiento del
                        pedido</a>
                </li>
                <li class="nav-item">
                    <a id="cerrar-sesion" class="nav-link active pointer" aria-current="page">Cerrar sesión</a>
                </li>
            </ul>
        </div>
    </div>
</div>
`

document.getElementById('cerrar-sesion').addEventListener('click', function () {
    localStorage.removeItem('cliente');
    window.location.href = '/interfazCompleto/index.html';
})

usuarioEstaLogueado();

function tieneProductosElCarrito() {
    const infoCarrito = localStorage.getItem('carrito');
    const badgeCarrito = document.getElementById('badge-carrito');
    if (infoCarrito !== null) {
        badgeCarrito.style.display = 'block';
        const carrito = JSON.parse(infoCarrito);
        badgeCarrito.innerText = carrito.length;
    } else {
        badgeCarrito.style.display = 'none';
    }
}

tieneProductosElCarrito();