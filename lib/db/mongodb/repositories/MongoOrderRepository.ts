import { connectToDatabase } from '../connection'
import { OrderModel, IOrder } from '../models/Order'
import { ProductModel } from '../models/Product'
import {
  IOrderRepository,
  OrderDocument,
  CreateOrderInput,
} from '../../interfaces/IOrderRepository'

function cuid() {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

function toOrderDocument(doc: IOrder): OrderDocument {
  return {
    id: doc.customId,
    orderNumber: doc.orderNumber,
    buyerId: doc.buyerId,
    status: doc.status,
    paymentMethod: doc.paymentMethod,
    paymentStatus: doc.paymentStatus,
    subtotal: doc.subtotal,
    deliveryFee: doc.deliveryFee,
    discount: doc.discount,
    total: doc.total,
    deliveryCampus: doc.deliveryCampus ?? null,
    deliveryAddress: doc.deliveryAddress ?? null,
    phone: doc.phone ?? null,
    notes: doc.notes ?? null,
    items: doc.items.map((item) => ({
      productId: item.productId,
      sellerId: item.sellerId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

export class MongoOrderRepository implements IOrderRepository {
  async create(input: CreateOrderInput): Promise<OrderDocument> {
    await connectToDatabase()
    const customId = cuid()
    const orderNumber = `BUP-${Math.floor(100000 + Math.random() * 900000)}`

    // Verify stock and update atomically
    for (const item of input.items) {
      const product = await ProductModel.findOne({ customId: item.productId }).exec()
      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name}`)
      }
    }

    for (const item of input.items) {
      await ProductModel.findOneAndUpdate(
        { customId: item.productId, stock: { $gte: item.quantity } },
        {
          $inc: { stock: -item.quantity },
        }
      ).exec()

      // Update inStock flag if depleted
      const updatedProd = await ProductModel.findOne({ customId: item.productId }).exec()
      if (updatedProd && updatedProd.stock <= 0) {
        updatedProd.inStock = false
        await updatedProd.save()
      }
    }

    const order = await OrderModel.create({
      customId,
      orderNumber,
      buyerId: input.buyerId,
      status: 'PENDING',
      paymentMethod: input.paymentMethod,
      paymentStatus: 'PENDING',
      subtotal: input.subtotal,
      deliveryFee: input.deliveryFee,
      discount: input.discount,
      total: input.total,
      deliveryCampus: input.deliveryCampus ?? null,
      deliveryAddress: input.deliveryAddress ?? null,
      phone: input.phone ?? null,
      notes: input.notes ?? null,
      items: input.items,
    })

    return toOrderDocument(order)
  }

  async findById(id: string): Promise<OrderDocument | null> {
    await connectToDatabase()
    const order = await OrderModel.findOne({ customId: id }).exec()
    return order ? toOrderDocument(order) : null
  }

  async findByOrderNumber(orderNumber: string): Promise<OrderDocument | null> {
    await connectToDatabase()
    const order = await OrderModel.findOne({ orderNumber }).exec()
    return order ? toOrderDocument(order) : null
  }

  async listBuyerOrders(buyerId: string): Promise<OrderDocument[]> {
    await connectToDatabase()
    const orders = await OrderModel.find({ buyerId }).sort({ createdAt: -1 }).exec()
    return orders.map(toOrderDocument)
  }

  async listSellerOrders(sellerId: string): Promise<OrderDocument[]> {
    await connectToDatabase()
    const orders = await OrderModel.find({ 'items.sellerId': sellerId })
      .sort({ createdAt: -1 })
      .exec()
    return orders.map(toOrderDocument)
  }

  async updateStatus(orderId: string, sellerId: string, status: string): Promise<boolean> {
    await connectToDatabase()
    const order = await OrderModel.findOne({
      customId: orderId,
      'items.sellerId': sellerId,
    }).exec()

    if (!order) return false

    order.status = status as any
    await order.save()
    return true
  }

  async cancel(orderId: string, buyerId: string): Promise<boolean> {
    await connectToDatabase()
    const order = await OrderModel.findOne({ customId: orderId, buyerId }).exec()
    if (!order || order.status !== 'PENDING') return false

    order.status = 'CANCELLED'
    await order.save()

    // Restock items
    for (const item of order.items) {
      await ProductModel.findOneAndUpdate(
        { customId: item.productId },
        {
          $inc: { stock: item.quantity },
          $set: { inStock: true },
        }
      ).exec()
    }

    return true
  }
}

