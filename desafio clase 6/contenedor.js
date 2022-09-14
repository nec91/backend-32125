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
        } else {            
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify( [ {...objeto, id: 1} ]), 'utf-8')
        }

    }
    async getById(id) {
        const contenidoArchivo = await this.#leerArchivo()  
        const producto = contenidoArchivo.filter(item => item.id === id)
        if (producto.length > 0) {
            return producto
        } else {
            console.log('Id no identificado.')
        }
     }

    async getAll(){ 
        try{
            const contenidoArchivo =  await this.#leerArchivo()
            return contenidoArchivo
        }catch (error) { 
            console.log(error)
        }
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

module.exports = Contenedor