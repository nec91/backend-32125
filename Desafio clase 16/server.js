//dependecies
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { mysql, sqlite } = require("./src/database/options");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const container = require("./src/container/contenedor");

//routes
const rutas = require("./src/routes/routes");

//app
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", rutas);

// Knex
const mysqlKnex = new container(mysql, "productos");
const sqliteKnex = new container(sqlite, "mensajes");

//ejs
app.set("views", "./views");
app.set("view engine", "ejs");

// //methods
// app.get("/", (req, res) => {
//   res.render("pages/productos");
// });

//io

io.on("connection", async (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.emit("productos", await mysqlKnex.getAll());
  socket.on("newProducto", async (product) => {
    await mysqlKnex.save(product);

    io.emit("productos", await mysqlKnex.getAll());
  });

  socket.emit("mensajes", await sqliteKnex.getAll());

  socket.on("newMensaje", async (msg) => {
    msg.date = new Date().toLocaleString();
    await sqliteKnex.save(msg);

    io.emit("mensajes", await sqliteKnex.getAll());
  });
});

//port
const PORT = 8000;

const connectedServer = app.listen(PORT, () => {
  console.log(
    `Servidor Http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (err) => console.log(err));
