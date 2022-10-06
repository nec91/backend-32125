//dependecies
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//routes
const rutasProductos = require("./src/routes/routesProductos");
const productos = require("./src/container/contenedor");
const rutasMensajes = require("./src/routes/routesMensajes");
const mensajes = require("./src/container/contenedorMensajes");

//app
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", rutasProductos);
app.use("/", rutasMensajes);

//ejs
app.set("views", "./views");
app.set("view engine", "ejs");

//methods
app.get("/", (req, res) => {
  res.render("pages/productos");
});

//port
const PORT = 8000;

const connectedServer = app.listen(PORT, () => {
  console.log(
    `Servidor Http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (err) => console.log(err)),
  //io
  io.on("connection", async (socket) => {
    //detectar user conectado
    console.log("Usuario conectado");
    socket.emit("productos", await productos.getAll());
    socket.emit("messages", await mensajes.getAll());

    //respuesta del usuario
    socket.on("respuesta producto", (data) => {
      console.log(data);
      io.emit("productos", async () => {
        await productos.getAll();
      });
    });
    socket.on("client-message", (data) => {
      mensajes.save(data);
      io.sockets.emit("messages", async () => {
        await mensajes.getAll();
      });
    });
  });