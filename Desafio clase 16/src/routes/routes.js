const { Router } = require('express')
const router = Router()
const container = require('../container/contenedor')
const { mysql } = require('../database/options')

const db = new container(mysql, 'productos')


// GET
router.get('/', async (req, res) => {
    let productos = await db.getAll()
    res.send(productos)
})

router.get('/:id', async (req, res) => {
    let producto = await db.getById(req.params.id) != [] ? 'Producto no encontrado' : db.getById(req.params.id)
    res.json({ result: producto })
})

// POST
router.post('/', async (req, res) => {
    let saveProducto = req.body
    let result = await db.save(saveProducto)
    res.json({ result })
})

//PUT

router.put('/:id', async (req, res) => {
    let { id } = req.params
    let newProd = req.body
    let result = await db.modifyById(newProd, id)

    res.json({ status: "Producto modificado", producto: result })
})

// DELETE
router.delete('/:id', async (req, res) => {
    let { id } = req.params
    let prodId = await db.deleteById(id)

    res.json({ status: 'Producto eliminado', response: prodId })
})

router.delete('/', async (req, res) => {
    let deleteAll = await db.deleteAll()
    res.json({ status: 'Base de datos eliminada', deleteAll })
})


module.exports = router