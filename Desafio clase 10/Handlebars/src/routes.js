const Contenedor = require("./contenedor");
const contenidoArchivo = new Contenedor("./src/productos.txt");

const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  const productos = await contenidoArchivo.getAll();
  res.status(200).send(productos);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const product = await contenidoArchivo.getById(id);
  if (product < 1) {
    res.status(400).send({ error: "Producto no encontrado." });
  } else {
    res.status(200).send(product);
  }
});

router.post("/", async (req, res) => {
  const newItem = req.body;
  const newItemGuardado = await contenidoArchivo.save(newItem);
  res.status(200).send({
    message: "POST recibido",
    newItemGuardado,
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const putProduct = req.body;
  if (id === 0) {
    res.status(400).send({ error: "Producto no encontrado" });
  } else {
    res.status(201).send(await contenidoArchivo.modifyById(putProduct, id));
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const product = await contenidoArchivo.deleteById(id);
  res.status(200).send({ message: "Producto eliminado" });
});

module.exports = router;
