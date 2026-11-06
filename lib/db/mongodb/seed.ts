import bcrypt from 'bcryptjs'
import { connectToDatabase } from './connection'
import { UserModel } from './models/User'
import { ProductModel } from './models/Product'
import { StallModel } from './models/Stall'
import { PRODUCTS, STALLS } from '../../mock-data'

function cuid() {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

export async function ensureMongoSeeded(): Promise<void> {
  await connectToDatabase()

  const userCount = await UserModel.countDocuments().exec()

  if (userCount === 0) {
    const password = await bcrypt.hash('password123', 10)

    await UserModel.create([
      {
        customId: cuid(),
        email: 'admin@bupnest.com',
        passwordHash: password,
        name: 'BUP Nest Admin',
        role: 'ADMIN',
        phone: '+880 1700 000000',
        isBupVerified: true,
        storeName: 'BUP Administration',
        sellerType: 'BUP Official',
      },
      {
        customId: 'user_tanvir_22041108',
        email: 'buyer@example.com',
        passwordHash: password,
        name: 'Tanvir Ahmed',
        role: 'SELLER',
        studentId: '22041108',
        department: 'ICE / FST',
        phone: '+880 1711 234567',
        isBupVerified: true,
        storeName: "Tanvir's Campus Stall",
        storeDescription: "Tanvir's campus corner on BUP Nest",
        sellerType: 'Student Vendor',
      },
      {
        customId: cuid(),
        email: 'alumni@bupnest.com',
        passwordHash: password,
        name: 'Alumni Welfare Club',
        role: 'SELLER',
        phone: '+880 1800 000001',
        isBupVerified: true,
        storeName: 'BUP Alumni & Student Welfare Club',
        sellerType: 'BUP Official',
      },
      {
        customId: 'user_canteen_central',
        email: 'canteen@bupnest.com',
        passwordHash: password,
        name: 'Central Canteen',
        role: 'SELLER',
        phone: '+880 1800 000002',
        isBupVerified: true,
        storeName: 'Central Canteen (Mirpur Cantonment)',
        sellerType: 'Campus Canteen',
      },
      {
        customId: cuid(),
        email: 'fst@bupnest.com',
        passwordHash: password,
        name: 'FST Exchange Society',
        role: 'SELLER',
        phone: '+880 1800 000003',
        isBupVerified: true,
        storeName: 'FST Academic Exchange Society',
        sellerType: 'Student Society',
      },
      {
        customId: cuid(),
        email: 'robotics@bupnest.com',
        passwordHash: password,
        name: 'Robotics Syndicate',
        role: 'SELLER',
        phone: '+880 1800 000004',
        isBupVerified: true,
        storeName: 'BUP Robotics & Tech Syndicate',
        sellerType: 'Student Vendor',
      },
      {
        customId: cuid(),
        email: 'culture@bupnest.com',
        passwordHash: password,
        name: 'Cultural Forum',
        role: 'SELLER',
        phone: '+880 1800 000005',
        isBupVerified: true,
        storeName: 'BUP Cultural Forum Craft Stall',
        sellerType: 'Student Society',
      },
      {
        customId: 'user_lake_cafe',
        email: 'lake@bupnest.com',
        passwordHash: password,
        name: 'Lake Cafe',
        role: 'SELLER',
        phone: '+880 1800 000006',
        isBupVerified: true,
        storeName: 'Lake Promenade Cafe',
        sellerType: 'Campus Canteen',
      },
      {
        customId: cuid(),
        email: 'bcc@bupnest.com',
        passwordHash: password,
        name: 'BCC Club',
        role: 'SELLER',
        phone: '+880 1800 000007',
        isBupVerified: true,
        storeName: 'BUP Business & Communication Club (BCC)',
        sellerType: 'Student Society',
      },
      {
        customId: cuid(),
        email: 'techhub@bupnest.com',
        passwordHash: password,
        name: 'Campus Tech Hub',
        role: 'SELLER',
        phone: '+880 1800 000008',
        isBupVerified: true,
        storeName: 'Campus Tech Hub (Mirpur DOHS)',
        sellerType: 'Outside Partner',
      },
    ])
  }

  // Map store names to seller IDs
  const allUsers = await UserModel.find().exec()
  const sellerMap = new Map<string, string>()
  for (const u of allUsers) {
    if (u.storeName) sellerMap.set(u.storeName, u.customId)
  }
  const defaultCanteenId = sellerMap.get('Central Canteen (Mirpur Cantonment)') || allUsers[0]?.customId

  // Sync PRODUCTS into MongoDB
  for (const p of PRODUCTS) {
    const existing = await ProductModel.findOne({
      $or: [{ customId: p.id }, { name: p.name }],
    }).exec()

    if (!existing) {
      const sellerId = sellerMap.get(p.seller) || defaultCanteenId
      if (sellerId) {
        await ProductModel.create({
          customId: p.id,
          sellerId,
          name: p.name,
          description: p.description,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice ?? null,
          image: p.image,
          stock: 50,
          inStock: p.inStock,
          tag: p.tag ?? null,
          deliveryTime: p.deliveryTime,
          rating: p.rating,
          reviewsCount: p.reviewsCount,
          isActive: true,
          mealType: p.mealType ?? null,
        })
      }
    } else if (p.mealType && !existing.mealType) {
      existing.mealType = p.mealType
      await existing.save()
    }
  }

  // Sync STALLS into MongoDB
  const stallCount = await StallModel.countDocuments().exec()
  if (stallCount === 0) {
    for (const s of STALLS) {
      await StallModel.create({
        stallId: s.id,
        name: s.name,
        zone: s.zone,
        side: s.side,
        status: s.status,
        position: s.position,
        tone: s.tone,
        dailyRate: s.dailyRate,
        features: s.features,
        coordinates: s.coordinates,
        footfall: s.footfall,
        peakHours: s.peakHours,
        ambience: s.ambience,
        image: s.image,
        dimensions: s.dimensions,
        powerGrid: s.powerGrid,
        recommendedFor: s.recommendedFor,
        description: s.description,
        reservedBy: s.reservedBy ?? null,
      })
    }
  }
}

