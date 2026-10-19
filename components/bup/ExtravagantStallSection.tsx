'use client'

import React, { useState, useMemo } from 'react'
import {
  MapPin,
  Sparkles,
  Zap,
  Users,
  Clock,
  Lock,
  ArrowRight,
  Search,
  CheckCircle2,
  Flame,
  Maximize2,
  Tag,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react'
import { Stall, UserProfile } from '@/lib/types'

interface ExtravagantStallSectionProps {
  stalls: Stall[]
  onSelectStallForBooking: (stall: Stall) => void
  currentUser: UserProfile | null
  onOpenAuth: () => void
}

const ZONES = [
  'All',
  'Lakeside & Vista',
  'Academic Wing (FST/FBS)',
  'Auditorium Plaza',
  'Central Library',
  'Sports Grounds',
] as const

export function ExtravagantStallSection({
  stalls,
  onSelectStallForBooking,
  currentUser,
  onOpenAuth,
}: ExtravagantStallSectionProps) {
  const [selectedZone, setSelectedZone] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  // Default to night view toggled ON as requested
  const [isNightMode, setIsNightMode] = useState<boolean>(true)

  // Filter stalls
  const filteredStalls = useMemo(() => {
    return stalls.filter((s) => {
      const matchZone = selectedZone === 'All' || s.zone === selectedZone
      const matchQuery =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.side.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.zone.toLowerCase().includes(searchQuery.toLowerCase())
      const matchAvailable = onlyAvailable ? s.status !== 'Reserved' : true
      return matchZone && matchQuery && matchAvailable
    })
  }, [stalls, selectedZone, searchQuery, onlyAvailable])

  // Count stats
  const totalCount = stalls.length
  const availableCount = stalls.filter((s) => s.status !== 'Reserved').length

  return (
    <section
      id="stalls"
      className={`relative px-5 py-20 lg:px-10 lg:py-24 transition-colors duration-500 overflow-hidden ${
        isNightMode
          ? 'bg-[#0e1711] text-[#FAF5E9]'
          : 'bg-[#FAF5E9] text-[#211515] border-t border-[#392525]/10'
      }`}
    >
      {/* Night Ambient Lighting */}
      {isNightMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-900/25 blur-3xl" />
          <div className="absolute top-1/2 right-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl">
        
        {/* HEADER SECTION - Concise & visually balanced */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b transition-colors duration-500 ${
            isNightMode ? 'border-white/10' : 'border-[#392525]/10'
          }`}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.2em] shadow-sm transition-all ${
                  isNightMode
                    ? 'border border-amber-400/40 bg-black/40 text-amber-300'
                    : 'border border-[#213527]/20 bg-white text-[#213527]'
                }`}
              >
              </div>

            </div>

            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-colors duration-500 ${
                isNightMode ? 'text-white' : 'text-[#211515]'
              }`}
            >
              Reserve a Campus Stall
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base transition-colors duration-500 ${
                isNightMode ? 'text-white/70' : 'text-[#392525]/80'
              }`}
            >
              Curated pop-up plots across the lakeside promenade, faculty concourses, and ceremonial plaza for student societies and seasonal vendors.
            </p>
          </div>

          {/* Controls: Night Mode Toggle & Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {/* NIGHT / DAY TOGGLE SWITCH */}
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold border transition-all active:scale-95 shadow-sm ${
                isNightMode
                  ? 'bg-amber-400/20 border-amber-400/60 text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.25)] hover:bg-amber-400/30'
                  : 'bg-white border-[#392525]/15 text-[#392525] hover:bg-zinc-50'
              }`}
              aria-label="Toggle Night View"
              title={isNightMode ? 'Switch to Day View' : 'Switch to Night View'}
            >
              {isNightMode ? (
                <>
                  <Moon className="size-4 text-amber-300 fill-amber-300/30" />
                  <span>Night View</span>
                  <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                </>
              ) : (
                <>
                  <Sun className="size-4 text-amber-500" />
                  <span>Day View</span>
                </>
              )}
            </button>

            <div
              className={`rounded-2xl px-4 py-2 text-center transition-colors duration-500 ${
                isNightMode
                  ? 'bg-[#15231a] border border-white/10'
                  : 'bg-white border border-[#392525]/10 shadow-sm'
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#728383]">Spaces</p>
              <p
                className={`text-lg font-serif font-bold ${
                  isNightMode ? 'text-white' : 'text-[#211515]'
                }`}
              >
                {totalCount}
              </p>
            </div>

            <div
              className={`rounded-2xl px-4 py-2 text-center transition-colors duration-500 ${
                isNightMode
                  ? 'bg-[#15231a] border border-white/10'
                  : 'bg-white border border-[#392525]/10 shadow-sm'
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Available</p>
              <p className="text-lg font-serif font-bold text-emerald-400">{availableCount}</p>
            </div>

            {currentUser?.isBupVerified && (
              <div
                className={`hidden sm:block rounded-2xl px-4 py-2 text-center border ${
                  isNightMode
                    ? 'bg-amber-400/15 border-amber-400/30 text-amber-300'
                    : 'bg-[#E3E890]/40 border-[#213527]/15 text-[#213527]'
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider">Student Rate</p>
                <p className="text-lg font-serif font-bold text-[#B25D3E]">15% Off</p>
              </div>
            )}
          </div>
        </div>

        {/* CONTROLS BAR: ZONE PILLS & QUICK SEARCH */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Zone Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {ZONES.map((zone) => {
              const isActive = selectedZone === zone
              const count =
                zone === 'All'
                  ? stalls.length
                  : stalls.filter((s) => s.zone === zone).length

              return (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isNightMode
                      ? isActive
                        ? 'bg-[#E3E890] text-[#0e1711] shadow-[0_0_12px_rgba(227,232,144,0.35)]'
                        : 'bg-white/10 border border-white/10 text-white/80 hover:bg-white/15'
                      : isActive
                      ? 'bg-[#213527] text-[#FAF5E9] shadow-sm'
                      : 'bg-white border border-[#392525]/10 text-[#392525] hover:bg-white/90 hover:border-[#392525]/25'
                  }`}
                >
                  <span>{zone === 'Academic Wing (FST/FBS)' ? 'Academic Wing' : zone}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isNightMode
                        ? isActive
                          ? 'bg-black/20 text-[#0e1711]'
                          : 'bg-white/10 text-white/70'
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#FAF5E9] text-[#728383]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search & Availability Toggles */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 ${
                  isNightMode ? 'text-white/50' : 'text-[#728383]'
                }`}
              />
              <input
                type="text"
                placeholder="Search stalls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-full pl-10 pr-4 py-2 text-xs transition-colors duration-300 focus:outline-none focus:ring-1 ${
                  isNightMode
                    ? 'border border-white/15 bg-[#15231a] text-white placeholder-white/40 focus:border-[#E3E890] focus:ring-[#E3E890]'
                    : 'border border-[#392525]/15 bg-white text-[#211515] placeholder-[#728383] focus:border-[#213527] focus:ring-[#213527]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                    isNightMode ? 'text-white/60 hover:text-white' : 'text-[#728383] hover:text-[#211515]'
                  }`}
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold border transition-all ${
                onlyAvailable
                  ? isNightMode
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300'
                    : 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : isNightMode
                  ? 'border-white/15 bg-white/10 text-white/80 hover:bg-white/15'
                  : 'border-[#392525]/15 bg-white text-[#392525] hover:bg-zinc-50'
              }`}
            >
              {onlyAvailable ? '✓ Available only' : 'Available only'}
            </button>
          </div>
        </div>

        {/* STALLS CARDS GRID */}
        {filteredStalls.length === 0 ? (
          <div
            className={`mt-12 rounded-3xl border border-dashed p-12 text-center transition-colors duration-500 ${
              isNightMode
                ? 'border-white/15 bg-white/5 text-white'
                : 'border-[#392525]/20 bg-white/60 text-[#392525]'
            }`}
          >
            <p className="text-base font-medium">No stall spaces match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedZone('All')
                setSearchQuery('')
                setOnlyAvailable(false)
              }}
              className={`mt-4 inline-flex items-center rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
                isNightMode
                  ? 'bg-[#E3E890] text-[#0e1711] hover:bg-amber-300'
                  : 'bg-[#213527] text-white hover:bg-[#392525]'
              }`}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredStalls.map((stall) => {
              const isReserved = stall.status === 'Reserved'
              const isPopular = stall.status === 'Popular'

              return (
                <article
                  key={stall.id}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                    isNightMode
                      ? 'bg-[#142017] border-white/10 shadow-xl hover:border-amber-400/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
                      : 'bg-white border-[#392525]/10 shadow-sm hover:shadow-xl'
                  }`}
                >
                  {/* Photo & Badges Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={stall.image}
                      alt={stall.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Visual gradient overlays for badge readability */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isNightMode
                          ? 'bg-gradient-to-t from-[#142017] via-black/35 to-black/60'
                          : 'bg-gradient-to-t from-black/75 via-transparent to-black/35'
                      }`}
                    />

                    {/* Top Badges Row */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      {/* Status indicator */}
                      {isReserved ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-zinc-300 border border-white/10">
                          <Lock className="size-3 text-zinc-400" />
                          Reserved
                        </span>
                      ) : isPopular ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#B25D3E] px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                          <Flame className="size-3" />
                          Prime Spot
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                          <span className="size-1.5 rounded-full bg-white animate-pulse" />
                          Available
                        </span>
                      )}

                      {/* Daily Rate Pill */}
                      <span className="inline-flex items-baseline gap-1 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/20">
                        ৳{stall.dailyRate}
                        <span className="text-[10px] font-normal text-white/80">/day</span>
                      </span>
                    </div>

                    {/* Bottom Image Info */}
                    <div className="absolute bottom-3 inset-x-3 flex items-end justify-between text-white">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-white/95 drop-shadow-sm">
                        <MapPin className="size-3.5 text-[#E3E890]" />
                        <span className="line-clamp-1">{stall.zone}</span>
                      </div>
                      <span className="text-[11px] font-medium text-white/85 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
                        {stall.dimensions}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Identifier & Side */}
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#B25D3E]">
                      <span>{stall.id}</span>
                      <span
                        className={`font-normal normal-case line-clamp-1 max-w-[60%] text-right ${
                          isNightMode ? 'text-white/60' : 'text-[#728383]'
                        }`}
                      >
                        {stall.side}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-1.5 font-serif text-lg font-bold line-clamp-1 transition-colors ${
                        isNightMode
                          ? 'text-white group-hover:text-amber-300'
                          : 'text-[#211515] group-hover:text-[#B25D3E]'
                      }`}
                    >
                      {stall.name}
                    </h3>

                    {/* Concise Description */}
                    <p
                      className={`mt-2 text-xs leading-relaxed line-clamp-2 transition-colors ${
                        isNightMode ? 'text-white/70' : 'text-[#392525]/75'
                      }`}
                    >
                      {stall.description}
                    </p>

                    {/* Concise Specifications Bar */}
                    <div
                      className={`mt-4 grid grid-cols-2 gap-2 rounded-2xl p-3 text-[11px] border transition-colors ${
                        isNightMode
                          ? 'bg-black/35 border-white/5 text-white/80'
                          : 'bg-[#FAF5E9] border-[#392525]/5 text-[#392525]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-[#B25D3E] shrink-0" />
                        <span className="truncate">{stall.footfall.split(' ')[0]} visitors/day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="size-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{stall.powerGrid.split(' ').slice(0, 2).join(' ')}</span>
                      </div>
                    </div>

                    {/* Recommended Tags */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {stall.recommendedFor.slice(0, 2).map((rec) => (
                        <span
                          key={rec}
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                            isNightMode
                              ? 'bg-white/10 text-white/80'
                              : 'bg-zinc-100 text-[#392525]/80'
                          }`}
                        >
                          {rec}
                        </span>
                      ))}
                    </div>

                    {/* Action & Rate Footer */}
                    <div
                      className={`mt-5 pt-4 border-t flex items-center justify-between transition-colors ${
                        isNightMode ? 'border-white/10' : 'border-[#392525]/10'
                      }`}
                    >
                      <div>
                        {currentUser?.isBupVerified ? (
                          <div>
                            <span className="font-serif text-lg font-bold text-emerald-400">
                              ৳{Math.round(stall.dailyRate * 0.85)}
                            </span>
                            <span
                              className={`ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                isNightMode
                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-emerald-100/70 text-emerald-800'
                              }`}
                            >
                              15% off
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span
                              className={`font-serif text-lg font-bold ${
                                isNightMode ? 'text-white' : 'text-[#211515]'
                              }`}
                            >
                              ৳{stall.dailyRate}
                            </span>
                            <span
                              className={`ml-1 text-[11px] ${
                                isNightMode ? 'text-white/60' : 'text-[#728383]'
                              }`}
                            >
                              per day
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Booking CTA Button */}
                      {isReserved ? (
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-medium ${
                            isNightMode ? 'bg-white/10 text-white/50' : 'bg-zinc-100 text-zinc-500'
                          }`}
                        >
                          <Lock className="size-3" />
                          <span>Booked</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelectStallForBooking(stall)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all active:scale-95 shadow-sm ${
                            isNightMode
                              ? 'bg-[#E3E890] text-[#0e1711] hover:bg-amber-300'
                              : 'bg-[#213527] text-[#FAF5E9] hover:bg-[#B25D3E]'
                          }`}
                        >
                          <span>Reserve Space</span>
                          <ArrowRight className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* BOTTOM HELPER NOTE - Concise, clean */}
        <div
          className={`mt-12 rounded-3xl border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-500 ${
            isNightMode
              ? 'bg-[#142017] border-white/10 text-white'
              : 'bg-white border-[#392525]/10 text-[#211515] shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="grid size-11 place-items-center rounded-2xl bg-[#E3E890] text-[#213527] shrink-0">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h4
                className={`font-serif text-base font-bold ${
                  isNightMode ? 'text-white' : 'text-[#211515]'
                }`}
              >
                Official BUP Student Society Endorsement
              </h4>
              <p
                className={`text-xs ${
                  isNightMode ? 'text-white/70' : 'text-[#392525]/70'
                }`}
              >
                Verified BUP student ID holders receive a 15% discount and prioritized equipment pass access.
              </p>
            </div>
          </div>

          {!currentUser ? (
            <button
              onClick={onOpenAuth}
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold transition-colors shrink-0 ${
                isNightMode
                  ? 'bg-[#E3E890] text-[#0e1711] hover:bg-amber-300'
                  : 'bg-[#213527] text-[#FAF5E9] hover:bg-[#B25D3E]'
              }`}
            >
              Sign In with BUP ID
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 shrink-0">
              <CheckCircle2 className="size-4" />
              <span>Signed in as {currentUser.name}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
