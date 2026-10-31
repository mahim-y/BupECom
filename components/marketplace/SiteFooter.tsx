import Link from 'next/link'
import { Store, ShieldCheck, MapPin, Phone, Mail, CreditCard, Heart } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(57,37,37,0.12)] bg-[#FAF5E9] text-[#392525]">
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-[rgba(57,37,37,0.08)] bg-white/40 py-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3E890]/60 text-[#392525]">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Campus Multi-Vendor</p>
              <p className="text-xs text-[#728383]">Anyone can open a store and sell varsity goods</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3E890]/60 text-[#392525]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Convenient Campus Pickups</p>
              <p className="text-xs text-[#728383]">Deliveries to FST, FBS, Central Library & Cafeteria</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3E890]/60 text-[#392525]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Verified Student Community</p>
              <p className="text-xs text-[#728383]">Trusted sellers, genuine reviews & COD options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl tracking-tight text-[#392525]">
              BUP Nest
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-[#3E4734]/85">
              The premier campus marketplace for Bangladesh University of Professionals. Buy varsity hoodies, textbooks, tech gear, canteen snacks, and pop-up stall items.
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#728383]">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#B25D3E]" />
                Mirpur Cantonment, Dhaka-1216
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#B25D3E]" />
                support@bupnest.com
              </span>
            </div>
          </div>

          {/* Marketplace Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#728383]">Marketplace</p>
            <ul className="mt-3 space-y-2 text-sm text-[#3E4734]">
              <li>
                <Link href="/" className="hover:text-[#B25D3E] transition">
                  Campus Hub
                </Link>
              </li>
              <li>
                <Link href="/buyer" className="hover:text-[#B25D3E] transition">
                  Buyer Market
                </Link>
              </li>
              <li>
                <Link href="/#stalls" className="hover:text-[#B25D3E] transition">
                  Monpura Lake Stalls
                </Link>
              </li>
            </ul>
          </div>

          {/* Seller Ecosystem */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#728383]">Seller Ecosystem</p>
            <ul className="mt-3 space-y-2 text-sm text-[#3E4734]">
              <li>
                <Link href="/seller" className="hover:text-[#B25D3E] transition">
                  Seller Studio
                </Link>
              </li>
              <li>
                <Link href="/#stalls" className="hover:text-[#B25D3E] transition">
                  Book Lakefront Stall
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#B25D3E] transition">
                  Create Campus Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#B25D3E] transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#728383]">Accepted Payments</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg border border-[rgba(57,37,37,0.14)] bg-white/70 px-2.5 py-1 font-medium text-[#392525]">
                Cash on Delivery (COD)
              </span>
              <span className="rounded-lg border border-[rgba(57,37,37,0.14)] bg-white/70 px-2.5 py-1 font-medium text-[#B25D3E]">
                bKash
              </span>
              <span className="rounded-lg border border-[rgba(57,37,37,0.14)] bg-white/70 px-2.5 py-1 font-medium text-[#392525]">
                Nagad
              </span>
              <span className="rounded-lg border border-[rgba(57,37,37,0.14)] bg-white/70 px-2.5 py-1 font-medium text-[#392525]">
                Debit / Credit Card
              </span>
            </div>
            <p className="mt-4 text-xs text-[#728383] leading-relaxed">
              5% instant campus discount applied for verified BUP student emails.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[rgba(57,37,37,0.1)] pt-6 text-xs text-[#728383] sm:flex-row">
          <p>© {new Date().getFullYear()} BUP Nest Marketplace. Built for the BUP Campus Community.</p>
          <div className="mt-3 flex items-center gap-4 sm:mt-0">
            <Link href="/" className="hover:underline">
              Campus Hub
            </Link>
            <Link href="/buyer" className="hover:underline">
              Buyer Market
            </Link>
            <Link href="/seller" className="hover:underline">
              Seller Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
