'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  GraduationCap,
  ShoppingBag,
  Store
} from 'lucide-react'
import { useWorkspace, WorkspaceTab } from './WorkspaceContext'
import { SessionUser } from '@/lib/auth'
import { logoutAction } from '@/lib/actions/auth'

interface WorkspaceHeaderProps {
  user: SessionUser | null
}

export function WorkspaceHeader({ user }: WorkspaceHeaderProps) {
  const { activeTab, setActiveTab } = useWorkspace()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogoClick = () => {
    setActiveTab('hub')
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    if (pathname !== '/') {
      router.push('/')
    } else {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.delete('tab')
        window.history.pushState({}, '', url.pathname)
      }
    }
  }

  const handleTabClick = (tab: WorkspaceTab) => {
    setActiveTab(tab)
    if (pathname !== '/') {
      router.push(`/?tab=${tab}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#392525]/10 bg-[#FAF5E9]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-6 sm:py-3">
        
        {/* Left: Clean Brand Logo & Name - Always returns to Campus Hub */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
            title="Return to Campus Hub Homepage"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#213527] text-[#FAF5E9] shadow-sm transition-transform group-hover:scale-105">
              <GraduationCap className="size-5 text-[#E3E890]" />
            </span>
            <span className="font-serif text-lg font-bold tracking-tight text-[#392525] sm:text-xl">
              BUP Nest
            </span>
          </button>
        </div>

        {/* Center: Dedicated Windows-Style Desktop Switcher (Perfect Centering) */}
        <div className="flex items-center justify-center">
          <nav
            aria-label="Workspace Desktops"
            className="flex items-center rounded-full border border-[#392525]/15 bg-[#392525]/[0.06] p-1 shadow-inner backdrop-blur-sm"
          >
            {/* Desktop 1: Campus Hub */}
            <button
              type="button"
              onClick={() => handleTabClick('hub')}
              className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 cursor-pointer ${
                activeTab === 'hub'
                  ? 'bg-[#213527] text-[#FAF5E9] shadow-md'
                  : 'text-[#392525]/75 hover:bg-black/5 hover:text-[#392525]'
              }`}
            >
              <GraduationCap className={`size-3.5 sm:size-4 shrink-0 ${activeTab === 'hub' ? 'text-[#E3E890]' : ''}`} />
              <span>Campus Hub</span>
              <kbd className="hidden ml-1 rounded bg-black/15 px-1 py-0.2 text-[9px] font-mono text-white/70 xl:inline-block">
                1
              </kbd>
            </button>

            {/* Desktop 2: Buyer Market */}
            <button
              type="button"
              onClick={() => handleTabClick('buyer')}
              className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 cursor-pointer ${
                activeTab === 'buyer'
                  ? 'bg-[#B25D3E] text-[#FAF5E9] shadow-md'
                  : 'text-[#392525]/75 hover:bg-black/5 hover:text-[#392525]'
              }`}
            >
              <ShoppingBag className="size-3.5 sm:size-4 shrink-0" />
              <span>Buyer Market</span>
              <kbd className="hidden ml-1 rounded bg-black/15 px-1 py-0.2 text-[9px] font-mono text-white/70 xl:inline-block">
                2
              </kbd>
            </button>

            {/* Desktop 3: Seller Studio */}
            <button
              type="button"
              onClick={() => handleTabClick('seller')}
              className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 cursor-pointer ${
                activeTab === 'seller'
                  ? 'bg-[#392525] text-[#FAF5E9] shadow-md'
                  : 'text-[#392525]/75 hover:bg-black/5 hover:text-[#392525]'
              }`}
            >
              <Store className="size-3.5 sm:size-4 shrink-0 text-[#E3E890]" />
              <span>Seller Studio</span>
              <kbd className="hidden ml-1 rounded bg-black/15 px-1 py-0.2 text-[9px] font-mono text-white/70 xl:inline-block">
                3
              </kbd>
            </button>
          </nav>
        </div>

        {/* Right: Clean User Status / Auth */}
        <div className="flex items-center justify-end gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href={user.role === 'SELLER' || user.role === 'ADMIN' ? '/seller' : '/orders'}
                className="flex items-center gap-1.5 rounded-full border border-[#392525]/15 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#392525] transition hover:bg-white"
                title="Account & Orders"
              >
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-[#392525]/15 bg-transparent px-2.5 py-1.5 text-[11px] font-medium text-[#728383] hover:text-[#392525] transition"
                  title="Sign out"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-[#392525] hover:text-[#B25D3E] transition"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#213527] px-3.5 py-1.5 text-xs font-semibold text-[#FAF5E9] shadow-sm transition hover:bg-[#16241a]"
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
