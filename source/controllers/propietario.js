const { pool } = require('../database')

const leerPropietario = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM propietario')
    res.json(resultado.rows)
  } catch (error) {
    res.json(error.message)
  }
}

const actualizarPropietario = async (req, res) => {
  let {
    propietario_id,
    propietario_cedula,
    propietario_nombres,
    propietario_apellidos,
    propietario_fecha,
    propietario_direccion,
    propietario_telefono
  } = req.body

  try {
    const resultado = await pool.query(
      'SELECT * FROM propietario WHERE propietario_id = $1', 
      [propietario_id]
    )

    if(resultado.rows.length === 0){
      await pool.query(
        'INSERT INTO propietario VALUES($1, $2, $3, $4, $5, $6, $7)',
        [
          propietario_id,
          propietario_cedula,
          propietario_nombres,
          propietario_apellidos,
          propietario_fecha,
          propietario_direccion,
          propietario_telefono
        ]
      )
      res.json({mensaje: 'REGISTRO INSERTADO'})
    } else {
      await pool.query(
        'UPDATE propietario SET '     +
        'propietario_cedula = $1, ' +
        'propietario_nombres = $2, ' +
        'propietario_apellidos = $3, ' +
        'propietario_fecha = $4, ' +
        'propietario_direccion = $5, ' +
        'propietario_telefono = $6 '  +
        'WHERE propietario_id = $7',
        [ 
          propietario_cedula,
          propietario_nombres,
          propietario_apellidos,
          propietario_fecha,
          propietario_direccion,
          propietario_telefono,
          propietario_id
        ]
      )
      res.json({mensaje: 'REGISTRO ACTUALIZADO'})
    }
  } catch (error) {
    res.json(error.message)
  }
}

const eliminarPropietario = async (req, res) => {
  const { id } = req.params
  try {
    const resultado = await pool.query(
      'SELECT * FROM propietario WHERE propietario_id = $1', 
      [id]
    )

    if(resultado.rows.length === 0){
      return res.status(404).json({
        mensaje: 'REGISTRO NO ENCONTRADO'
      })
    } else {
      await pool.query(
        'DELETE FROM propietario WHERE propietario_id = $1',
        [id]
      )
      res.json({mensaje: 'REGISTRO ELIMINADO'})
    }
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {
  leerPropietario,
  actualizarPropietario,
  eliminarPropietario
}