export type UserRole = 'student' | 'faculty' | 'outside'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  studentId?: string
  department?: string
  faculty?: string
  phone?: string
  isBupVerified: boolean
  avatarUrl?: string
}

export interface Product {
  id: string
  name: string
  category: 'Merch' | 'Textbooks' | 'Dining & Canteen' | 'Electronics' | 'Stationery & Arts'
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  seller: string
  sellerType: 'BUP Official' | 'Student Society' | 'Campus Canteen' | 'Student Vendor' | 'Outside Partner'
  image: string
  description: string
  inStock: boolean
  tag?: string
  deliveryTime: string
  mealType?: 'Breakfast' | 'Lunch' | 'Snacks'
}

export interface Stall {
  id: string
  name: string
  zone: 'Lakeside & Vista' | 'Academic Wing (FST/FBS)' | 'Auditorium Plaza' | 'Central Library' | 'Sports Grounds'
  side: string
  status: 'Open' | 'Popular' | 'Reserved'
  position: string
  tone: string
  dailyRate: number
  features: string[]
  reservedBy?: string
  // Enhanced spatial & analytics attributes
  coordinates: { x: number; y: number } // Percentage 0-100 on interactive blueprint
  footfall: string
  peakHours: string
  ambience: string
  image: string
  dimensions: string
  powerGrid: string
  recommendedFor: string[]
  description: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CampusEvent {
  id: string
  title: string
  organizer: string
  date: string
  time: string
  location: string
  badge: string
  description: string
}
