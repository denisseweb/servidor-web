const { pool } = require('../database')
const { transaccion } = require('../lib')

const transaccionIncidente = async (req, res) => {
  const { si_id, ri_fecha, ri_solucion } = req.body

  try {
    transaccion(async (pool) => {

      const { rows } = await pool.query(
        'SELECT incidente_fecha FROM incidente WHERE incidente_id = $1', 
        [si_id]
      )
      const fecha = rows[0].incidente_fecha
      const si_estado = 'RESUELTO'

      const diferenciaMilisegundos = new Date(fecha) - new Date(ri_fecha)
      const diferenciaDias = diferenciaMilisegundos / (1000*60*60*24)
      console.log(diferenciaDias)

      if(diferenciaDias < 0){

        // Actualizar SEGUIMIENTO_INCIDENTE
        await pool.query(
          'UPDATE seguimiento_incidente SET si_estado = $1 WHERE si_id = $2',
          [si_estado, si_id]
        )

        // Insertar REPORTE
        const ri_id = Math.ceil(Math.random() * 1000)
        await pool.query(
          'INSERT INTO reporte_incidente VALUES($1, $2, $3, $4)',
          [ri_id, si_id, ri_solucion, ri_fecha]
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
      'SELECT incidente.incidente_id, incidente_tipo, incidente_fecha, '+
      'si_estado, ri_solucion, ri_fecha '+
      'FROM incidente '+
      'inner join seguimiento_incidente on incidente.incidente_id = seguimiento_incidente.incidente_id '+
      'inner join reporte_incidente on seguimiento_incidente.si_id = reporte_incidente.si_id'
    )
    res.json(revisiones.rows)
  } catch (e) {
    res.json(e.message)
  }
}

const mostrarIncidente = async (req, res) => {
  try {
    const entregas = await pool.query(
      'SELECT incidente.incidente_id, incidente_tipo, incidente_fecha, si_estado '+
      'FROM incidente INNER JOIN seguimiento_incidente '+
      'on incidente.incidente_id = seguimiento_incidente.incidente_id'
    )
    res.json(entregas.rows)
  } catch (e) {
    res.json(e.message)
  }
}

module.exports = {
  transaccionIncidente,
  mostrarIncidente,
  mostrarTransaccion
}