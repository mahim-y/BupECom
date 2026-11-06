export interface ReviewDocument {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment?: string | null
  createdAt: Date
}

export interface AddReviewInput {
  productId: string
  userId: string
  rating: number
  comment?: string
}

export interface IReviewRepository {
  listByProduct(productId: string): Promise<ReviewDocument[]>
  addOrUpdate(input: AddReviewInput): Promise<boolean>
}

