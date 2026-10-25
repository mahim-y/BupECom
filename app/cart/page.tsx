'use client'

import Link from 'next/link'
import { useCart } from '@/components/marketplace/CartProvider'
import { formatBdt } from '@/lib/format'

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-serif text-4xl text-[#392525]">Your cart is empty</h1>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-[#392525] px-5 py-3 text-sm text-[#FAF5E9]">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif text-4xl text-[#392525]">Cart</h1>
      <ul className="mt-8 divide-y divide-[rgba(57,37,37,0.12)]">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4 py-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt="" className="h-24 w-20 object-cover" />
            <div className="flex-1">
              <p className="font-medium text-[#392525]">{item.name}</p>
              <p className="text-xs text-[#728383]">{item.sellerName}</p>
              <p className="mt-1 text-sm">{formatBdt(item.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQty(item.productId, Number(e.target.value) || 1)}
                  className="w-16 rounded-lg border border-[rgba(57,37,37,0.18)] px-2 py-1 text-sm"
                />
                <button type="button" onClick={() => removeItem(item.productId)} className="text-xs text-[#B25D3E]">
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm font-medium">{formatBdt(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between border-t border-[rgba(57,37,37,0.12)] pt-6">
        <p className="text-sm text-[#3E4734]">Subtotal</p>
        <p className="text-xl font-medium text-[#392525]">{formatBdt(subtotal)}</p>
      </div>
      <Link
        href="/checkout"
        className="mt-6 block rounded-full bg-[#392525] py-3 text-center text-sm text-[#FAF5E9]"
      >
        Proceed to checkout
      </Link>
    </div>
  )
}
