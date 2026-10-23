
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const router = express.Router()

function safeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    city: user.city,
    locality: user.locality,
  }
}

// Register a new resident or provider account
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, city, locality } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and role are required.',
      })
    }

    if (!['resident', 'provider'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account role.',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      phone: phone || '',
      city: city || 'Pune',
      locality: locality || '',
    })

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'development-only-change-this-secret',
      { expiresIn: '1d' }
    )

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      user: safeUser(user),
      token,
    })
  } catch (error) {
    console.error('Registration error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Could not create account.',
    })
  }
})

// Sign in with an existing account
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and role are required.',
      })
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      role,
      isActive: true,
    }).select('+passwordHash')

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'development-only-change-this-secret',
      { expiresIn: '1d' }
    )

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      user: safeUser(user),
      token,
    })
  } catch (error) {
    console.error('Login error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Could not sign in.',
    })
  }
})

module.exports = router
