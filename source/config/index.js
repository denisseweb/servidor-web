const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

let corsOpciones = {
  origin: '*',
  optionsSuccessStatus: 200
}

// Rutas
const {
  pagoRoutes,
  incidenteRoutes,
  propietarioRoutes,
  personalRoutes
} = require('../routes')

const app = express()
const router = express.Router()

app
  .use(express.json())
  .use(cors(corsOpciones))
  .use(morgan('dev'))

router.use('/pago', pagoRoutes)
router.use('/incidente', incidenteRoutes)
router.use('/propietario', propietarioRoutes)
router.use('/personal', personalRoutes)

app.use(router)

module.exports = { app }