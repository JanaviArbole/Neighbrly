
const express = require('express')
const router = express.Router()

const Category = require('../models/Category')

// GET /api/categories
// Fetch all active service categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select('name slug description icon image services')
      .sort({ name: 1 })
      .lean()

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    })
  } catch (error) {
    console.error('Get categories error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch service categories.',
    })
  }
})

// GET /api/categories/:slug
// Fetch one active category by its slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug.toLowerCase(),
      isActive: true,
    })
      .select('name slug description icon image services')
      .lean()

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Service category not found.',
      })
    }

    return res.status(200).json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error('Get category error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch the service category.',
    })
  }
})

module.exports = router
