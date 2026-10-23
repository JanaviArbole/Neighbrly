
require('dotenv').config()

const app = require('./app')
const connectDB = require('./db')

const PORT = process.env.PORT || 5001

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Neighbrly API running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
