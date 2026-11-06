import { connectToDatabase } from '../connection'
import { ProductModel, IProduct } from '../models/Product'
import { UserModel } from '../models/User'
import {
  IProductRepository,
  ProductDocument,
  ListProductsOptions,
  CreateProductInput,
  UpdateProductInput,
} from '../../interfaces/IProductRepository'

function cuid() {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

function toProductDocument(
  doc: IProduct,
  sellerInfo?: { sellerName?: string; storeName?: string | null; sellerType?: string | null }
): ProductDocument {
  return {
    id: doc.customId,
    sellerId: doc.sellerId,
    sellerName: sellerInfo?.sellerName,
    storeName: sellerInfo?.storeName ?? null,
    sellerType: sellerInfo?.sellerType ?? null,
    name: doc.name,
    description: doc.description,
    category: doc.category,
    price: doc.price,
    originalPrice: doc.originalPrice ?? null,
    image: doc.image,
    stock: doc.stock,
    inStock: doc.inStock,
    tag: doc.tag ?? null,
    deliveryTime: doc.deliveryTime,
    rating: doc.rating,
    reviewsCount: doc.reviewsCount,
    isActive: doc.isActive,
    mealType: doc.mealType ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

export class MongoProductRepository implements IProductRepository {
  async list(opts?: ListProductsOptions): Promise<ProductDocument[]> {
    await connectToDatabase()
    const query: Record<string, any> = {}

    if (opts?.activeOnly !== false) {
      query.isActive = true
    }

    if (opts?.category && opts.category !== 'All') {
      query.category = opts.category
    }

    if (opts?.sellerId) {
      query.sellerId = opts.sellerId
    }

    if (opts?.q) {
      const regex = new RegExp(opts.q, 'i')
      query.$or = [{ name: regex }, { description: regex }, { category: regex }, { tag: regex }]
    }

    const products = await ProductModel.find(query).sort({ createdAt: -1 }).exec()
    if (products.length === 0) return []

    // Fetch seller info for all distinct sellers
    const sellerIds = Array.from(new Set(products.map((p) => p.sellerId)))
    const sellers = await UserModel.find({ customId: { $in: sellerIds } }).exec()
    const sellerMap = new Map(
      sellers.map((s) => [s.customId, { sellerName: s.name, storeName: s.storeName, sellerType: s.sellerType }])
    )

    return products.map((p) => toProductDocument(p, sellerMap.get(p.sellerId)))
  }

  async findById(id: string): Promise<ProductDocument | null> {
    await connectToDatabase()
    const product = await ProductModel.findOne({ customId: id }).exec()
    if (!product) return null

    const seller = await UserModel.findOne({ customId: product.sellerId }).exec()
    return toProductDocument(product, seller ? { sellerName: seller.name, storeName: seller.storeName, sellerType: seller.sellerType } : undefined)
  }

  async create(input: CreateProductInput): Promise<ProductDocument> {
    await connectToDatabase()
    const customId = cuid()
    const product = await ProductModel.create({
      customId,
      sellerId: input.sellerId,
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      originalPrice: input.originalPrice ?? null,
      image: input.image,
      stock: input.stock,
      inStock: input.stock > 0,
      tag: input.tag ?? null,
      deliveryTime: input.deliveryTime ?? '2-4 days',
      rating: 0,
      reviewsCount: 0,
      isActive: true,
      mealType: input.mealType ?? null,
    })

    const seller = await UserModel.findOne({ customId: input.sellerId }).exec()
    return toProductDocument(product, seller ? { sellerName: seller.name, storeName: seller.storeName, sellerType: seller.sellerType } : undefined)
  }

  async update(id: string, sellerId: string, input: UpdateProductInput): Promise<ProductDocument | null> {
    await connectToDatabase()
    const updateFields: Record<string, any> = {}
    if (input.name !== undefined) updateFields.name = input.name
    if (input.description !== undefined) updateFields.description = input.description
    if (input.category !== undefined) updateFields.category = input.category
    if (input.price !== undefined) updateFields.price = input.price
    if (input.originalPrice !== undefined) updateFields.originalPrice = input.originalPrice
    if (input.image !== undefined) updateFields.image = input.image
    if (input.stock !== undefined) {
      updateFields.stock = input.stock
      updateFields.inStock = input.stock > 0
    }
    if (input.tag !== undefined) updateFields.tag = input.tag
    if (input.deliveryTime !== undefined) updateFields.deliveryTime = input.deliveryTime
    if (input.isActive !== undefined) updateFields.isActive = input.isActive
    if (input.mealType !== undefined) updateFields.mealType = input.mealType

    const product = await ProductModel.findOneAndUpdate(
      { customId: id, sellerId },
      { $set: updateFields },
      { new: true }
    ).exec()

    if (!product) return null

    const seller = await UserModel.findOne({ customId: sellerId }).exec()
    return toProductDocument(product, seller ? { sellerName: seller.name, storeName: seller.storeName, sellerType: seller.sellerType } : undefined)
  }

  async delete(id: string, sellerId: string): Promise<boolean> {
    await connectToDatabase()
    const result = await ProductModel.deleteOne({ customId: id, sellerId }).exec()
    return result.deletedCount > 0
  }

  async adjustStock(id: string, delta: number): Promise<boolean> {
    await connectToDatabase()
    const product = await ProductModel.findOne({ customId: id }).exec()
    if (!product) return false

    const newStock = product.stock + delta
    if (newStock < 0) return false

    product.stock = newStock
    product.inStock = newStock > 0
    await product.save()
    return true
  }
}

