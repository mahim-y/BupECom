export function formatBdt(amount: number) {
  return `৳${Math.round(amount).toLocaleString('en-BD')}`
}

export const CATEGORIES = [
  'All',
  'Merch',
  'Dining & Canteen',
  'Textbooks',
  'Electronics',
  'Stationery & Arts',
] as const

export const SELLER_TYPES = [
  'Independent Seller',
  'BUP Official',
  'Student Society',
  'Campus Canteen',
  'Student Vendor',
  'Outside Partner',
] as const
