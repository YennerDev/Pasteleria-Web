

async function cargarProductos() {
try {
const response = await fetch("/api/productos");
const productos = await response.json();

const contenedor = document.getElementById("productos-container");

// 🔥 Limpia SOLO los dinámicos (no afecta los fijos)
contenedor.innerHTML = "";

productos.forEach(producto => {

  // 🔥 Corrige la ruta de la imagen
  const rutaImagen = producto.imagen.startsWith("http")
    ? producto.imagen
    : `/img/${producto.imagen}`;

  const card = `
  <div class="producto">
    <img src="${rutaImagen}" width="200">
    <h3>${producto.nombre}</h3>
    <p>S/ ${producto.precio}</p>

    <button onclick="pedirProducto('${producto.nombre}')">
      Pedir
    </button>
  </div>
  `;

  contenedor.innerHTML += card;

});

} catch (error) {
console.error("Error cargando productos:", error);
}
}

function pedirProducto(nombre){
localStorage.setItem("productoSeleccionado", nombre);
window.location.href = "pedidos.html";
}

cargarProductos();