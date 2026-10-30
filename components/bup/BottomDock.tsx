'use client'

import React from 'react'
import {
  ShoppingBag,
  Store,
  Search,
  ShoppingCart,
  GraduationCap
} from 'lucide-react'
import { UserProfile } from '@/lib/types'
import { useWorkspace } from '@/components/workspace/WorkspaceContext'

interface BottomDockProps {
  cartCount: number
  currentUser?: UserProfile | null
  onOpenCart: () => void
  onOpenAuth?: () => void
  onOpenSearch: () => void
  onOpenStallBooking?: () => void
  onOpenEvents?: () => void
  activeSection: string
}

export function BottomDock({
  cartCount,
  onOpenCart,
  onOpenSearch,
  activeSection,
}: BottomDockProps) {
  const { activeTab, setActiveTab } = useWorkspace()

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const navOffset = 80
      const elementPosition = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth'
      })
    }
  }

  const handleHomeClick = () => {
    if (activeTab !== 'hub') {
      setActiveTab('hub')
      setTimeout(() => scrollTo('top'), 150)
    } else {
      scrollTo('top')
    }
  }

  const handleMarketClick = () => {
    if (activeTab !== 'hub') {
      setActiveTab('hub')
      setTimeout(() => scrollTo('market'), 150)
    } else {
      scrollTo('market')
    }
  }

  const handleStallsClick = () => {
    if (activeTab !== 'hub') {
      setActiveTab('hub')
      setTimeout(() => scrollTo('stalls'), 150)
    } else {
      scrollTo('stalls')
    }
  }

  const isHomeActive = activeTab === 'hub' && activeSection !== 'stalls' && activeSection !== 'market'
  const isMarketActive = activeTab === 'hub' && activeSection === 'market'
  const isStallsActive = activeTab === 'hub' && activeSection === 'stalls'

  return (
    <aside
      aria-label="Campus quick navigation dock"
      className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-[#211515]/95 p-1.5 text-[#FAF5E9] shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all sm:gap-1.5 sm:p-2"
    >
      {/* Home / Campus Overview */}
      <button
        onClick={handleHomeClick}
        className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-all sm:px-4 ${
          isHomeActive
            ? 'bg-white/20 text-[#FAF5E9] shadow-sm font-bold'
            : 'text-[#FAF5E9]/80 hover:bg-white/15 hover:text-white'
        }`}
        title="Go to Campus Overview"
      >
        <GraduationCap className="size-4 shrink-0 text-[#E3E890]" />
        <span>Home</span>
      </button>

      {/* Buyer Market */}
      <button
        onClick={handleMarketClick}
        className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-all sm:px-4 ${
          isMarketActive
            ? 'bg-[#B25D3E] text-white shadow-sm font-bold'
            : 'text-[#FAF5E9]/80 hover:bg-white/15 hover:text-white'
        }`}
        title="Browse Campus Marketplace"
      >
        <ShoppingBag className="size-4 shrink-0" />
        <span>Market</span>
      </button>

      {/* Book a Stall Space */}
      <button
        onClick={handleStallsClick}
        className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-all sm:px-4 ${
          isStallsActive
            ? 'bg-[#E3E890] text-[#211515] shadow-sm font-bold'
            : 'text-[#FAF5E9]/80 hover:bg-white/15 hover:text-white'
        }`}
        title="Book a Campus Stall or Pop-up Space"
      >
        <Store className={`size-4 shrink-0 ${isStallsActive ? 'text-[#211515]' : 'text-inherit'}`} />
        <span>Stalls</span>
      </button>

      {/* Divider */}
      <div className="h-5 w-px bg-white/25 mx-1" />

      {/* Search Trigger */}
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-[#FAF5E9]/85 transition-all hover:bg-white/15 hover:text-white sm:px-4"
        title="Search items and stalls"
        aria-label="Search"
      >
        <Search className="size-4 shrink-0" />
        <span>Search</span>
      </button>

      {/* Cart with live Badge */}
      <button
        onClick={onOpenCart}
        className="relative flex items-center gap-2 rounded-full bg-[#B25D3E] px-4 py-2 text-xs font-bold text-[#FAF5E9] shadow-md transition-all hover:bg-[#c26543] active:scale-95"
        title="View Shopping Cart"
        aria-label="Cart"
      >
        <ShoppingCart className="size-4 shrink-0" />
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#FAF5E9] text-[10px] font-black text-[#B25D3E] shadow-sm">
            {cartCount}
          </span>
        )}
      </button>
    </aside>
  )
}
