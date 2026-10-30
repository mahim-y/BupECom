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
    <div className="w-full bg-[#FAF5E9] text-[#392525] pb-24">
      
      {/* SELLER STUDIO HERO HEADER */}
      <section className="border-b border-[#392525]/10 bg-gradient-to-b from-stone-900 via-[#211515] to-[#1c1212] px-4 py-8 text-[#FAF5E9] sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3E890] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#211515]">
                  <Store className="size-3.5" />
                  Seller Studio • Desktop 3
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
                  Campus Merchant Portal
                </span>
              </div>

              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
                BUP Merchant Studio
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#FAF5E9]/80 sm:text-base">
                List campus merchandise, monitor student sales, fulfill delivery handovers, and manage lakeside pop-up stalls in real time.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsNewProductModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#E3E890] px-5 py-2.5 text-xs font-bold text-[#211515] shadow-lg transition hover:bg-white active:scale-95"
              >
                <Plus className="size-4" />
                <span>+ List New Product</span>
              </button>

              <button
                onClick={() => setActiveTab('buyer')}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-white/20"
              >
                <ShoppingBag className="size-4 text-[#E3E890]" />
                <span>View Buyer Market</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* REAL-TIME SELLER METRICS CARDS */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Total Revenue</span>
                <span className="text-emerald-400 font-bold">+24%</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">৳48,650</p>
              <p className="mt-1 text-[11px] text-white/60">From varsity batches &amp; stall sales</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Campus Orders</span>
                <span className="text-[#E3E890] font-bold">3 Pending</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">42</p>
              <p className="mt-1 text-[11px] text-white/60">39 successfully handed over</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between text-[#FAF5E9]/75 text-xs">
                <span>Active Listings</span>
                <span className="text-emerald-400 font-bold">Live</span>
              </div>
              <p className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                {products.length}
              </p>
              <p className="mt-1 text-[11px] text-white/60">Listed on Buyer Market</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
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
      <section className="sticky top-[58px] z-30 border-b border-[#392525]/10 bg-[#FAF5E9]/95 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('listings')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeSubTab === 'listings'
                  ? 'bg-[#213527] text-[#FAF5E9] shadow-sm font-bold'
                  : 'text-[#392525]/80 hover:bg-black/5'
              }`}
            >
              My Product Listings ({products.length})
            </button>

            <button
              onClick={() => setActiveSubTab('stalls')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeSubTab === 'stalls'
                  ? 'bg-[#213527] text-[#FAF5E9] shadow-sm font-bold'
                  : 'text-[#392525]/80 hover:bg-black/5'
              }`}
            >
              Lake Stalls Manager ({stalls.length})
            </button>

            <button
              onClick={() => setActiveSubTab('guidelines')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeSubTab === 'guidelines'
                  ? 'bg-[#213527] text-[#FAF5E9] shadow-sm font-bold'
                  : 'text-[#392525]/80 hover:bg-black/5'
              }`}
            >
              Campus Seller Rules
            </button>
          </div>

          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="hidden items-center gap-1.5 rounded-full bg-[#B25D3E] px-4 py-1.5 text-xs font-bold text-[#FAF5E9] shadow-sm hover:bg-[#c26543] sm:inline-flex"
          >
            <Plus className="size-3.5" />
            <span>Add Item</span>
          </button>
        </div>
      </section>

      {/* SUB-TAB 1: PRODUCT LISTINGS MANAGER */}
      {activeSubTab === 'listings' && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-[#392525]">
              Active Campus Listings
            </h2>
            <span className="text-xs text-[#728383]">
              Live items appear instantly on Desktop 2 (Buyer Market)
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#392525]/15 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#392525]/10 bg-stone-50 text-[11px] font-bold uppercase tracking-wider text-[#728383]">
                  <tr>
                    <th className="px-5 py-3.5">Product &amp; Info</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Price</th>
                    <th className="px-4 py-3.5">Stock Status</th>
                    <th className="px-4 py-3.5">Seller</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#392525]/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-12 rounded-xl object-cover border border-[#392525]/10 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#392525] line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-[#728383]">{product.deliveryTime}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-block rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold text-[#392525]">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 font-bold text-[#B25D3E] text-sm">
                        ৳{product.price}
                      </td>

                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => onToggleStock(product.id)}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${
                            product.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                          title="Click to toggle stock status"
                        >
                          {product.inStock ? '● In Stock' : '○ Out of Stock'}
                        </button>
                      </td>

                      <td className="px-4 py-3.5 text-[#3E4734] font-medium">
                        {product.seller}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="rounded-full p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600 transition"
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
        <div className="w-full">
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
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="rounded-3xl border border-[#392525]/15 bg-white p-6 sm:p-10 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#392525]">
              BUP Campus Seller Guidelines &amp; Policies
            </h2>
            <p className="mt-1 text-xs text-[#728383]">
              Mirpur Cantonment Campus Commerce Standards
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[#392525]/10 bg-stone-50 p-4">
                <div className="grid size-9 place-items-center rounded-xl bg-[#213527] text-[#E3E890] mb-3">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="font-bold text-sm text-[#392525]">0% Commission Fee</h4>
                <p className="mt-1 text-xs text-[#728383] leading-relaxed">
                  Student-to-student transactions have no platform deductions. Keep 100% of your earnings.
                </p>
              </div>

              <div className="rounded-2xl border border-[#392525]/10 bg-stone-50 p-4">
                <div className="grid size-9 place-items-center rounded-xl bg-[#B25D3E] text-white mb-3">
                  <MapPin className="size-5" />
                </div>
                <h4 className="font-bold text-sm text-[#392525]">Designated Pickup Points</h4>
                <p className="mt-1 text-xs text-[#728383] leading-relaxed">
                  Deliver packages at Monpura Promenade, Central Library Ground Floor, or Faculty Lounges.
                </p>
              </div>

              <div className="rounded-2xl border border-[#392525]/10 bg-stone-50 p-4">
                <div className="grid size-9 place-items-center rounded-xl bg-[#E3E890] text-[#213527] mb-3">
                  <Clock className="size-5" />
                </div>
                <h4 className="font-bold text-sm text-[#392525]">Same-Day Campus Delivery</h4>
                <p className="mt-1 text-xs text-[#728383] leading-relaxed">
                  Aim to deliver orders within 24 hours between classes for a stellar 5-star student review score.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODAL: LIST NEW PRODUCT */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#392525]/20 bg-[#FAF5E9] p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setIsNewProductModalOpen(false)}
              className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-stone-200 text-[#392525] hover:bg-stone-300"
            >
              <X className="size-4" />
            </button>

            <span className="rounded-full bg-[#E3E890] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#211515]">
              New Campus Listing
            </span>
            <h3 className="mt-2 font-serif text-2xl font-bold text-[#392525]">
              List an Item on BUP Nest
            </h3>
            <p className="mt-1 text-xs text-[#728383]">
              Your item will appear instantly in Desktop 2 (Buyer Market) for student buyers.
            </p>

            <form onSubmit={handleCreateProduct} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#392525]">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BUP ICE Batch 22 Hoodie (Navy Blue)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#392525]/20 bg-white px-3.5 py-2.5 text-xs text-[#392525] focus:border-[#B25D3E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#392525]">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as Product['category'] })
                    }
                    className="mt-1 w-full rounded-xl border border-[#392525]/20 bg-white px-3.5 py-2.5 text-xs text-[#392525] focus:border-[#B25D3E] focus:outline-none"
                  >
                    <option value="Merch">Merch</option>
                    <option value="Dining & Canteen">Dining &amp; Canteen</option>
                    <option value="Textbooks">Textbooks</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Stationery & Arts">Stationery &amp; Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#392525]">Price (BDT ৳) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1250"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#392525]/20 bg-white px-3.5 py-2.5 text-xs text-[#392525] focus:border-[#B25D3E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#392525]">Seller / Society Name</label>
                <input
                  type="text"
                  value={formData.seller}
                  onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#392525]/20 bg-white px-3.5 py-2.5 text-xs text-[#392525] focus:border-[#B25D3E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#392525]">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#392525]/20 bg-white px-3.5 py-2.5 text-xs text-[#392525] focus:border-[#B25D3E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#392525]">Description</label>
                <textarea
                  rows={2}
                  placeholder="Details about sizing, condition, handover location..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#392525]/20 bg-white px-3.5 py-2 text-xs text-[#392525] focus:border-[#B25D3E] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#213527] px-6 py-2.5 text-xs font-bold text-[#FAF5E9] shadow-md hover:bg-[#16241a] transition"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
