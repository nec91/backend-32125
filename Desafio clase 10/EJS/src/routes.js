const Contenedor = require("./contenedor");
const contenidoArchivo = new Contenedor("./src/productos.txt");

const { Router } = require("express");
const router = Router();

router.get('/productos', async (req, res) => {
  res.render('pages/tabla', {
      productos: await contenidoArchivo.getAll(),
      mensaje: "No hay productos disponibles"
  });
})

router.post('/', async (req, res) => {
  const saveProduct = req.body;
  await contenidoArchivo.save(saveProduct);
  res.status(201).redirect('/productos');
})

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
