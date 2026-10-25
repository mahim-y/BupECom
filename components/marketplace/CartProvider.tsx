'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type CartLine = {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  sellerName: string
}

type CartContextValue = {
  items: CartLine[]
  addItem: (item: Omit<CartLine, 'quantity'>, qty?: number) => void
  updateQty: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'bup_nest_cart_v2'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, ready])

  const addItem = (item: Omit<CartLine, 'quantity'>, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === item.productId)
      if (existing) {
        return prev.map((p) =>
          p.productId === item.productId ? { ...p, quantity: p.quantity + qty } : p
        )
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const updateQty = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.productId === productId ? { ...p, quantity } : p))
        .filter((p) => p.quantity > 0)
    )
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.productId !== productId))
  }

  const clear = () => setItems([])

  const count = items.reduce((n, i) => n + i.quantity, 0)
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
