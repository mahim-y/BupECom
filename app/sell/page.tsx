import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UpgradeToSellerForm } from '@/components/marketplace/UpgradeToSellerForm'
import { Store, Zap, ShieldCheck, DollarSign, Package, Users } from 'lucide-react'

export default async function SellPage() {
  const user = await getSession()
  if (user?.role === 'SELLER' || user?.role === 'ADMIN') redirect('/seller')

  return (
    <div className="bg-[#FAF5E9] text-[#392525]">
      {/* Hero Banner */}
      <div className="relative min-h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(33,53,39,0.92), rgba(57,37,37,0.78)), url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-4 py-16 text-[#FAF5E9]">
          <span className="inline-block w-fit rounded-full bg-[#E3E890]/30 border border-[#E3E890]/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E3E890]">
            BUP Multi-Vendor Marketplace
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl max-w-3xl">
            Open your store. Sell to thousands across campus.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#FAF5E9]/90 sm:text-base">
            Whether you are a student entrepreneur selling batch merch, a campus canteen vendor, an academic society trading textbooks, or an independent tech hobbyist — BUP Nest makes selling seamless.
          </p>

          {!user && (
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register?as=seller"
                className="rounded-full bg-[#E3E890] px-6 py-3.5 text-sm font-semibold text-[#392525] shadow-lg transition hover:bg-[#d5dc74]"
              >
                Open Free Seller Account
              </Link>
              <Link
                href="/login?redirect=/seller"
                className="rounded-full border border-white/50 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Already have a store? Sign in
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 py-16">
        {user ? (
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <UpgradeToSellerForm userName={user.name} userPhone={user.phone} />

            <div className="space-y-6">
              <div className="rounded-3xl border border-[rgba(57,37,37,0.12)] bg-white/60 p-6">
                <h3 className="font-serif text-xl text-[#392525]">Why sell on BUP Nest?</h3>
                <ul className="mt-4 space-y-3 text-sm text-[#3E4734]">
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 shrink-0 text-[#B25D3E] mt-0.5" />
                    <span><strong>Direct Campus Audience:</strong> Over 8,000 students, faculty, and cantonment visitors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 shrink-0 text-[#213527] mt-0.5" />
                    <span><strong>Zero Setup Fees:</strong> Free store opening, full inventory control, and real-time sales metrics.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Package className="h-5 w-5 shrink-0 text-[#B25D3E] mt-0.5" />
                    <span><strong>Order Tracking:</strong> Receive buyer details, contact numbers, and preferred delivery points.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                    <span><strong>Flexible Payments:</strong> Cash on Delivery, bKash, and Nagad order options.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-[#392525] p-6 text-[#FAF5E9]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#E3E890]">Campus Delivery</p>
                <p className="mt-2 text-sm leading-relaxed text-[#FAF5E9]/90">
                  Deliver directly to prominent campus spots: Vista Cafeteria, FST Atrium, FBS Concourse, Lake Pavilion, or Central Library.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center font-serif text-3xl text-[#392525] sm:text-4xl">
              Everything you need to run your varsity business
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-[rgba(57,37,37,0.12)] bg-white/70 p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3E890]/50 text-[#392525]">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#392525]">Branded Storefront</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#3E4734]">
                  Showcase products with your store name, seller category badge, and customer reviews.
                </p>
              </div>

              <div className="rounded-3xl border border-[rgba(57,37,37,0.12)] bg-white/70 p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3E890]/50 text-[#392525]">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#392525]">Instant Student Reach</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#3E4734]">
                  Promote club merchandise, textbook second-hand drives, and event stall tickets campus-wide.
                </p>
              </div>

              <div className="rounded-3xl border border-[rgba(57,37,37,0.12)] bg-white/70 p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3E890]/50 text-[#392525]">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#392525]">Live Order Manager</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#3E4734]">
                  Manage orders from Confirmed to Shipped and Delivered with a single click.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-[rgba(57,37,37,0.15)] bg-white/90 p-8 text-center shadow-md">
              <h3 className="font-serif text-2xl text-[#392525]">Ready to open your store?</h3>
              <p className="mt-2 text-sm text-[#3E4734]">Registration takes less than two minutes.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/register?as=seller"
                  className="rounded-full bg-[#392525] px-6 py-3 text-sm font-semibold text-[#FAF5E9] shadow-md transition hover:bg-[#213527]"
                >
                  Register as a Seller
                </Link>
                <Link
                  href="/login?redirect=/seller"
                  className="rounded-full border border-[rgba(57,37,37,0.25)] px-6 py-3 text-sm font-semibold text-[#392525] transition hover:bg-black/5"
                >
                  Sign In to Existing Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
