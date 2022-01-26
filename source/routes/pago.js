const { Router } = require('express')
const router = Router()

const {
  mostrarTransaccion,
  mostrarPago,
  transaccionPago
} = require('../controllers/pago')

router.get('/',  mostrarTransaccion)

router.get('/estados', mostrarPago)

router.post('/', transaccionPago)

module.exports = router