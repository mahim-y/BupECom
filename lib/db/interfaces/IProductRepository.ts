export interface ProductDocument {
  id: string
  sellerId: string
  sellerName?: string
  storeName?: string | null
  sellerType?: string | null
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

export interface ListProductsOptions {
  category?: string
  q?: string
  sellerId?: string
  activeOnly?: boolean
}

export interface CreateProductInput {
  sellerId: string
  name: string
  description: string
  category: string
  price: number
  originalPrice?: number | null
  image: string
  stock: number
  tag?: string | null
  deliveryTime?: string
  mealType?: string | null
}

export interface UpdateProductInput {
  name?: string
  description?: string
  category?: string
  price?: number
  originalPrice?: number | null
  image?: string
  stock?: number
  tag?: string | null
  deliveryTime?: string
  isActive?: boolean
  mealType?: string | null
}

export interface IProductRepository {
  list(opts?: ListProductsOptions): Promise<ProductDocument[]>
  findById(id: string): Promise<ProductDocument | null>
  create(input: CreateProductInput): Promise<ProductDocument>
  update(id: string, sellerId: string, input: UpdateProductInput): Promise<ProductDocument | null>
  delete(id: string, sellerId: string): Promise<boolean>
  adjustStock(id: string, delta: number): Promise<boolean>
}

