'use client'

import React, { useState } from 'react'
import {
  Store,
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Clock,
  Layers,
  X
} from 'lucide-react'
import { Product, Stall } from '@/lib/types'
import { useWorkspace } from './WorkspaceContext'
import { ExtravagantStallSection } from '@/components/bup/ExtravagantStallSection'

interface SellerWorkspaceProps {
  products: Product[]
  stalls: Stall[]
  onAddNewProduct: (newProduct: Product) => void
  onDeleteProduct: (productId: string) => void
  onToggleStock: (productId: string) => void
  onSelectStallForBooking: (stall: Stall) => void
  activeSubTab?: 'listings' | 'stalls' | 'guidelines'
  onSubTabChange?: (tab: 'listings' | 'stalls' | 'guidelines') => void
  onOpenCart?: () => void
  cartCount?: number
}

export function SellerWorkspace({
  products,
  stalls,
  onAddNewProduct,
  onDeleteProduct,
  onToggleStock,
  onSelectStallForBooking,
  activeSubTab: controlledSubTab,
  onSubTabChange,
  onOpenCart,
  cartCount = 0,
}: SellerWorkspaceProps) {
  const { setActiveTab } = useWorkspace()
  const [internalSubTab, setInternalSubTab] = useState<'listings' | 'stalls' | 'guidelines'>('listings')

  const activeSubTab = controlledSubTab ?? internalSubTab
  const setActiveSubTab = (tab: 'listings' | 'stalls' | 'guidelines') => {
    if (onSubTabChange) onSubTabChange(tab)
    setInternalSubTab(tab)
  }
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false)

  // Form State for New Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'Merch' as Product['category'],
    price: '',
    seller: 'BUP Student Entrepreneur',
    description: '',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    deliveryTime: 'Same Day at Campus Booth or Delivery',
    tag: 'New Drop',
  })

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price) return

    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      rating: 5.0,
      reviewsCount: 1,
      seller: formData.seller || 'BUP Student Vendor',
      sellerType: 'Student Vendor',
      image: formData.image,
      description: formData.description || 'Verified campus product sold by BUP student merchant.',
      inStock: true,
      tag: formData.tag || 'New Drop',
      deliveryTime: formData.deliveryTime,
    }

    onAddNewProduct(newProd)
    setIsNewProductModalOpen(false)
    setFormData({
      name: '',
      category: 'Merch',
      price: '',
      seller: 'BUP Student Entrepreneur',
      description: '',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      deliveryTime: 'Same Day at Campus Booth or Delivery',
      tag: 'New Drop',
    })
  }

  return (
    <div className="w-full bg-[#0e1711] text-[#FAF5E9] pb-24 min-h-screen relative overflow-hidden">
      
      {/* Ambient lakefront lighting effect matching Stalls Quick View */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-900/20 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      {/* SELLER STUDIO HERO HEADER */}
      <section className="relative border-b border-white/10 bg-gradient-to-b from-[#080d0a] via-[#0e1711] to-[#0e1711] px-4 py-8 text-[#FAF5E9] sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3E890] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#141f17] shadow-sm">
                  <Store className="size-3.5" />
                  Seller Studio
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80 border border-white/10">
                  Campus Merchant Portal
                </span>
              </div>

              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
                BUP <em className="text-[#E3E890] not-italic">Merchant Studio</em>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#FAF5E9]/80 sm:text-base">
                List campus merchandise, monitor student sales, fulfill delivery handovers, and manage lakeside pop-up stalls in real time.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsNewProductModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#E3E890] px-5 py-2.5 text-xs font-bold text-[#141f17] shadow-lg transition hover:bg-white active:scale-95 cursor-pointer"
              >
                <Plus className="size-4" />
                <span>+ List New Product</span>
              </button>

              <button
                onClick={() => setActiveTab('buyer')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-white/20 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="size-4 text-[#E3E890]" />
                <span>View Buyer Market</span>
                <ArrowRight className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-white/20 active:scale-95 cursor-pointer"
                title="View Campus Cart"
              >
                <ShoppingCart className="size-4 text-[#E3E890]" />
                <span>Cart {cartCount > 0 ? `(${cartCount})` : ''}</span>
              </button>
            </div>
          </div>

          {/* REAL-TIME SELLER METRICS CARDS */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-md shadow-xl hover:border-[#E3E890]/30 transition-all">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Total Revenue</span>
                <span className="text-emerald-400 font-bold">+24%</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">৳48,650</p>
              <p className="mt-1 text-[11px] text-white/60">From varsity batches &amp; stall sales</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-md shadow-xl hover:border-[#E3E890]/30 transition-all">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Campus Orders</span>
                <span className="text-[#E3E890] font-bold">3 Pending</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">42</p>
              <p className="mt-1 text-[11px] text-white/60">39 successfully handed over</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-md shadow-xl hover:border-[#E3E890]/30 transition-all">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Active Listings</span>
                <span className="text-emerald-400 font-bold">Live</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                {products.length}
              </p>
              <p className="mt-1 text-[11px] text-white/60">Listed on Buyer Market</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-md shadow-xl hover:border-[#E3E890]/30 transition-all">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Lake Pop-up Stalls</span>
                <span className="text-[#E3E890] font-bold">Active</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">Stall #2</p>
              <p className="mt-1 text-[11px] text-white/60">Arch Bridge Promenade</p>
            </div>
          </div>
        </div>
      </section>

      {/* SELLER CONTROL TABS */}
      <section className="sticky top-[58px] z-30 border-b border-white/10 bg-[#0e1711]/95 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('listings')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeSubTab === 'listings'
                  ? 'bg-[#E3E890] text-[#141f17] shadow-sm font-bold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              My Product Listings ({products.length})
            </button>

            <button
              onClick={() => setActiveSubTab('stalls')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeSubTab === 'stalls'
                  ? 'bg-[#E3E890] text-[#141f17] shadow-sm font-bold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Lake Stalls Manager ({stalls.length})
            </button>

            <button
              onClick={() => setActiveSubTab('guidelines')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeSubTab === 'guidelines'
                  ? 'bg-[#E3E890] text-[#141f17] shadow-sm font-bold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Campus Seller Rules
            </button>
          </div>

          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="hidden items-center gap-1.5 rounded-full bg-[#E3E890] px-4 py-1.5 text-xs font-bold text-[#141f17] shadow-sm hover:bg-white transition sm:inline-flex"
          >
            <Plus className="size-3.5" />
            <span>Add Item</span>
          </button>
        </div>
      </section>

      {/* SUB-TAB 1: PRODUCT LISTINGS MANAGER */}
      {activeSubTab === 'listings' && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-white">
              Active Campus Listings
            </h2>
            <span className="text-xs text-white/60">
              Live items appear instantly in Buyer Market
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.06] text-[11px] font-bold uppercase tracking-wider text-[#E3E890]">
                  <tr>
                    <th className="px-5 py-3.5">Product &amp; Info</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Price</th>
                    <th className="px-4 py-3.5">Stock Status</th>
                    <th className="px-4 py-3.5">Seller</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/[0.06] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-12 rounded-xl object-cover border border-white/15 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-white line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-white/60">{product.deliveryTime}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-block rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/90 border border-white/10">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 font-bold text-[#E3E890] text-sm">
                        ৳{product.price}
                      </td>

                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => onToggleStock(product.id)}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition border ${
                            product.inStock
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30'
                          }`}
                          title="Click to toggle stock status"
                        >
                          {product.inStock ? '● In Stock' : '○ Out of Stock'}
                        </button>
                      </td>

                      <td className="px-4 py-3.5 text-white/80 font-medium">
                        {product.seller}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="rounded-full p-1.5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition"
                          title="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* SUB-TAB 2: FULL CAMPUS POP-UP STALLS MANAGER */}
      {activeSubTab === 'stalls' && (
        <div className="w-full relative">
          <ExtravagantStallSection
            stalls={stalls}
            onSelectStallForBooking={onSelectStallForBooking}
            currentUser={null}
            onOpenAuth={() => {
              window.location.href = '/login'
            }}
          />
        </div>
      )}

      {/* SUB-TAB 3: CAMPUS SELLER GUIDELINES */}
      {activeSubTab === 'guidelines' && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 relative">
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <h2 className="font-serif text-2xl font-bold text-white">
              BUP Campus Seller Guidelines &amp; Policies
            </h2>
            <p className="mt-1 text-xs text-white/60">
              Mirpur Cantonment Campus Commerce Standards
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white">
                <div className="grid size-9 place-items-center rounded-xl bg-emerald-950 text-[#E3E890] mb-3 border border-emerald-800/40">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="font-bold text-sm text-white">0% Commission Fee</h4>
                <p className="mt-1 text-xs text-white/60 leading-relaxed">
                  Student-to-student transactions have no platform deductions. Keep 100% of your earnings.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white">
                <div className="grid size-9 place-items-center rounded-xl bg-[#213527] text-white mb-3 border border-emerald-700/40">
                  <MapPin className="size-5" />
                </div>
                <h4 className="font-bold text-sm text-white">Designated Pickup Points</h4>
                <p className="mt-1 text-xs text-white/60 leading-relaxed">
                  Deliver packages at Monpura Promenade, Central Library Ground Floor, or Faculty Lounges.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white">
                <div className="grid size-9 place-items-center rounded-xl bg-[#E3E890] text-[#141f17] mb-3">
                  <Clock className="size-5" />
                </div>
                <h4 className="font-bold text-sm text-white">Same-Day Campus Delivery</h4>
                <p className="mt-1 text-xs text-white/60 leading-relaxed">
                  Aim to deliver orders within 24 hours between classes for a stellar 5-star student review score.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODAL: LIST NEW PRODUCT */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#141f17] p-6 shadow-2xl sm:p-8 text-white">
            <button
              onClick={() => setIsNewProductModalOpen(false)}
              className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-4" />
            </button>

            <span className="rounded-full bg-[#E3E890] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#141f17]">
              New Campus Listing
            </span>
            <h3 className="mt-2 font-serif text-2xl font-bold text-white">
              List an Item on BUP Nest
            </h3>
            <p className="mt-1 text-xs text-white/70">
              Your item will appear instantly in Buyer Market for student buyers.
            </p>

            <form onSubmit={handleCreateProduct} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/90">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BUP ICE Batch 22 Hoodie (Navy Blue)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#E3E890] focus:outline-none focus:bg-white/15"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/90">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as Product['category'] })
                    }
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#0e1711] px-3.5 py-2.5 text-xs text-white focus:border-[#E3E890] focus:outline-none"
                  >
                    <option value="Merch">Merch</option>
                    <option value="Dining & Canteen">Dining &amp; Canteen</option>
                    <option value="Textbooks">Textbooks</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Stationery & Arts">Stationery &amp; Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/90">Price (BDT ৳) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1250"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#E3E890] focus:outline-none focus:bg-white/15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90">Seller / Society Name</label>
                <input
                  type="text"
                  value={formData.seller}
                  onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#E3E890] focus:outline-none focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#E3E890] focus:outline-none focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about sizing, condition, handover location..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs text-white placeholder:text-white/40 focus:border-[#E3E890] focus:outline-none focus:bg-white/15"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#E3E890] px-6 py-2.5 text-xs font-bold text-[#141f17] shadow-md hover:bg-white transition"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING ACTION CART PILL (Fixed Bottom-Right when items are in cart) */}
      {cartCount > 0 && (
        <button
          type="button"
          onClick={onOpenCart}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-[#E3E890] px-5 py-3.5 text-sm font-bold text-[#141f17] shadow-2xl transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          title="View Shopping Cart"
        >
          <div className="relative">
            <ShoppingCart className="size-5 shrink-0 text-[#141f17]" />
            <span className="absolute -top-2.5 -right-2.5 flex size-5 items-center justify-center rounded-full bg-[#B25D3E] text-[10px] font-black text-white shadow-sm">
              {cartCount}
            </span>
          </div>
          <span>Cart ({cartCount})</span>
        </button>
      )}

    </div>
  )
}
