const { Router } = require('express')
const router = Router()
const Productos = require('./class/productos')

const validacion = (title, price, thumbnail) => {
  if (!title || !price || !thumbnail) return { error: 'Ingrese todos los campos.' };
  else return { title, price, thumbnail }
};

const getAllProducts = async (req, res) => {
  try {
    const {productos} = Productos.getProduct
    res.json(productos)
  } catch (error) {
    throw new Error(error)
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body
    const newProduct = validacion(title, price, thumbnail)
    if (newProduct.error) {
      res.json(newProduct)
    } else {
      const producto = await Productos.add(newProduct)
      res.json(producto)
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await Productos.getProductByID(id)
    res.json(producto)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Productos.delete(id)
    res.json(deletedProduct)
  } catch (error) {
    throw new Error(error)
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    const updateProduct = await validacion(title, price, thumbnail)

    if (updateProduct.error) {
      res.json(updateProduct)
    } else {
      const product = await Productos.update(updateProduct, id)
      res.json(product)
    }
  } catch (error) {
    throw new Error(error)
  }
}


router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', addNewProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router