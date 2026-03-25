const tabla = document.getElementById("tabla-productos");
const form = document.querySelector(".form-producto");

const API = "/api/productos";

async function cargarProductos() {

  const res = await fetch(API);
  const productos = await res.json();

  tabla.innerHTML = "";

  productos.forEach(p => {

    // 🔥 Detectar si es URL o imagen local
    const rutaImagen = p.imagen.startsWith("http")
      ? p.imagen
      : `/images/${p.imagen}`;

    const fila = `
      <tr>

        <td>
          <img src="${rutaImagen}" width="80">
        </td>

        <td>${p.nombre}</td>

        <td>S/ ${p.precio}</td>

        <td>
          <button onclick="eliminarProducto(${p.id})">
            Eliminar
          </button>
        </td>

      </tr>
    `;

    tabla.innerHTML += fila;

  });

}


form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData();

  const nombre = form.nombre.value;
  const precio = form.precio.value;

  const fileInput = form.imagenArchivo;
  const urlInput = form.imagenURL;

  formData.append("nombre", nombre);
  formData.append("precio", precio);

  // 🔥 LÓGICA MIXTA
  if (fileInput.files.length > 0) {
    // 👉 archivo (temporal en Render)
    formData.append("imagen", fileInput.files[0]);
  } else {
    // 👉 URL (persistente)
    formData.append("imagenURL", urlInput.value);
  }

  await fetch(API, {
    method: "POST",
    body: formData
  });

  form.reset();
  cargarProductos();

});


function limpiarFormulario() {
  form.reset();
}


async function eliminarProducto(id) {

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  cargarProductos();

}

cargarProductos();