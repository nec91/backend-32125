class Productos {
    constructor() {
        this.productos = []
    }

    getProduct() {
        if (this.productos.length === 0)
            return { error:'No se encuentran productos en la base de datos' }
        else {
            return this.productos
        }
    }

    addProduct(product) {
        try {
            const newItem = { ...product, id: this.productos.length ? this.productos[this.productos.length - 1].id + 1 : 1 }
            this.productos.push(newItem)
            return newItem
        } catch (error) {
            throw new Error(error)
        }
    }

    getProductByID(id) {
        this.getProducts;
        const item = this.productos.filter(item => item.id === id)
        if (this.productos.length > 0) {
            return item
        } else { return {error: 'Producto no encontrado.' }
    }}

    deleteById(id) {
        this.getProducts;
        const item = this.productos.find((product) => product.id === Number(id)) || { error: 'Producto no encontrado.' }
        this.productos = this.productos.filter((item) => item.id !== Number(id))
        return item
    }

    update(product, id) {
        this.getProducts
        try {
          const { title, price, thumbnail } = product
          const item = this.items.find((prd) => prd.id === Number(id))
          if (item) {
            item.title = title;
            item.price = price;
            item.thumbnail = thumbnail;
            return item;
          } else {
            return { error: 'Producto no encontrado.' }
          }
        } catch (error) {
          throw new Error(error)
        }
      }
    }

    module.exports = new Productos()
