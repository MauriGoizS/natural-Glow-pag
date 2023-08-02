
let productos = [];

async function getProductos() {
  const response = await fetch('php/products/get_products.php', { method: 'GET' });
  const result = await response.json();
  return result.data;
}

setTimeout(() => {

  getProductos()
  .then(products => {
    productos = products;
    console.log("productos", productos);
    displayProducts();
    loading = false;
    displayLoading();
  })
  .catch(error => {
    console.error('Ocurrio un error:', error);
    displayLoading();
  });

}, 1000);


function displayProducts() {
  let productosHtml = '';


  productos.forEach((producto, index) => {
    if (index < 4) {
      productosHtml+= /*html*/ `
      <div class="card">
          <img src="${producto.imagen}"
              class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
          </div>
          <h4>$${producto.precioventa} MXN</h4>
          <div class="card-footer centrar">
              <a href="/interfazCompleto/productos/producto.html?idProducto=${producto.idproducto}" class="ver-producto-btn">Ver Producto</a>
          </div>
      </div>
      `
    }
  });

  let productosHtml2 = '';

  productos.forEach((producto, index) => {
    if (index > 3) {
      productosHtml2+= /*html*/ `
      <div class="card">
          <img src="${producto.imagen}"
              class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.descripcion}</p>
          </div>
          <h4>$${producto.precioventa} MXN</h4>
          <div class="card-footer centrar">
              <a href="/interfazCompleto/productos/${producto.url}.html" class="ver-producto-btn">Ver Producto</a>
          </div>
      </div>
      `
    }
  });

  document.getElementById('row-products-1').innerHTML = productosHtml;
  document.getElementById('row-products-2').innerHTML = productosHtml2;
}


