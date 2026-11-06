import { connectToDatabase } from '../connection'
import { UserModel, IUser } from '../models/User'
import {
  IUserRepository,
  UserDocument,
  CreateUserInput,
  UpdateUserProfileInput,
  UpgradeToSellerInput,
} from '../../interfaces/IUserRepository'

function cuid() {
  return `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
}

function toUserDocument(doc: IUser): UserDocument {
  return {
    id: doc.customId,
    email: doc.email,
    passwordHash: doc.passwordHash,
    name: doc.name,
    phone: doc.phone ?? null,
    role: doc.role,
    studentId: doc.studentId ?? null,
    department: doc.department ?? null,
    isBupVerified: !!doc.isBupVerified,
    storeName: doc.storeName ?? null,
    storeDescription: doc.storeDescription ?? null,
    sellerType: doc.sellerType ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserDocument | null> {
    await connectToDatabase()
    const user = await UserModel.findOne({ email: email.toLowerCase() }).exec()
    return user ? toUserDocument(user) : null
  }

  async findById(id: string): Promise<UserDocument | null> {
    await connectToDatabase()
    const user = await UserModel.findOne({ customId: id }).exec()
    return user ? toUserDocument(user) : null
  }

  async create(input: CreateUserInput): Promise<UserDocument> {
    await connectToDatabase()
    const customId = cuid()
    const user = await UserModel.create({
      customId,
      email: input.email.toLowerCase(),
      passwordHash: input.passwordHash,
      name: input.name,
      phone: input.phone ?? null,
      role: input.role ?? 'SELLER',
      studentId: input.studentId ?? null,
      department: input.department ?? null,
      isBupVerified: input.isBupVerified ?? false,
      storeName: input.storeName ?? `${input.name}'s Stall`,
      storeDescription: input.storeDescription ?? null,
      sellerType: input.sellerType ?? 'Student Vendor',
    })
    return toUserDocument(user)
  }

  async updateProfile(userId: string, input: UpdateUserProfileInput): Promise<UserDocument | null> {
    await connectToDatabase()
    const updateFields: Record<string, any> = {}
    if (input.name !== undefined) updateFields.name = input.name
    if (input.phone !== undefined) updateFields.phone = input.phone
    if (input.storeName !== undefined) updateFields.storeName = input.storeName
    if (input.storeDescription !== undefined) updateFields.storeDescription = input.storeDescription

    const user = await UserModel.findOneAndUpdate(
      { customId: userId },
      { $set: updateFields },
      { new: true }
    ).exec()

    return user ? toUserDocument(user) : null
  }

  async upgradeToSeller(userId: string, input: UpgradeToSellerInput): Promise<UserDocument | null> {
    await connectToDatabase()
    const updateFields: Record<string, any> = {
      role: 'SELLER',
      storeName: input.storeName,
      sellerType: input.sellerType || 'Independent Seller',
      storeDescription: input.storeDescription || `${input.storeName} on BUP Nest`,
    }
    if (input.phone) updateFields.phone = input.phone

    const user = await UserModel.findOneAndUpdate(
      { customId: userId },
      { $set: updateFields },
      { new: true }
    ).exec()

    return user ? toUserDocument(user) : null
  }

  async count(): Promise<number> {
    await connectToDatabase()
    return UserModel.countDocuments().exec()
  }
}

