
const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Plumbing',
        'Electrical',
        'Carpentry',
        'Cleaning',
        'Painting',
        'Appliances',
        'Healthcare',
        'Groceries',
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    services: {
      type: [String],
      required: true,
      validate: {
        validator: (services) => services.length > 0,
        message: 'At least one service must be provided.',
      },
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      required: true,
      default: 'Pune',
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    workingHours: {
      type: String,
      required: true,
      default: 'Mon–Sat, 9:00 AM–6:00 PM',
    },
    priceFrom: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
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

providerSchema.index({ city: 1, locality: 1, category: 1 })
providerSchema.index({ businessName: 'text', description: 'text' })

module.exports = mongoose.model('Provider', providerSchema)
