const express = require('express')
const app = express () 
const productos = require('./src/routes')

app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.use('/api/productos', productos)

const PORT = 8080
const connectedServer = app.listen (PORT, () =>{
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address ().port}`)
})
connectedServer.on('error',(err)=>console.log (err))
