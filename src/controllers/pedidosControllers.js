const pool = require("../config/database");

const crearPedido = async (req, res) => {
  try {
    const { producto, cliente, telefono } = req.body;

    const result = await pool.query(
      "INSERT INTO pedidos (producto, cliente, telefono) VALUES ($1,$2,$3) RETURNING *",
      [producto, cliente, telefono]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando pedido" });
  }
};



const obtenerPedidos = async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM pedidos ORDER BY fecha DESC"
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Error obteniendo pedidos" });

  }

};


module.exports = {
  crearPedido,
  obtenerPedidos
};