const express = require("express");
const productos = require("./routes/routesProductos");
const carritos = require("./routes/routesCarritos");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/carrito", carritos);
app.use("/api/productos", productos);

app.all("*", (req, res) => {
  res.status(404).send({
    Error: "Path no encontrado",
  });
});

const connectedServer = app.listen(PORT, () => {
  console.log(
    `Servidor Http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (err) => console.log(err));
