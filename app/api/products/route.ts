import { NextResponse } from 'next/server'
import { listProducts } from '@/lib/catalog'
import { ensureSeeded } from '@/lib/seed'
import { isMongoConfigured, getProductRepository } from '@/lib/db/index'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  await ensureSeeded()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || undefined
  const q = searchParams.get('q') || undefined

  if (isMongoConfigured()) {
    const products = await getProductRepository().list({ category, q })
    return NextResponse.json(
      products.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice ?? undefined,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        seller: p.storeName || p.sellerName || 'Central Canteen',
        sellerType: (p.sellerType as any) || 'Independent Seller',
        image: p.image,
        description: p.description,
        inStock: p.inStock,
        tag: p.tag ?? undefined,
        deliveryTime: p.deliveryTime,
        mealType: p.mealType ?? undefined,
      }))
    )
  }

  const products = await listProducts({ category, q })

  return NextResponse.json(
    products.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.original_price ?? undefined,
      rating: p.rating,
      reviewsCount: p.reviews_count,
      seller: p.store_name || p.seller_name,
      sellerType: (p.seller_type as any) || 'Independent Seller',
      image: p.image,
      description: p.description,
      inStock: !!p.in_stock,
      tag: p.tag ?? undefined,
      deliveryTime: p.delivery_time,
      mealType: (p as any).meal_type || undefined,
    }))
  )
}
