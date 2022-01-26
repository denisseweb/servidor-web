const { Router } = require('express')
const router = Router()

const {
  leerPropietario,
  actualizarPropietario,
  eliminarPropietario
} = require('../controllers/propietario')

router.get('/', leerPropietario)

router.post('/actualizar', actualizarPropietario)

router.delete('/:id', eliminarPropietario)

module.exports = router