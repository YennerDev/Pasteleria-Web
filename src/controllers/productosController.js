const pool = require("../config/database");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};


// Agregar producto
const crearProducto = async (req, res) => {
  try {

    const { nombre, precio } = req.body;

    // Imagen subida con multer
    const imagen = `img/${req.file.filename}`;

    const result = await pool.query(
      "INSERT INTO productos (nombre, precio, imagen) VALUES ($1,$2,$3) RETURNING *",
      [nombre, precio, imagen]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};


// Eliminar producto
const eliminarProducto = async (req, res) => {
  try {

    const { id } = req.params;

    await pool.query("DELETE FROM productos WHERE id = $1", [id]);

    res.json({ mensaje: "Producto eliminado" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Error al eliminar producto" });

  }
};


module.exports = {
  obtenerProductos,
  crearProducto,
  eliminarProducto
};