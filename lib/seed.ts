import { getDb } from '@/lib/db'
import { countUsers, createUser, createProduct } from '@/lib/catalog'
import { hashPassword } from '@/lib/auth'
import { PRODUCTS } from '@/lib/mock-data'

export async function ensureSeeded() {
  getDb()
  if (countUsers() > 0) return

  const password = await hashPassword('password123')

  createUser({
    email: 'admin@bupnest.com',
    passwordHash: password,
    name: 'BUP Nest Admin',
    role: 'ADMIN',
    phone: '+880 1700 000000',
    isBupVerified: true,
  })

  createUser({
    email: 'buyer@example.com',
    passwordHash: password,
    name: 'Tanvir Ahmed',
    role: 'BUYER',
    studentId: '22041108',
    department: 'ICE / FST',
    phone: '+880 1711 234567',
    isBupVerified: true,
  })

  const sellers = [
    {
      email: 'alumni@bupnest.com',
      name: 'Alumni Welfare Club',
      storeName: 'BUP Alumni & Student Welfare Club',
      sellerType: 'BUP Official',
    },
    {
      email: 'canteen@bupnest.com',
      name: 'Central Canteen',
      storeName: 'Central Canteen (Mirpur Cantonment)',
      sellerType: 'Campus Canteen',
    },
    {
      email: 'fst@bupnest.com',
      name: 'FST Exchange Society',
      storeName: 'FST Academic Exchange Society',
      sellerType: 'Student Society',
    },
    {
      email: 'robotics@bupnest.com',
      name: 'Robotics Syndicate',
      storeName: 'BUP Robotics & Tech Syndicate',
      sellerType: 'Student Vendor',
    },
    {
      email: 'culture@bupnest.com',
      name: 'Cultural Forum',
      storeName: 'BUP Cultural Forum Craft Stall',
      sellerType: 'Student Society',
    },
    {
      email: 'lake@bupnest.com',
      name: 'Lake Cafe',
      storeName: 'Lake Promenade Cafe',
      sellerType: 'Campus Canteen',
    },
    {
      email: 'bcc@bupnest.com',
      name: 'BCC Club',
      storeName: 'BUP Business & Communication Club (BCC)',
      sellerType: 'Student Society',
    },
    {
      email: 'techhub@bupnest.com',
      name: 'Campus Tech Hub',
      storeName: 'Campus Tech Hub (Mirpur DOHS)',
      sellerType: 'Outside Partner',
    },
  ]

  const sellerIds: Record<string, string> = {}
  for (const s of sellers) {
    const user = createUser({
      email: s.email,
      passwordHash: password,
      name: s.name,
      role: 'SELLER',
      phone: '+880 1800 000000',
      isBupVerified: true,
      storeName: s.storeName,
      storeDescription: `${s.storeName} on BUP Nest marketplace`,
      sellerType: s.sellerType,
    })
    sellerIds[s.storeName] = user.id
  }

  for (const p of PRODUCTS) {
    const sellerId = sellerIds[p.seller]
    if (!sellerId) continue
    createProduct({
      sellerId,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      stock: 50,
      tag: p.tag,
      deliveryTime: p.deliveryTime,
    })
  }
}
