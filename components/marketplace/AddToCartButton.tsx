'use client'

import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { useCart, type CartLine } from '@/components/marketplace/CartProvider'

export function AddToCartButton({
  product,
  label = 'Add',
  className = '',
}: {
  product: Omit<CartLine, 'quantity'>
  label?: string
  className?: string
}) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 1200)
      }}
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#392525] px-3 py-2 text-xs text-[#FAF5E9] transition hover:bg-[#B25D3E] ${className}`}
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {added ? 'Added' : label}
    </button>
  )
}
