const express = require('express')
const app = express () 

const Contenedor = require ('./contenedor') 
const contenidoArchivo = new Contenedor ('./productos.txt')

app.get('/productos', async (req,res) => {
    const productos = await contenidoArchivo.getAll()
    res.json(productos)

})

app.get('/random', async (req, res) =>{
    const getFromFile = await contenidoArchivo.getAll()
        let numRandom = Math.ceil(Math.random() * getFromFile.length)
        let productoRandom = await contenidoArchivo.getById(numRandom)
        res.json(productoRandom)
})

const PORT = 8080
const connectedServer = app.listen (PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address ().port}`)
})
connectedServer.on('error',(err)=>console.log (err))
