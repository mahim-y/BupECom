'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Store, ShoppingBag, Package, User, LogOut, ArrowRight } from 'lucide-react'
import { logoutAction } from '@/lib/actions/auth'

type MobileNavProps = {
  user: {
    id: string
    name: string
    email: string
    role: 'BUYER' | 'SELLER' | 'ADMIN'
    storeName: string | null
  } | null
}

export function MobileNav({ user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const isSeller = user?.role === 'SELLER' || user?.role === 'ADMIN'

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(57,37,37,0.18)] text-[#392525] transition hover:bg-[rgba(57,37,37,0.06)]"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 top-[57px] z-50 flex flex-col bg-[#FAF5E9] px-6 py-6 shadow-2xl transition animate-in fade-in slide-in-from-top-2 overflow-y-auto"
        >
          {user && (
            <div className="mb-6 rounded-2xl border border-[rgba(57,37,37,0.12)] bg-white/60 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#392525] text-sm font-semibold text-[#FAF5E9]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-[#392525]">{user.name}</p>
                  <p className="text-xs text-[#728383]">{user.email}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[rgba(57,37,37,0.08)] pt-2 text-xs">
                <span className="rounded-full bg-[#E3E890]/60 px-2.5 py-0.5 font-medium text-[#392525]">
                  {user.role} {user.storeName ? `· ${user.storeName}` : ''}
                </span>
                <span className="text-[#3E4734]">Verified Campus Account</span>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-2 text-base font-medium text-[#392525]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl p-3 hover:bg-[rgba(57,37,37,0.06)]"
            >
              <span>Home</span>
              <ArrowRight className="h-4 w-4 text-[#728383]" />
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl p-3 hover:bg-[rgba(57,37,37,0.06)]"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-[#B25D3E]" />
                <span>Shop Catalog</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#728383]" />
            </Link>
            <Link
              href="/#stalls"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-xl p-3 hover:bg-[rgba(57,37,37,0.06)]"
            >
              <div className="flex items-center gap-3">
                <Store className="h-5 w-5 text-[#213527]" />
                <span>Campus Stalls</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#728383]" />
            </Link>

            {isSeller ? (
              <Link
                href="/seller"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl bg-[#392525]/5 p-3 hover:bg-[rgba(57,37,37,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-[#B25D3E]" />
                  <span>Seller Hub & Dashboard</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#728383]" />
              </Link>
            ) : (
              <Link
                href="/sell"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl p-3 hover:bg-[rgba(57,37,37,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-[#B25D3E]" />
                  <span>Sell on Nest</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#728383]" />
              </Link>
            )}

            {user && (
              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl p-3 hover:bg-[rgba(57,37,37,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-[#392525]" />
                  <span>My Orders</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#728383]" />
              </Link>
            )}
          </nav>

          <div className="mt-auto border-t border-[rgba(57,37,37,0.12)] pt-6">
            {user ? (
              <form action={logoutAction} onSubmit={() => setIsOpen(false)}>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(57,37,37,0.2)] py-3 text-sm font-medium text-[#392525] hover:bg-black/5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-full border border-[rgba(57,37,37,0.2)] py-3 text-sm font-medium text-[#392525]"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-full bg-[#392525] py-3 text-sm font-medium text-[#FAF5E9]"
                >
                  Join Nest
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
