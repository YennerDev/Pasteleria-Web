const tabla = document.getElementById("tabla-productos");
const form = document.querySelector(".form-producto");

const API = "/api/productos";

async function cargarProductos() {

  const res = await fetch(API);
  const productos = await res.json();

  tabla.innerHTML = "";

  productos.forEach(p => {

    const fila = `
      <tr>

        <td>
          <img src="/images/${p.imagen}" width="80">
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

  const formData = new FormData(form);

  await fetch(API, {

    method: "POST",

    body: formData

  });

  form.reset();

  cargarProductos();

});


async function eliminarProducto(id) {

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  cargarProductos();

}

cargarProductos();