const { Router } = require('express')
const router = Router()

const {
  mostrarTransaccion,
  mostrarIncidente,
  transaccionIncidente
} = require('../controllers/incidente')

router.get('/',  mostrarTransaccion)

router.get('/estados', mostrarIncidente)

router.post('/', transaccionIncidente)

module.exports = router