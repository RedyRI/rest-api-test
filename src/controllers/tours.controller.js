import { pool } from "../db.js";

export const getTours  = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tours");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({message:"something went wrong"})
  }
};

export const getTour = async (req, res) => {
  const id = req.params["id"];
  try {
    const [rows] = await pool.query("SELECT * FROM tours WHERE id = ?", [id]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "tour not found" });
    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const createTour = async (req, res) => {
  const { nombre, descripcion, fotos, costos, incluye, no_incluye } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO tours (nombre, descripcion, fotos, costos, incluye, no_incluye) VALUES (?,?,?,?,?,?)",
      [nombre, descripcion, fotos, costos, incluye, no_incluye]
    );
    res.send({ rows });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
}

export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM tours WHERE id = ?", [id]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Tour no encontrado" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fotos, costos, incluye, no_incluye } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE tours SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), fotos = IFNULL(?, fotos), costos = IFNULL(?, costos), incluye = IFNULL(?, incluye), no_incluye = IFNULL(?, no_incluye)",
      [nombre, descripcion, fotos, costos, incluye, no_incluye]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "tour no encontrado" });

    const [rows] = await pool.query("SELECT * FROM tours WHERE id = ?", [id]);

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};