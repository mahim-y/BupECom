'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Fish,
  Leaf,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  UtensilsCrossed,
  X,
  ShoppingCart,
  User,
  GraduationCap,
  Star,
  CheckCircle2,
  Building2,
  Zap,
  Tag,
  Eye,
  Plus
} from 'lucide-react'

import { Product, Stall, CampusEvent, UserProfile, CartItem } from '@/lib/types'
import { PRODUCTS, STALLS, CAMPUS_EVENTS, DEMO_USERS } from '@/lib/mock-data'
import { AuthModal } from '@/components/bup/AuthModal'
import { BottomDock } from '@/components/bup/BottomDock'
import { CartDrawer } from '@/components/bup/CartDrawer'
import { SearchModal } from '@/components/bup/SearchModal'
import { StallBookingModal } from '@/components/bup/StallBookingModal'
import { ProductQuickViewModal } from '@/components/bup/ProductQuickViewModal'
import { CampusEventsModal } from '@/components/bup/CampusEventsModal'
import { CampusMapModal } from '@/components/bup/CampusMapModal'
import { UserProfileModal } from '@/components/bup/UserProfileModal'
import { ExtravagantStallSection } from '@/components/bup/ExtravagantStallSection'

const CATEGORIES = [
  'All',
  'Merch',
  'Dining & Canteen',
  'Textbooks',
  'Electronics',
  'Stationery & Arts',
] as const

export default function Page() {
  // Application Data State
  const [productsList] = useState<Product[]>(PRODUCTS)
  const [stallsList, setStallsList] = useState<Stall[]>(STALLS)
  const [eventsList] = useState<CampusEvent[]>(CAMPUS_EVENTS)

  // Filtering & Selection
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeSection, setActiveSection] = useState<string>('top')

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)

  // Modals Visibility
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState<'bup' | 'outside-login' | 'outside-register'>('bup')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  // Load persisted user & cart from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bup_ecommerce_user')
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser))
      }
      const savedCart = localStorage.getItem('bup_ecommerce_cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (e) {
      console.error('Error reading localStorage', e)
    }
  }, [])

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('bup_ecommerce_cart', JSON.stringify(cartItems))
    } catch (e) {
      console.error('Error writing to localStorage', e)
    }
  }, [cartItems])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'market', 'stalls', 'services']
      const scrollPos = window.scrollY + 200
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // User Auth Actions
  const handleSuccessLogin = (user: UserProfile) => {
    setCurrentUser(user)
    try {
      localStorage.setItem('bup_ecommerce_user', JSON.stringify(user))
    } catch (e) {}
    showToast(`Welcome, ${user.name}! ${user.isBupVerified ? 'BUP Student/Faculty discount enabled.' : 'Logged in.'}`)
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    try {
      localStorage.removeItem('bup_ecommerce_user')
    } catch (e) {}
    showToast('Signed out successfully.')
  }

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    showToast(`Added "${product.name.slice(0, 24)}..." to your campus bag!`)
  }

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  // Stall Booking Confirmation
  const handleBookingConfirmed = (stallId: string, bookingDetails: any) => {
    setStallsList((prev) =>
      prev.map((s) =>
        s.id === stallId
          ? { ...s, status: 'Reserved', reservedBy: bookingDetails.clubName }
          : s
      )
    )
    showToast(`Stall ${stallId} successfully reserved for ${bookingDetails.clubName}!`)
  }

  // Filtered Products
  const filteredProducts = productsList.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  )

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF5E9] text-[#392525] pb-24">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#213527]/20 bg-[#213527] px-5 py-3 text-xs font-semibold text-[#FAF5E9] shadow-2xl animate-in fade-in slide-in-from-top-4">
          <Sparkles className="size-4 text-[#E3E890]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        
        {/* Logo and University Identity */}
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="BUP E-Commerce home">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#213527] text-[#E3E890] shadow-md">
            <GraduationCap className="size-5" />
          </span>
          <span className="text-xl font-bold tracking-tight text-[#213527]">
            BUP<span className="text-[#B25D3E]">Nest</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute left-5 right-5 top-20 z-30 flex-col gap-3 rounded-3xl border border-[#392525]/10 bg-[#FAF5E9] p-6 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          aria-label="Main navigation"
        >
          <a
            className="text-sm font-semibold hover:text-[#B25D3E] transition-colors"
            href="#market"
            onClick={() => setMenuOpen(false)}
          >
            Marketplace
          </a>
          <a
            className="text-sm font-semibold hover:text-[#B25D3E] transition-colors"
            href="#stalls"
            onClick={() => setMenuOpen(false)}
          >
            Stall spaces
          </a>
          <a
            className="text-sm font-semibold hover:text-[#B25D3E] transition-colors"
            href="#services"
            onClick={() => setMenuOpen(false)}
          >
            Campus services
          </a>
          <button
            onClick={() => {
              setIsEventsOpen(true)
              setMenuOpen(false)
            }}
            className="text-left text-sm font-semibold hover:text-[#B25D3E] transition-colors md:hidden"
          >
            Campus Notices & Events
          </button>
          <button
            onClick={() => {
              setIsMapOpen(true)
              setMenuOpen(false)
            }}
            className="text-left text-sm font-semibold hover:text-[#B25D3E] transition-colors md:hidden"
          >
            Interactive Campus Map
          </button>

          {/* Mobile Auth button */}
          <div className="pt-3 border-t border-[#392525]/10 md:hidden flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setIsProfileOpen(true)
                  setMenuOpen(false)
                }}
                className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold"
              >
                <span>{currentUser.name} ({currentUser.studentId || 'Guest'})</span>
                <span className="text-[#B25D3E]">Profile →</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthInitialTab('bup')
                  setIsAuthOpen(true)
                  setMenuOpen(false)
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#213527] py-3 text-center text-xs font-bold text-[#FAF5E9]"
              >
                <User className="size-4 text-[#E3E890]" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Authentication State Button */}
          {currentUser ? (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#213527]/20 bg-white/80 py-1.5 pl-2 pr-4 text-xs font-semibold text-[#213527] shadow-sm hover:bg-white transition-all"
            >
              <span className="grid size-7 place-items-center rounded-full bg-[#E3E890] text-[#213527]">
                {currentUser.role === 'student' ? (
                  <GraduationCap className="size-4" />
                ) : (
                  <User className="size-4" />
                )}
              </span>
              <div className="text-left">
                <span className="block font-bold leading-none">{currentUser.name.split(' ')[0]}</span>
                <span className="text-[10px] text-[#728383] font-mono leading-none">
                  {currentUser.studentId || 'Outside User'}
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthInitialTab('bup')
                setIsAuthOpen(true)
              }}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#213527] px-4 py-2 text-xs font-semibold text-[#FAF5E9] shadow-sm transition-all hover:bg-[#16241a]"
            >
              <User className="size-3.5 text-[#E3E890]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-full p-2.5 text-[#392525] md:hidden hover:bg-black/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-12"
      >
        <div>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.02] tracking-[-.05em] text-[#392525] sm:text-7xl">
            Everything we share,{' '}
            <em className="text-[#B25D3E] not-italic underline decoration-[#E3E890] decoration-wavy decoration-2">
              in one place.
            </em>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#3E4734]/85">
            The official campus marketplace for varsity apparel, academic materials, lake pop-up stalls, and canteen dining.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#market"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#213527] px-6 py-4 text-sm font-semibold text-[#FAF5E9] shadow-lg transition-all hover:bg-[#16241a] hover:shadow-xl"
            >
              <span>Explore Market</span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href="#stalls"
              className="rounded-full border border-[#392525]/25 bg-white/70 px-6 py-4 text-sm font-semibold hover:bg-white transition-all shadow-sm text-[#392525]"
            >
              Book a Stall Space
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs font-medium text-[#3E4734]/80">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Serving 8,000+ Students, Faculty &amp; Mirpur Cantonment Visitors</span>
          </div>
        </div>

        {/* Hero Showcase Card - BUP Lake & Waterfront */}
        <div className="group relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-[#0c1510] shadow-[0_24px_70px_rgba(0,0,0,.3)] sm:min-h-[460px] flex flex-col justify-between text-white border border-[#213527]/30">
          {/* Real BUP Lake Image */}
          <img
            src="/images/Bup_Lake.jfif"
            alt="BUP Lake and Iconic Campus Arch Bridge"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />

          {/* Top Badges */}
          <div className="relative flex items-center justify-between p-6 sm:p-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E3E890] shadow-sm">
              <MapPin className="size-3 text-[#E3E890]" />
              Monpura 
            </span>
            <span className="rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-medium text-white/85">
              Mirpur Cantonment
            </span>
          </div>

          {/* Center / Body Info */}
          <div className="relative p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#E3E890]">
              BUP Lakefront
            </p>
            <h3 className="mt-1 font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
              Arch Bridge Area
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#stalls"
                className="inline-flex items-center gap-2 rounded-full bg-[#E3E890] px-5 py-2.5 text-xs font-bold text-[#141f17] shadow-lg hover:bg-white transition-all"
              >
                <span>View Lake Stalls</span>
                <ArrowRight className="size-3.5" />
              </a>
              <button
                onClick={() => {
                  const canteenItem = productsList.find((p) => p.category === 'Dining & Canteen')
                  if (canteenItem) setSelectedProduct(canteenItem)
                }}
                className="rounded-full bg-white/20 backdrop-blur-md border border-white/25 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/30 transition-all"
              >
                Lakeside Menu
              </button>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="relative flex items-center justify-between text-xs font-medium text-white/80 border-t border-white/15 px-6 py-3.5 sm:px-7 bg-black/50 backdrop-blur-md">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Promenade Active
            </span>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES HIGHLIGHT BAR */}
      <section className="mx-auto max-w-7xl px-5 py-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => {
              const hoodie = productsList.find((p) => p.category === 'Merch')
              if (hoodie) setSelectedProduct(hoodie)
            }}
            className="flex items-center gap-4 rounded-3xl border border-[#392525]/10 bg-white/70 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-[#E3E890] text-[#213527] shrink-0">
              <ShoppingBag className="size-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#392525]">Varsity Apparel</h3>
              <p className="text-xs text-[#3E4734]/70">Official hoodies &amp; crests</p>
            </div>
          </div>

          <div
            onClick={() => {
              const book = productsList.find((p) => p.category === 'Textbooks')
              if (book) setSelectedProduct(book)
            }}
            className="flex items-center gap-4 rounded-3xl border border-[#392525]/10 bg-white/70 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-[#FAF5E9] border border-[#392525]/15 text-[#B25D3E] shrink-0">
              <BookOpen className="size-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#392525]">Course Books</h3>
              <p className="text-xs text-[#3E4734]/70">Textbooks &amp; past papers</p>
            </div>
          </div>

          <div
            onClick={() => {
              const food = productsList.find((p) => p.category === 'Dining & Canteen')
              if (food) setSelectedProduct(food)
            }}
            className="flex items-center gap-4 rounded-3xl border border-[#392525]/10 bg-white/70 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-[#213527] text-[#FAF5E9] shrink-0">
              <UtensilsCrossed className="size-5 text-[#E3E890]" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#392525]">Campus Dining</h3>
              <p className="text-xs text-[#3E4734]/70">Cafeteria specials &amp; snacks</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE SECTION */}
      <section id="market" className="bg-[#211515] px-5 py-20 text-[#FAF5E9] lg:px-10 lg:py-28 mt-12">
        <div className="mx-auto max-w-7xl">
          
          {/* Header & Controls */}
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#E3E890]">
                BUP Campus Marketplace
              </p>
              <h2 className="font-serif text-4xl tracking-[-.04em] sm:text-6xl text-white">
                Find your next <em className="text-[#B25D3E] not-italic">campus favourite.</em>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <Search className="size-4 text-[#E3E890]" />
                <span>Search catalog</span>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 rounded-full bg-[#E3E890] px-4 py-2.5 text-xs font-bold text-[#211515] hover:bg-white transition-colors"
              >
                <ShoppingBag className="size-4" />
                <span>Bag ({totalCartCount})</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-white/10 pb-5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#E3E890] text-[#211515] shadow-md font-bold'
                    : 'bg-white/5 text-[#FAF5E9]/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FAF5E9] text-[#392525] shadow-lg transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-56 overflow-hidden bg-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.tag && (
                      <span className="absolute left-3.5 top-3.5 rounded-full bg-[#213527] px-3 py-1 text-[11px] font-bold text-[#FAF5E9] shadow-md">
                        {product.tag}
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute right-3.5 top-3.5 grid size-9 place-items-center rounded-full bg-white/90 text-[#392525] shadow-md hover:bg-white transition-colors"
                      title="Quick preview"
                    >
                      <Eye className="size-4" />
                    </button>
                  </div>

                  {/* Content details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#728383]">
                      <span>{product.category}</span>
                      <span className="flex items-center gap-1 text-amber-700">
                        <Star className="size-3 fill-current" /> {product.rating}
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="mt-2.5 font-serif text-base font-bold leading-snug line-clamp-2 hover:text-[#B25D3E] cursor-pointer min-h-[2.5rem]"
                    >
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Footer with Price and Add to Bag */}
                <div className="border-t border-[#392525]/10 p-5 pt-3 flex items-center justify-between">
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
                    onClick={() => handleAddToCart(product, 1)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#392525] px-4 py-2 text-xs font-bold text-[#FAF5E9] transition-all hover:bg-[#B25D3E] active:scale-95 shadow-sm"
                  >
                    <Plus className="size-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* EXTRAVAGANT BUP SPATIAL STALLS SECTION */}
      <ExtravagantStallSection
        stalls={stallsList}
        onSelectStallForBooking={(stall) => setSelectedStall(stall)}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthInitialTab('bup')
          setIsAuthOpen(true)
        }}
      />

      {/* CAMPUS SERVICES & EVENTS BANNER */}
      <section id="services" className="border-t border-[#392525]/10 px-5 py-14 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2.5rem] bg-[#E3E890] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between shadow-xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#213527]">
              Campus Life
            </p>
            <h2 className="mt-2 max-w-xl font-serif text-3xl sm:text-4xl leading-tight tracking-[-.03em] text-[#211515]">
              More than a marketplace.<br />
              <em className="text-[#B25D3E] not-italic">The rhythm of BUP life.</em>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsEventsOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#213527] px-6 py-3.5 text-xs font-bold text-[#FAF5E9] shadow-md hover:bg-[#16241a] transition-all"
            >
              <CalendarDays className="size-4 text-[#E3E890]" />
              <span>Campus Notices</span>
            </button>

            <button
              onClick={() => setIsMapOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#213527]/30 bg-white/70 px-6 py-3.5 text-xs font-bold text-[#211515] shadow-sm hover:bg-white transition-all"
            >
              <MapPin className="size-4 text-[#B25D3E]" />
              <span>Campus Map</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#3E4734]/75 sm:flex-row sm:items-center sm:justify-between lg:px-10 border-t border-[#392525]/10">
        <div>
          <p className="font-semibold text-[#392525]">
            © 2026 BUP Nest • Bangladesh University of Professionals
          </p>
          <p className="text-[11px] text-[#728383] mt-0.5">
            Mirpur Cantonment, Dhaka-1216
          </p>
        </div>

        <div className="flex gap-6 font-medium">
          <a href="#market" className="hover:text-[#B25D3E] transition-colors">Marketplace</a>
          <a href="#stalls" className="hover:text-[#B25D3E] transition-colors">Stalls</a>
          <button onClick={() => setIsEventsOpen(true)} className="hover:text-[#B25D3E] transition-colors">Notices</button>
          <button onClick={() => setIsMapOpen(true)} className="hover:text-[#B25D3E] transition-colors">Map</button>
        </div>
      </footer>

      {/* THE ENHANCED LOWER DOCK */}
      <BottomDock
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => {
          if (currentUser) {
            setIsProfileOpen(true)
          } else {
            setAuthInitialTab('bup')
            setIsAuthOpen(true)
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
      />

      {/* MODALS */}
      {/* 1. Auth Modal (BUP ID Login, Outside Sign In, Outside Registration) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessLogin={handleSuccessLogin}
        initialTab={authInitialTab}
      />

      {/* 2. Slide-Over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onOpenAuth={() => {
          setIsCartOpen(false)
          setAuthInitialTab('bup')
          setIsAuthOpen(true)
        }}
      />

      {/* 3. Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={productsList}
        stalls={stallsList}
        events={eventsList}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onSelectStall={(stall) => setSelectedStall(stall)}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      {/* 4. Stall Reservation Modal */}
      <StallBookingModal
        stall={selectedStall}
        onClose={() => setSelectedStall(null)}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthInitialTab('bup')
          setIsAuthOpen(true)
        }}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* 5. Product Quick View Detail Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Campus Events Modal */}
      <CampusEventsModal
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
        events={eventsList}
      />

      {/* 7. Campus Map Modal */}
      <CampusMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      {/* 8. User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onSignOut={handleSignOut}
      />

    </main>
  )
}
