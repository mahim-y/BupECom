import Link from 'next/link'
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="rounded-full bg-[#E3E890]/60 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#392525]">
        404 · Page Not Found
      </span>
      <h1 className="mt-4 font-serif text-5xl text-[#392525] sm:text-6xl">Lost in the Nest?</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#3E4734]">
        The product, seller page, or route you are looking for does not exist or has been relocated to another section of the campus marketplace.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-[#392525] px-6 py-3 text-sm font-semibold text-[#FAF5E9] shadow-md transition hover:bg-[#213527]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Browse Products</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(57,37,37,0.2)] bg-white/70 px-6 py-3 text-sm font-semibold text-[#392525] transition hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="mt-12 rounded-2xl border border-[rgba(57,37,37,0.1)] bg-white/40 p-5 text-xs text-[#728383]">
        <p>Looking for a specific club stall or department merchandise?</p>
        <Link href="/shop" className="mt-1 inline-flex items-center gap-1 font-medium text-[#B25D3E] underline">
          <Search className="h-3.5 w-3.5" />
          <span>Search the full catalog</span>
        </Link>
      </div>
    </div>
  )
}
