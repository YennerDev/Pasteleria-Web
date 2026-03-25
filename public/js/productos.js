// productos.js para mostrar dinámicos + fijos
async function cargarProductos() {
  try {
    // Traer productos dinámicos desde backend
    const res = await fetch("/api/productos");
    const productosDinamicos = await res.json();

    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = ""; // limpiar contenedor

    // Crear tarjetas para cada producto dinámico
    productosDinamicos.forEach(producto => {
      // Ruta de imagen
      const rutaImagen = producto.imagen.startsWith("http")
        ? producto.imagen
        : `/images/${producto.imagen}`;

      const card = `
      <div class="producto">
        <img src="${rutaImagen}" width="200">
        <h3>${producto.nombre}</h3>
        <p>S/ ${producto.precio}</p>
        <button onclick="pedirProducto('${producto.nombre}')">Pedir</button>
      </div>
      `;
      contenedor.innerHTML += card;
    });

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function pedirProducto(nombre) {
  localStorage.setItem("productoSeleccionado", nombre);
  window.location.href = "pedidos.html";
}

cargarProductos();