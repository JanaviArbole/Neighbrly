
const express = require('express')

const app = express()

// Import routes
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

// Middleware — must come before routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Neighbrly API is running.',
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.',
  })
})

// Handle unexpected errors
app.use((err, req, res, next) => {
  console.error('API error:', err.message)

  res.status(err.status || 500).json({
    success: false,
    message: 'An unexpected server error occurred.',
  })
})

module.exports = app
