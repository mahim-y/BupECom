import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { CartBadge } from '@/components/marketplace/CartBadge'
import { logoutAction } from '@/lib/actions/auth'
import { MobileNav } from '@/components/marketplace/MobileNav'

export async function SiteHeader() {
  const user = await getSession()

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(57,37,37,0.12)] bg-[#FAF5E9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <MobileNav user={user} />
          <Link href="/" className="font-serif text-xl tracking-tight text-[#392525] md:text-2xl">
            BUP Nest
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#3E4734] md:flex">
          <Link href="/shop" className="transition hover:text-[#B25D3E]">
            Shop
          </Link>
          <Link href="/#stalls" className="transition hover:text-[#B25D3E]">
            Stalls
          </Link>
          {user ? (
            <>
              <Link
                href="/seller"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#392525]/10 px-3 py-1 text-xs font-semibold text-[#392525] transition hover:bg-[#392525]/20"
              >
                Seller Hub
              </Link>
              <Link href="/orders" className="transition hover:text-[#B25D3E]">
                Orders
              </Link>
            </>
          ) : (
            <Link href="/sell" className="transition hover:text-[#B25D3E]">
              Sell on Nest
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <CartBadge />
          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/orders"
                className="max-w-[140px] truncate text-sm font-medium text-[#3E4734] hover:text-[#392525]"
                title="My Orders"
              >
                {user.name}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-[rgba(57,37,37,0.18)] px-3 py-1.5 text-xs font-medium text-[#392525] transition hover:bg-black/5"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-[#392525] hover:text-[#B25D3E]"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#392525] px-3.5 py-1.5 text-xs font-semibold text-[#FAF5E9] transition hover:bg-[#213527]"
              >
                Join Nest
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
