const fs = require('fs')


class Contenedor {
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo
        
    }

    async #leerArchivo(){
        try {
            const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            const contenidoParseado = JSON.parse(contenido)
            return contenidoParseado
        } catch (error) {
            console.log(error)
        }
        
    }
    async save(objeto){ 
        const contenidoArchivo =  await this.#leerArchivo()
        if (contenidoArchivo.length !== 0) {
            await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contenidoArchivo, {...objeto, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], true, 2), 'utf-8')
            console.log(`Producto guardado con exito`)
        } else {            
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...objeto, id: 1} ]), 'utf-8')
            console.log(`Producto guardado con exito`)
        }

    }
    async getById(id) {
        const contenidoArchivo = await this.#leerArchivo()  
        const producto = contenidoArchivo.filter(item => item.id === id)
        if (producto.length > 0) {
            console.log('Producto encontrado: ' + JSON.stringify(producto, true, 2))
        } else {
            console.log('Id no identificado.')
        }
     }

    async getAll(){ 
        const contenidoArchivo =  await this.#leerArchivo()
        console.log(contenidoArchivo)
    }

     async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2), 'utf-8')
            console.log('Base de datos eliminada correctamente')
        } catch (error) {
            console.log('Error al eliminar base de datos',error)
        }
      }

     async deleteById(id) {
        const contenidoArchivo = await this.#leerArchivo()

        try{
            const notDeleted = contenidoArchivo.filter(producto => producto.id !== id)
            const toDelete = contenidoArchivo.filter(producto => producto.id === id)
            if ( toDelete.length > 0) {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(notDeleted, null, 2),'utf-8')
            console.log(`Producto eliminado:${JSON.stringify(toDelete, null, 2)}`)
            }
        } catch (error) {
            console.log(`Producto no identificado`,error)
        }
    }

}

const contenedor = new Contenedor('productos.txt')


// contenedor.save({nombre: 'Botas Snowboard', precio: 70.5, thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGL8vMTErsxIlz03ru-Kg3_N_ZcotFQGCDQ&usqp=CAU'})
// contenedor.save({nombre: 'Campera Snowboard', precio: 150.5, thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtfoHQLC5zXuLhr09QSDA0CbRlRl3CqgUS9xPQTHb481cEVdoGVbyWMpjZ0rWQWwvDwM&usqp=CAU'})
// contenedor.save({nombre: 'Pantalon Snowboard', precio: 120.7, thumbnail: 'https://www.daktak.es/media/catalog/product/cache/1/small_image/260x/9df78eab33525d08d6e5fb8d27136e95/g/o/go_13.jpg'})

contenedor.getAll()
// contenedor.deleteAll()
// contenedor.getById(3)
// contenedor.deleteById(2) 
