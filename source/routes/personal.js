const { Router } = require('express')
const router = Router()

const {
  leerPersonal,
  actualizarPersonal,
  eliminarPersonal
} = require('../controllers/personal')

router.get('/', leerPersonal)

router.post('/actualizar', actualizarPersonal)

router.delete('/:id', eliminarPersonal)

module.exports = router