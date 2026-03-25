async function cargarProductos() {
  try {
    const response = await fetch("/api/productos");
    const productos = await response.json();

    const contenedor = document.getElementById("productos-container");
    //contenedor.innerHTML = "";

    productos.forEach(producto => {

      const card = `
      <div class="producto">
        <img src="${producto.imagen}" width="200">
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