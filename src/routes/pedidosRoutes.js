const express = require("express");
const router = express.Router();

const { crearPedido, obtenerPedidos } = require("../controllers/pedidosControllers");

router.post("/pedidos", crearPedido);
router.get("/pedidos", obtenerPedidos);
module.exports = router;