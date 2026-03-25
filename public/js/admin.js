// admin.js corregido para que el botón "Agregar producto" funcione

const tabla = document.getElementById("tabla-productos");
const form = document.querySelector(".form-producto");

const API = "/api/productos";

// Cargar productos desde la API y mostrar en la tabla
async function cargarProductos() {
  try {
    const res = await fetch(API);
    const productos = await res.json();

    tabla.innerHTML = "";

    productos.forEach(p => {
      // Detectar si es URL o ruta local
      const rutaImagen = p.imagen.startsWith("http")
        ? p.imagen
        : `/images/${p.imagen}`;

      const fila = `
        <tr>
          <td><img src="${rutaImagen}" width="80"></td>
          <td>${p.nombre}</td>
          <td>S/ ${p.precio}</td>
          <td>
            <button onclick="eliminarProducto(${p.id})">Eliminar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// Manejar submit del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  const nombre = form.nombre.value;
  const precio = form.precio.value;

  const fileInput = form.imagen; // Debe coincidir con name="imagen"

  formData.append("nombre", nombre);
  formData.append("precio", precio);

  // Adjuntar imagen si se seleccionó un archivo
  if (fileInput.files.length > 0) {
    formData.append("imagen", fileInput.files[0]);
  } else {
    alert("Selecciona una imagen para el producto");
    return;
  }

  try {
    await fetch(API, {
      method: "POST",
      body: formData
    });

    form.reset();
    cargarProductos();

  } catch (error) {
    console.error("Error agregando producto:", error);
  }
});

// Función para eliminar producto
async function eliminarProducto(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    cargarProductos();
  } catch (error) {
    console.error("Error eliminando producto:", error);
  }
}

// Cargar productos al iniciar
cargarProductos();