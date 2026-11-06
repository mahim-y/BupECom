import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IReview extends Document {
  customId: string
  productId: string
  userId: string
  rating: number
  comment?: string | null
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    customId: { type: String, unique: true, index: true, required: true },
    productId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: null },
  },
  {
    timestamps: true,
  }
)

ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

export const ReviewModel: Model<IReview> =
  (mongoose.models.Review as Model<IReview>) || mongoose.model<IReview>('Review', ReviewSchema)

