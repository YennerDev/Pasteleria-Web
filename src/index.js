const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");
const productosRoutes = require("./routes/productosRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rutas API
app.use("/api", productosRoutes);
app.use("/api", pedidosRoutes);
app.use("/api/pedidos", pedidosRoutes);
// Probar conexión con PostgreSQL
pool.connect()
  .then(() => {
    console.log("Conectado a PostgreSQL");
  })
  .catch((err) => {
    console.error("Error conectando a la base de datos", err);
  });

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de Pastelería funcionando 🍰");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});