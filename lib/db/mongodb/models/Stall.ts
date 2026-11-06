import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IStall extends Document {
  stallId: string
  name: string
  zone: string
  side: string
  status: 'Open' | 'Popular' | 'Reserved'
  position: string
  tone: string
  dailyRate: number
  features: string[]
  coordinates: { x: number; y: number }
  footfall?: string
  peakHours?: string
  ambience?: string
  image?: string
  dimensions?: string
  powerGrid?: string
  recommendedFor?: string[]
  description?: string
  reservedBy?: string | null
  createdAt: Date
  updatedAt: Date
}

const StallSchema = new Schema<IStall>(
  {
    stallId: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    zone: { type: String, required: true },
    side: { type: String, required: true },
    status: { type: String, default: 'Open' },
    position: { type: String, required: true },
    tone: { type: String, default: 'bg-[#B25D3E]' },
    dailyRate: { type: Number, required: true },
    features: { type: [String], default: [] },
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    footfall: { type: String },
    peakHours: { type: String },
    ambience: { type: String },
    image: { type: String },
    dimensions: { type: String },
    powerGrid: { type: String },
    recommendedFor: { type: [String], default: [] },
    description: { type: String },
    reservedBy: { type: String, default: null },
  },
  {
    timestamps: true,
  }
)

export const StallModel: Model<IStall> =
  (mongoose.models.Stall as Model<IStall>) || mongoose.model<IStall>('Stall', StallSchema)

