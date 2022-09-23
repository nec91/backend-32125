const express = require ('express')
const app = express ()
const routes = require('./modulos/routes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.use('/api/productos', routes)


app.listen (8080,()=>{
    console.log('servidor corriendo en el puerto 8080')
})

