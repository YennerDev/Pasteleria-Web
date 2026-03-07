const producto = localStorage.getItem("productoSeleccionado");

if(producto){
  document.getElementById("producto").value = producto;
}

const form = document.getElementById("formPedido");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cliente = document.getElementById("cliente").value;
  const telefono = document.getElementById("telefono").value;

  await fetch("/api/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      producto,
      cliente,
      telefono
    })
  });

  alert("Pedido enviado correctamente");
});