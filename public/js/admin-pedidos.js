const tabla = document.getElementById("tabla-pedidos");

async function cargarPedidos() {

  const res = await fetch("/api/pedidos");
  const pedidos = await res.json();

  tabla.innerHTML = "";

  pedidos.forEach(p => {

    const fila = `
      <tr>

        <td>${p.producto}</td>

        <td>${p.cliente}</td>

        <td>${p.telefono}</td>

        <td>${new Date(p.fecha).toLocaleString()}</td>

      </tr>
    `;

    tabla.innerHTML += fila;

  });

}

cargarPedidos();