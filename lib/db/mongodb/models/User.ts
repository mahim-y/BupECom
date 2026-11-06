import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  customId: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  role: 'BUYER' | 'SELLER' | 'ADMIN'
  studentId?: string | null
  department?: string | null
  isBupVerified: boolean
  storeName?: string | null
  storeDescription?: string | null
  sellerType?: string | null
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    customId: { type: String, unique: true, index: true, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: null },
    role: { type: String, enum: ['BUYER', 'SELLER', 'ADMIN'], default: 'SELLER' },
    studentId: { type: String, default: null },
    department: { type: String, default: null },
    isBupVerified: { type: Boolean, default: false },
    storeName: { type: String, default: null },
    storeDescription: { type: String, default: null },
    sellerType: { type: String, default: null },
  },
  {
    timestamps: true,
  }
)

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema)

