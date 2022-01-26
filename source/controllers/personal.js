const { pool } = require('../database')

const leerPersonal = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM personal_externo')
    res.json(resultado.rows)
  } catch (error) {
    res.json(error.message)
  }
}

const actualizarPersonal = async (req, res) => {
  let {
    pe_id,
    pe_cedula,
    pe_nombre,
    pe_apellido,
    pe_cargo
  } = req.body

  try {
    const resultado = await pool.query(
      'SELECT * FROM personal_externo WHERE pe_id = $1', 
      [pe_id]
    )

    if(resultado.rows.length === 0){
      await pool.query(
        'INSERT INTO personal_externo VALUES($1, $2, $3, $4, $5)',
        [
          pe_id,
          pe_cedula,
          pe_nombre,
          pe_apellido,
          pe_cargo
        ]
      )
      res.json({mensaje: 'REGISTRO INSERTADO'})
    } else {
      await pool.query(
        'UPDATE personal_externo SET ' +
        'pe_cedula = $1, ' +
        'pe_nombre = $2, ' +
        'pe_apellido = $3, ' +
        'pe_cargo = $4 ' +
        'WHERE pe_id = $5',
        [ 
          pe_cedula,
          pe_nombre,
          pe_apellido,
          pe_cargo,
          pe_id
        ]
      )
      res.json({mensaje: 'REGISTRO ACTUALIZADO'})
    }
  } catch (error) {
    res.json(error.message)
  }
}

const eliminarPersonal = async (req, res) => {
  const { id } = req.params
  try {
    const resultado = await pool.query(
      'SELECT * FROM personal_externo WHERE pe_id = $1', 
      [id]
    )

    if(resultado.rows.length === 0){
      return res.status(404).json({
        mensaje: 'REGISTRO NO ENCONTRADO'
      })
    } else {
      await pool.query(
        'DELETE FROM personal_externo WHERE pe_id = $1',
        [id]
      )
      res.json({mensaje: 'REGISTRO ELIMINADO'})
    }
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {
  leerPersonal,
  actualizarPersonal,
  eliminarPersonal
}