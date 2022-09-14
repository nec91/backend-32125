const express = require('express')
const app = express () 

const Contenedor = require ('./contenedor') 
const contenidoArchivo = new Contenedor ('./productos.txt')

app.get('/productos', (req,res) => {
     contenidoArchivo.getAll()
     .then(productos =>res.send(productos))
})

app.get('/random', (req, res) =>{
    contenidoArchivo.getAll().then(productos =>{
        let numRandom = Math.ceil(Math.random() * productos.length);
        contenidoArchivo.getById(numRandom)
        .then(producto =>res.json(producto))
    })
});

const PORT = 8080
const connectedServer = app.listen (PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address ().port}`)
})
connectedServer.on('error',(err)=>console.log (err)) 
