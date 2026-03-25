// admin.js modificado para portafolio sin backend

const tabla = document.getElementById("tabla-productos");
const form = document.querySelector(".form-producto");

// Array de productos dinámicos
let productos = [];

// Cargar productos desde localStorage al iniciar
if (localStorage.getItem("productos")) {
  productos = JSON.parse(localStorage.getItem("productos"));
  actualizarTabla();
}

// Escuchar el submit del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = form.nombre.value;
  const precio = form.precio.value;
  const fileInput = form.imagen;

  if (fileInput.files.length === 0) {
    alert("Selecciona una imagen para el producto");
    return;
  }

  const archivo = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const imagenBase64 = reader.result;

    const nuevoProducto = {
      id: Date.now(), // id único
      nombre,
      precio,
      imagen: imagenBase64
    };

    productos.push(nuevoProducto);

    // Guardar en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    // Actualizar tabla
    actualizarTabla();

    // Limpiar formulario
    form.reset();
  };

  reader.readAsDataURL(archivo);
});

// Función para actualizar la tabla de productos
function actualizarTabla() {
  tabla.innerHTML = "";

  productos.forEach((p) => {
    const fila = `
      <tr>
        <td><img src="${p.imagen}" width="80"></td>
        <td>${p.nombre}</td>
        <td>S/ ${p.precio}</td>
        <td><button onclick="eliminarProducto(${p.id})">Eliminar</button></td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

// Función para eliminar producto
function eliminarProducto(id) {
  productos = productos.filter(p => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(productos));
  actualizarTabla();
}