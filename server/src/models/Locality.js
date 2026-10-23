
const mongoose = require('mongoose')

const localitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    parentArea: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

localitySchema.index({ city: 1, slug: 1 }, { unique: true })
localitySchema.index({ city: 1, parentArea: 1 })

module.exports = mongoose.model('Locality', localitySchema)
