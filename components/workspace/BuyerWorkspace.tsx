'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  SlidersHorizontal,
  Star,
  Plus,
  Eye,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Store,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react'
import { Product } from '@/lib/types'
import { useWorkspace } from './WorkspaceContext'

interface BuyerWorkspaceProps {
  products: Product[]
  onAddToCart: (product: Product, quantity?: number) => void
  onQuickView: (product: Product) => void
  onOpenCart?: () => void
  cartCount?: number
}

const CATEGORIES = [
  'All',
  'Merch',
  'Dining & Canteen',
  'Textbooks',
  'Electronics',
  'Stationery & Arts',
] as const

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating'

export function BuyerWorkspace({
  products,
  onAddToCart,
  onQuickView,
  onOpenCart,
  cartCount = 0,
}: BuyerWorkspaceProps) {
  const { setActiveTab } = useWorkspace()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [inStockOnly, setInStockOnly] = useState(false)

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStock = !inStockOnly || p.inStock
        return matchesCategory && matchesSearch && matchesStock
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0 // default recommended
      })
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy])

  return (
    <div className="w-full bg-[#FAF5E9] text-[#392525] pb-24">
      
      {/* BUYER HEADER & VALUE PROP BANNER */}
      <section className="border-b border-[#392525]/10 bg-gradient-to-b from-[#FAF5E9] via-stone-100/60 to-[#FAF5E9] px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B25D3E]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B25D3E]">
                  <ShoppingBag className="size-3.5" />
                  Buyer Marketplace • Desktop 2
                </span>
                <span className="rounded-full bg-[#213527]/10 px-2.5 py-0.5 text-xs font-semibold text-[#213527]">
                  {products.length} Items Available
                </span>
              </div>

              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#392525] sm:text-5xl">
                BUP Student &amp; Campus Store
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3E4734]/90 sm:text-base">
                Discover varsity hoodies, semester coursebooks, canteen dining pre-orders, engineering calculators, and lakeside stall specialties.
              </p>
            </div>

            {/* Quick Switch to Seller Studio */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('seller')}
                className="inline-flex items-center gap-2 rounded-full border border-[#392525]/20 bg-white/80 px-4 py-2.5 text-xs font-semibold text-[#392525] shadow-sm transition hover:bg-white hover:border-[#392525]/40"
              >
                <Store className="size-4 text-[#B25D3E]" />
                <span>Want to Sell? Open Seller Studio</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Campus Perks Strip */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-[#392525]/10 bg-white/70 p-3.5 shadow-sm">
              <div className="grid size-10 place-items-center rounded-xl bg-[#213527] text-[#E3E890] shrink-0">
                <Truck className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#392525]">Free Campus Handover</p>
                <p className="text-[#728383]">FST, FBS, Central Library &amp; Lake promenade</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#392525]/10 bg-white/70 p-3.5 shadow-sm">
              <div className="grid size-10 place-items-center rounded-xl bg-[#B25D3E] text-white shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#392525]">Verified BUP Sellers</p>
                <p className="text-[#728383]">Student clubs, societies &amp; licensed kiosks</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#392525]/10 bg-white/70 p-3.5 shadow-sm">
              <div className="grid size-10 place-items-center rounded-xl bg-[#E3E890] text-[#213527] shrink-0">
                <Sparkles className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#392525]">Student ID Discounts</p>
                <p className="text-[#728383]">Extra 5% off automatically for verified students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH, CATEGORIES & CONTROLS TOOLBAR */}
      <section className="sticky top-[58px] z-30 border-b border-[#392525]/10 bg-[#FAF5E9]/95 backdrop-blur-md px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search varsity hoodies, books, khichuri, stall items..."
              className="w-full rounded-full border border-[#392525]/20 bg-white py-2.5 pl-10 pr-10 text-xs sm:text-sm text-[#392525] placeholder:text-[#728383] focus:border-[#B25D3E] focus:outline-none focus:ring-1 focus:ring-[#B25D3E] shadow-sm"
            />
            <Search className="absolute left-3.5 top-3 size-4 text-[#728383]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort & Stock Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#392525] select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="size-4 rounded border-stone-300 accent-[#213527]"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 rounded-full border border-[#392525]/20 bg-white px-3 py-1.5 text-xs shadow-sm">
              <SlidersHorizontal className="size-3.5 text-[#728383]" />
              <span className="text-[#728383]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent font-semibold text-[#392525] focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Sticky Toolbar Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 rounded-full bg-[#B25D3E] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#9d4c31] active:scale-95 cursor-pointer"
              title="Open Shopping Cart"
            >
              <ShoppingCart className="size-3.5 sm:size-4 shrink-0" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex size-4.5 items-center justify-center rounded-full bg-[#FAF5E9] text-[10px] font-black text-[#B25D3E] shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="mx-auto max-w-7xl mt-3 flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#213527] text-[#FAF5E9] shadow-sm font-bold'
                    : 'bg-white/80 border border-[#392525]/15 text-[#392525]/85 hover:bg-white hover:border-[#392525]/30'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        
        {/* Results Count Header */}
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-[#728383]">
          <span>
            Showing <strong className="text-[#392525]">{filteredProducts.length}</strong> items in{' '}
            <strong className="text-[#392525]">{selectedCategory}</strong>
          </span>
          {(searchQuery || selectedCategory !== 'All' || inStockOnly) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setInStockOnly(false)
              }}
              className="flex items-center gap-1 font-semibold text-[#B25D3E] hover:underline"
            >
              <RotateCcw className="size-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#392525]/20 bg-white/40 p-12 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-[#E3E890]/40 text-[#392525]">
              <Search className="size-8 text-[#B25D3E]" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-[#392525]">
              No campus items found
            </h3>
            <p className="mt-1.5 max-w-md text-xs text-[#728383]">
              We couldn&apos;t find anything matching &quot;{searchQuery || selectedCategory}&quot;. Try adjusting your keywords or browse other departments.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setInStockOnly(false)
              }}
              className="mt-5 rounded-full bg-[#213527] px-5 py-2.5 text-xs font-semibold text-[#FAF5E9] shadow-sm hover:bg-[#16241a]"
            >
              Show All Products
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[#392525]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  {/* Product Image Box */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Tag Badge */}
                    {product.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#213527] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FAF5E9] shadow-sm">
                        {product.tag}
                      </span>
                    )}

                    {/* Stock Status Badge */}
                    {!product.inStock && (
                      <span className="absolute left-3 bottom-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                        Sold Out
                      </span>
                    )}

                    {/* Quick Preview Button */}
                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-[#392525] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
                      title="Quick Preview"
                    >
                      <Eye className="size-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#728383]">
                      <span className="uppercase tracking-wider">{product.category}</span>
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="size-3 fill-current text-amber-500" />
                        {product.rating} <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="mt-2 font-serif text-base font-bold leading-snug text-[#392525] line-clamp-2 hover:text-[#B25D3E] cursor-pointer min-h-[2.5rem]"
                    >
                      {product.name}
                    </h3>

                    {/* Seller details */}
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-[#3E4734]/80">
                      <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{product.seller}</span>
                    </p>

                    {/* Delivery hint */}
                    <p className="mt-1 text-[10px] text-[#728383] truncate">
                      {product.deliveryTime}
                    </p>
                  </div>
                </div>

                {/* Footer with Price and Add to Bag */}
                <div className="border-t border-[#392525]/10 p-4 sm:p-5 pt-3 flex items-center justify-between bg-stone-50/50">
                  <div>
                    <span className="font-serif text-xl font-bold text-[#B25D3E]">
                      ৳{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs line-through text-[#728383]">
                        ৳{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product, 1)}
                    disabled={!product.inStock}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm active:scale-95 ${
                      product.inStock
                        ? 'bg-[#213527] text-[#FAF5E9] hover:bg-[#B25D3E]'
                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="size-3.5" />
                    <span>{product.inStock ? 'Add' : 'Out'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CAMPUS PICKUP LOCATIONS INFO */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="rounded-[2.5rem] bg-[#211515] p-6 text-[#FAF5E9] sm:p-10 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="rounded-full bg-[#E3E890]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E3E890]">
                Campus Delivery Network
              </span>
              <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                Where can I collect my BUP Nest orders?
              </h2>
              <p className="mt-2 max-w-xl text-xs text-white/80 sm:text-sm">
                Orders can be picked up at designated campus handover stations, or delivered directly to your department booth.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/15">
                📍 Central Library Lounge
              </span>
              <span className="rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/15">
                📍 FST / FBS Ground Floor
              </span>
              <span className="rounded-full bg-white/10 px-3.5 py-1.5 font-medium border border-white/15">
                📍 Monpura Lake Arch Bridge
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING ACTION CART PILL (Fixed Bottom-Right for Instant Access) */}
      <button
        type="button"
        onClick={onOpenCart}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#B25D3E] px-5 py-3.5 text-sm font-bold text-[#FAF5E9] shadow-2xl transition-all duration-300 hover:bg-[#9d4c31] hover:scale-105 active:scale-95 cursor-pointer border border-white/25"
        title="View Shopping Cart"
      >
        <div className="relative">
          <ShoppingCart className="size-5 shrink-0" />
          {cartCount > 0 && (
            <span className="absolute -top-2.5 -right-2.5 flex size-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#B25D3E] shadow-sm">
              {cartCount}
            </span>
          )}
        </div>
        <span>View Cart {cartCount > 0 ? `(${cartCount})` : ''}</span>
      </button>

    </div>
  )
}
