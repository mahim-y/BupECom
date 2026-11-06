import { isMongoConfigured } from './mongodb/connection'
import { MongoUserRepository } from './mongodb/repositories/MongoUserRepository'
import { MongoProductRepository } from './mongodb/repositories/MongoProductRepository'
import { MongoOrderRepository } from './mongodb/repositories/MongoOrderRepository'
import { MongoReviewRepository } from './mongodb/repositories/MongoReviewRepository'
import { IUserRepository } from './interfaces/IUserRepository'
import { IProductRepository } from './interfaces/IProductRepository'
import { IOrderRepository } from './interfaces/IOrderRepository'
import { IReviewRepository } from './interfaces/IReviewRepository'

let userRepo: IUserRepository | null = null
let productRepo: IProductRepository | null = null
let orderRepo: IOrderRepository | null = null
let reviewRepo: IReviewRepository | null = null

export function getUserRepository(): IUserRepository {
  if (!userRepo) {
    userRepo = new MongoUserRepository()
  }
  return userRepo
}

export function getProductRepository(): IProductRepository {
  if (!productRepo) {
    productRepo = new MongoProductRepository()
  }
  return productRepo
}

export function getOrderRepository(): IOrderRepository {
  if (!orderRepo) {
    orderRepo = new MongoOrderRepository()
  }
  return orderRepo
}

export function getReviewRepository(): IReviewRepository {
  if (!reviewRepo) {
    reviewRepo = new MongoReviewRepository()
  }
  return reviewRepo
}

export { isMongoConfigured }

