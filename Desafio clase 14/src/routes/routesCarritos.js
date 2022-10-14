const { Router } = require("express");
const carritoRouter = Router();

const Contenedor = require("../container/contenedor");
const Carrito = require("../models/carritos");
const contenidoArchivo = new Contenedor("carritos");
const prodArchivo = new Contenedor("productos");

carritoRouter.post("/", async (req, res) => {
  let carrito = new Carrito();
  const newCarrito = await contenidoArchivo.save(carrito);
  res.status(200).json({
    message: "POST recibido",
    newCarrito,
  });
});

carritoRouter.delete("/:id/", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const carrito = await contenidoArchivo.deleteById(id);
  res.status(200).json({ message: "Carrito eliminado", carrito });
});

carritoRouter.get("/:id/productos", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let carritos = await contenidoArchivo.getById(id);
  console.log(carritos);  if (carritos.productos === undefined) {
    res.status(400).json({ error: "El carrito no posee productos." });
  } else {
    res.status(200).json({ id: carritos.id, productos: carritos.productos });
  }
});

carritoRouter.post("/:cart_id/productos", async (req, res) => {
  let { cart_id } = req.params;

  cart_id = parseInt(cart_id);
  let [id] = req.body;
  let item = await prodArchivo.getById(id);
  return res
    .status(201)
    .send(await contenidoArchivo.saveCarrito(item, cart_id));
});

carritoRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  let { id, id_prod } = req.params;
  let carrito = contenidoArchivo.getById(id);

  let index = carrito.productos.findIndex((el, ind) => {
    if (el.id == id_prod) {
      return true;
    }
  });

  let newProducts = carrito.productos.filter((prod, ind) => prod.id != id_prod);
  carrito.productos = newProducts;
  let accion = contenidoArchivo.update(carrito);
  res.json({ response: "Produto eliminado del carrito", carrito: accion });
});

module.exports = carritoRouter;
