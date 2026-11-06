import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrderItem {
  productId: string
  sellerId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface IOrder extends Document {
  customId: string
  orderNumber: string
  buyerId: string
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentMethod: 'COD' | 'BKASH' | 'NAGAD' | 'CARD'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  deliveryCampus?: string | null
  deliveryAddress?: string | null
  phone?: string | null
  notes?: string | null
  items: IOrderItem[]
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    sellerId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    customId: { type: String, unique: true, index: true, required: true },
    orderNumber: { type: String, unique: true, index: true, required: true },
    buyerId: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'BKASH', 'NAGAD', 'CARD'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    deliveryCampus: { type: String, default: null },
    deliveryAddress: { type: String, default: null },
    phone: { type: String, default: null },
    notes: { type: String, default: null },
    items: { type: [OrderItemSchema], required: true },
  },
  {
    timestamps: true,
  }
)

export const OrderModel: Model<IOrder> =
  (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>('Order', OrderSchema)

