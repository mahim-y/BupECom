import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProduct extends Document {
  customId: string
  sellerId: string
  name: string
  description: string
  category: string
  price: number
  originalPrice?: number | null
  image: string
  stock: number
  inStock: boolean
  tag?: string | null
  deliveryTime: string
  rating: number
  reviewsCount: number
  isActive: boolean
  mealType?: string | null
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    customId: { type: String, unique: true, index: true, required: true },
    sellerId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: null },
    image: { type: String, required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    inStock: { type: Boolean, default: true, index: true },
    tag: { type: String, default: null },
    deliveryTime: { type: String, default: '2-4 days' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true, index: true },
    mealType: { type: String, default: null, index: true },
  },
  {
    timestamps: true,
  }
)

// Text index for search
ProductSchema.index({ name: 'text', description: 'text', category: 'text' })

export const ProductModel: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema)

