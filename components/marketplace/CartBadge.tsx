'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/marketplace/CartProvider'

export function CartBadge() {
  const { count } = useCart()
  return (
    <Link
      href="/cart"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(57,37,37,0.18)] text-[#392525]"
      aria-label="Cart"
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B25D3E] px-1 text-[10px] text-white">
          {count}
        </span>
      )}
    </Link>
  )
}
