const { Router } = require("express");
const productosRouter = Router();

  const Contenedor = require("../container/contenedor");
const producto = require("../models/productos");
const contenidoArchivo = new Contenedor("productos");

productosRouter.get("/", async (req, res) => {
  const productos = await contenidoArchivo.getAll();
  res.status(200).json(productos);
});

productosRouter.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const product = await contenidoArchivo.getById(id);
  if (product < 1) {
    res.status(400).json({ error: "Producto no encontrado." });
  } else {
    res.status(200).json(product);
  }
});

productosRouter.post("/", async (req, res) => {
  const newItem = req.body;
  const Item = new producto(
    newItem.title,
    newItem.description,
    newItem.code,
    newItem.thumbnail,
    newItem.price,
    newItem.stock
  );
  const newItemGuardado = await contenidoArchivo.save(Item);
  res.status(200).json({
    message: "POST recibido",
    newItemGuardado,
  });
});

productosRouter.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id)
  let producto = await contenidoArchivo.getById(id);

  if (id === 0) {
    res.status(400).json({ error: "Producto no encontrado" });
  } else {
    producto = req.body
    res.status(201).json(await contenidoArchivo.modifyById(id, producto));
  }
});

productosRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const product = await contenidoArchivo.deleteById(id);
  res.status(200).json({ message: "Producto eliminado", product });
});

module.exports = productosRouter;
