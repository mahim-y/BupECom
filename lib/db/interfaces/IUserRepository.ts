export interface UserDocument {
  id: string
  email: string
  passwordHash: string
  name: string
  phone: string | null
  role: 'BUYER' | 'SELLER' | 'ADMIN'
  studentId: string | null
  department: string | null
  isBupVerified: boolean
  storeName: string | null
  storeDescription: string | null
  sellerType: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  email: string
  passwordHash: string
  name: string
  phone?: string
  role?: 'BUYER' | 'SELLER' | 'ADMIN'
  studentId?: string
  department?: string
  isBupVerified?: boolean
  storeName?: string
  storeDescription?: string
  sellerType?: string
}

export interface UpdateUserProfileInput {
  name?: string
  phone?: string
  storeName?: string
  storeDescription?: string
}

export interface UpgradeToSellerInput {
  storeName: string
  sellerType?: string
  phone?: string
  storeDescription?: string
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDocument | null>
  findById(id: string): Promise<UserDocument | null>
  create(input: CreateUserInput): Promise<UserDocument>
  updateProfile(userId: string, input: UpdateUserProfileInput): Promise<UserDocument | null>
  upgradeToSeller(userId: string, input: UpgradeToSellerInput): Promise<UserDocument | null>
  count(): Promise<number>
}

