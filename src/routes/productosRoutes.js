const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  obtenerProductos,
  crearProducto,
  eliminarProducto
} = require("../controllers/productosController");


// CONFIGURACIÓN DE MULTER
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "public/img");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });


// Obtener todos los productos
router.get("/productos", obtenerProductos);


// Crear producto (SUBIENDO IMAGEN)
router.post("/productos", upload.single("imagen"), crearProducto);


// Eliminar producto
router.delete("/productos/:id", eliminarProducto);


module.exports = router;