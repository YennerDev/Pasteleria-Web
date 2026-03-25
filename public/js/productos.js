const contenedor = document.getElementById("productos-container");

// 🔥 Traer productos guardados
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// 🔥 PRODUCTOS FIJOS (para que siempre haya contenido)
const productosFijos = [
  {
    nombre: "Torta Infantil",
    precio: 80,
    imagen: "torta_infantil.jpg"
  },
  {
    nombre: "Torta de Chocolate",
    precio: 60,
    imagen: "torta_chocolate.jpg"
  }
];

// 🔥 UNIR ambos
const todosLosProductos = [...productosFijos, ...productos];

// 🔥 MOSTRAR
todosLosProductos.forEach(p => {

  const rutaImagen = p.imagen.startsWith("http")
    ? p.imagen
    : `/img/${p.imagen}`;

  const card = `
    <div class="producto">
      <img src="${rutaImagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>S/ ${p.precio}</p>
      <button>Pedido</button>
    </div>
  `;

  contenedor.innerHTML += card;

});