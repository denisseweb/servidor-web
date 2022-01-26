const { app } = require('./source/config')
const PORT = 4001

const servidor = (port) => {
  console.log(`Servidor funcionando en el puerto: ${port}`)
}

app.listen(
  PORT,
  servidor(PORT)
)