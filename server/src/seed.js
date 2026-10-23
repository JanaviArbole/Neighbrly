
require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('./db')
const Category = require('./models/Category')
const Locality = require('./models/Locality')

const categories = [
  {
    name: 'Plumbing',
    slug: 'plumbing',
    description: 'Repairs, installations and maintenance for water systems.',
    icon: 'wrench',
    image: '/images/plumbing.jpg',
    services: [
      'Tap and faucet repair',
      'Leaking pipe repair',
      'Drain and blockage clearing',
      'Toilet and flush repair',
      'Washbasin installation',
      'Shower installation',
      'Bathroom fitting installation',
      'Water tank cleaning',
      'Water pump repair',
      'Pipeline installation',
      'Leak detection',
      'Water heater installation',
    ],
  },
  {
    name: 'Electrical',
    slug: 'electrical',
    description: 'Electrical installation, inspection and repair services.',
    icon: 'zap',
    image: '/images/electrical.jpg',
    services: [
      'Wiring and rewiring',
      'Switch and socket repair',
      'Fan installation',
      'Light installation',
      'MCB and circuit breaker repair',
      'Inverter installation',
      'Electrical fault inspection',
      'Doorbell installation',
    ],
  },
  {
    name: 'Carpentry',
    slug: 'carpentry',
    description: 'Furniture repair, installation and custom woodwork.',
    icon: 'hammer',
    image: '/images/carpentry.jpg',
    services: [
      'Furniture assembly',
      'Door repair',
      'Shelf installation',
      'Cupboard repair',
      'Lock and hinge fitting',
      'Bed repair',
      'Custom woodwork',
    ],
  },
  {
    name: 'Cleaning',
    slug: 'cleaning',
    description: 'Home cleaning and housekeeping services.',
    icon: 'sparkles',
    image: '/images/cleaning.jpg',
    services: [
      'Full home deep cleaning',
      'Kitchen cleaning',
      'Bathroom cleaning',
      'Sofa cleaning',
      'Move-in cleaning',
      'Regular housekeeping',
      'Water tank cleaning',
    ],
  },
  {
    name: 'Painting',
    slug: 'painting',
    description: 'Interior and exterior painting services.',
    icon: 'paintbrush',
    image: '/images/painting.jpg',
    services: [
      'Interior wall painting',
      'Exterior painting',
      'Wall touch-ups',
      'Wall preparation',
      'Waterproofing-related painting',
      'Colour consultation',
    ],
  },
  {
    name: 'Appliances',
    slug: 'appliances',
    description: 'Home appliance repair and maintenance.',
    icon: 'settings',
    image: '/images/appliances.jpg',
    services: [
      'Washing machine repair',
      'Refrigerator repair',
      'AC servicing',
      'Microwave repair',
      'Appliance installation',
      'Appliance maintenance',
      'Water purifier servicing',
    ],
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Discover local healthcare services and facilities.',
    icon: 'heart-pulse',
    image: '/images/healthcare.jpg',
    services: [
      'Clinic discovery',
      'Pharmacy discovery',
      'Diagnostic centre discovery',
      'Appointment enquiries',
      'Home healthcare enquiries',
    ],
  },
  {
    name: 'Groceries',
    slug: 'groceries',
    description: 'Find nearby grocery stores and daily essentials.',
    icon: 'shopping-basket',
    image: '/images/groceries.jpg',
    services: [
      'Grocery stores',
      'Fresh fruits and vegetables',
      'Daily household essentials',
      'Dairy products',
      'Local delivery enquiries',
    ],
  },
]

const localities = [
  {
    name: 'Kothrud',
    slug: 'kothrud',
    city: 'Pune',
    parentArea: 'Pune',
  },
  {
    name: 'Baner',
    slug: 'baner',
    city: 'Pune',
    parentArea: 'Pune',
  },
  {
    name: 'Aundh',
    slug: 'aundh',
    city: 'Pune',
    parentArea: 'Pune',
  },
  {
    name: 'Shivajinagar',
    slug: 'shivajinagar',
    city: 'Pune',
    parentArea: 'Pune',
  },
  {
    name: 'Hadapsar',
    slug: 'hadapsar',
    city: 'Pune',
    parentArea: 'Pune',
  },
  {
    name: 'Wakad',
    slug: 'wakad',
    city: 'Pune',
    parentArea: 'Pune',
  },
  {
    name: 'Pimple Saudagar',
    slug: 'pimple-saudagar',
    city: 'Pimpri-Chinchwad',
    parentArea: 'Pimpri-Chinchwad',
  },
  {
    name: 'Nigdi',
    slug: 'nigdi',
    city: 'Pimpri-Chinchwad',
    parentArea: 'Pimpri-Chinchwad',
  },
  {
    name: 'Akurdi',
    slug: 'akurdi',
    city: 'Pimpri-Chinchwad',
    parentArea: 'Pimpri-Chinchwad',
  },
  {
    name: 'Chinchwad',
    slug: 'chinchwad',
    city: 'Pimpri-Chinchwad',
    parentArea: 'Pimpri-Chinchwad',
  },
  {
    name: 'Pimpri',
    slug: 'pimpri',
    city: 'Pimpri-Chinchwad',
    parentArea: 'Pimpri-Chinchwad',
  },
  {
    name: 'Bhosari',
    slug: 'bhosari',
    city: 'Pimpri-Chinchwad',
    parentArea: 'Pimpri-Chinchwad',
  },
]

const seedDatabase = async () => {
  try {
    await connectDB()

    await Promise.all(
      categories.map(({ slug, ...category }) =>
        Category.findOneAndUpdate(
          { slug },
          { ...category, slug },
          {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          }
        )
      )
    )

    await Promise.all(
      localities.map(({ city, slug, ...locality }) =>
        Locality.findOneAndUpdate(
          { city, slug },
          { ...locality, city, slug },
          {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          }
        )
      )
    )

    console.log(`Seeded ${categories.length} service categories.`)
    console.log(`Seeded ${localities.length} Pune-area localities.`)
  } catch (error) {
    console.error('Database seeding failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()
