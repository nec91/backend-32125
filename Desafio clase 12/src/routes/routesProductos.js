const Contenedor = require("../container/contenedor");
const contenidoArchivo = new Contenedor("productos.txt");

const { Router } = require("express");
const router = Router();

router.get("/productos", async (req, res) => {
  res.render("pages/index", {
    productos: await contenidoArchivo.getAll()
  });
});

router.post("/", async (req, res) => {
  const saveProduct = req.body;
  await contenidoArchivo.save(saveProduct);
  res.status(201).redirect("/productos");
});

module.exports = router;
