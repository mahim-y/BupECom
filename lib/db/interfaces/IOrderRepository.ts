export interface OrderItem {
  id?: string
  productId: string
  sellerId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface OrderDocument {
  id: string
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
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrderInput {
  buyerId: string
  paymentMethod: 'COD' | 'BKASH' | 'NAGAD' | 'CARD'
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  deliveryCampus?: string
  deliveryAddress?: string
  phone?: string
  notes?: string
  items: {
    productId: string
    sellerId: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
}

export interface IOrderRepository {
  create(input: CreateOrderInput): Promise<OrderDocument>
  findById(id: string): Promise<OrderDocument | null>
  findByOrderNumber(orderNumber: string): Promise<OrderDocument | null>
  listBuyerOrders(buyerId: string): Promise<OrderDocument[]>
  listSellerOrders(sellerId: string): Promise<OrderDocument[]>
  updateStatus(orderId: string, sellerId: string, status: string): Promise<boolean>
  cancel(orderId: string, buyerId: string): Promise<boolean>
}

