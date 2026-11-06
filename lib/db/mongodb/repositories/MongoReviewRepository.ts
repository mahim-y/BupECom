import { connectToDatabase } from '../connection'
import { ReviewModel, IReview } from '../models/Review'
import { ProductModel } from '../models/Product'
import { UserModel } from '../models/User'
import {
  IReviewRepository,
  ReviewDocument,
  AddReviewInput,
} from '../../interfaces/IReviewRepository'

function cuid() {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

export class MongoReviewRepository implements IReviewRepository {
  async listByProduct(productId: string): Promise<ReviewDocument[]> {
    await connectToDatabase()
    const reviews = await ReviewModel.find({ productId }).sort({ createdAt: -1 }).exec()
    if (reviews.length === 0) return []

    const userIds = Array.from(new Set(reviews.map((r) => r.userId)))
    const users = await UserModel.find({ customId: { $in: userIds } }).exec()
    const userMap = new Map(users.map((u) => [u.customId, u.name]))

    return reviews.map((r) => ({
      id: r.customId,
      productId: r.productId,
      userId: r.userId,
      userName: userMap.get(r.userId) || 'BUP Student',
      rating: r.rating,
      comment: r.comment ?? null,
      createdAt: r.createdAt,
    }))
  }

  async addOrUpdate(input: AddReviewInput): Promise<boolean> {
    await connectToDatabase()

    await ReviewModel.findOneAndUpdate(
      { productId: input.productId, userId: input.userId },
      {
        $set: {
          rating: input.rating,
          comment: input.comment ?? null,
        },
        $setOnInsert: {
          customId: cuid(),
        },
      },
      { upsert: true, new: true }
    ).exec()

    // Recalculate average rating & reviewsCount on the product
    const stats = await ReviewModel.aggregate([
      { $match: { productId: input.productId } },
      {
        $group: {
          _id: '$productId',
          avgRating: { $avg: '$rating' },
          reviewsCount: { $sum: 1 },
        },
      },
    ])

    if (stats.length > 0) {
      const avg = Math.round(stats[0].avgRating * 10) / 10
      await ProductModel.findOneAndUpdate(
        { customId: input.productId },
        {
          $set: {
            rating: avg,
            reviewsCount: stats[0].reviewsCount,
          },
        }
      ).exec()
    }

    return true
  }
}

