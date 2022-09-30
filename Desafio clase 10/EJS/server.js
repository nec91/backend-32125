const express = require("express");
const app = express();
const productos = require("./src/routes");

//ejs

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/api/productos", productos);
app.get('/', (req, res) => {
  res.render('pages/index');
})

const PORT = 8080;
const connectedServer = app.listen(PORT, () => {
    console.log(
    `Servidor Http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (err) => console.log(err));
