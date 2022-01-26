const { pool } = require('../database')
const { transaccion } = require('../lib')

const transaccionPago = async (req, res) => {
  const { fallecido_id, pago_valor, pago_fecha } = req.body

  try {
    transaccion(async (pool) => {

      const { rows } = await pool.query(
        'SELECT pago_valor FROM pago WHERE pago_id = $1', 
        [fallecido_id]
      )
      const pago = rows[0].pago_valor
      const valor_pagar = Number(pago_valor).toFixed(2)
      const pago_estado = 'PAGADO'

      // Verificar pago
      if(pago == valor_pagar){

        // Actualizar pago
        await pool.query(
          'UPDATE pago SET pago_fecha = $1, pago_estado = $2 WHERE pago_id = $3',
          [pago_fecha, pago_estado, fallecido_id]
        )

        // Generar certificado
        const certificado_id = Math.ceil(Math.random() * 1000)
        await pool.query(
          'INSERT INTO certificado VALUES($1, $2, $3)',
          [fallecido_id, certificado_id, pago_fecha]
        )

        res.json({ mensaje: `SE EJECUTÓ LA TRANSACCIÓN` })
      } else {
        res.json({ mensaje: `NO SE EJECUTÓ LA TRANSACCIÓN` })
      }
    })
  } catch (e) {
    res.json(e.message)
  }
}

const mostrarTransaccion = async (req, res) => {
  try {
    const revisiones = await pool.query(
      'SELECT fallecido.fallecido_id, fallecido_nombres, fallecido_apellidos, '+
      'pago_tipo, pago_fecha, pago_valor, certificado_fecha '+
      'FROM fallecido '+
      'INNER JOIN pago ON fallecido.fallecido_id = pago.fallecido_id '+
      'INNER JOIN certificado ON pago.pago_id = certificado.pago_id'
    )
    res.json(revisiones.rows)
  } catch (e) {
    res.json(e.message)
  }
}

const mostrarPago = async (req, res) => {
  try {
    const entregas = await pool.query(
      'SELECT pago_id, pago_valor, pago_estado '+
      'FROM pago'
    )
    res.json(entregas.rows)
  } catch (e) {
    res.json(e.message)
  }
}

module.exports = {
  transaccionPago,
  mostrarPago,
  mostrarTransaccion
}