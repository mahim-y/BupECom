'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState, useTransition } from 'react'
import { registerAction } from '@/lib/actions/auth'
import { SELLER_TYPES } from '@/lib/format'
import { Eye, EyeOff, Lock, Store, UserCheck, ArrowRight } from 'lucide-react'

function RegisterForm() {
  const router = useRouter()
  const params = useSearchParams()
  const asSeller = params.get('as') === 'seller'
  const redirectUrl = params.get('redirect')

  const [role, setRole] = useState<'BUYER' | 'SELLER'>(asSeller ? 'SELLER' : 'BUYER')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-serif text-4xl text-[#392525]">Join BUP Nest</h1>
      <p className="mt-2 text-sm text-[#3E4734]">
        Open a buyer account or start selling to the campus community today.
      </p>

      {/* Role Switcher Pill */}
      <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-[rgba(57,37,37,0.06)] p-1.5">
        <button
          type="button"
          onClick={() => {
            setRole('BUYER')
            setError('')
          }}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${
            role === 'BUYER' ? 'bg-[#392525] text-[#FAF5E9] shadow-sm' : 'text-[#3E4734] hover:text-[#392525]'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>I want to Buy</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setRole('SELLER')
            setError('')
          }}
          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition ${
            role === 'SELLER' ? 'bg-[#392525] text-[#FAF5E9] shadow-sm' : 'text-[#3E4734] hover:text-[#392525]'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>I want to Sell</span>
        </button>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          setError('')
          const formData = new FormData(e.currentTarget)
          formData.set('role', role)

          const pass = formData.get('password')
          const confirmPass = formData.get('confirmPassword')
          if (pass !== confirmPass) {
            setError('Passwords do not match. Please re-enter.')
            return
          }

          startTransition(async () => {
            const result = await registerAction(formData)
            if (!result.ok) {
              setError(result.error)
              return
            }

            const destination = redirectUrl || (role === 'SELLER' ? '/seller' : '/shop')
            router.push(destination)
            router.refresh()
          })
        }}
      >
        <input type="hidden" name="role" value={role} />

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[#3E4734]">Full name *</span>
          <input
            name="name"
            required
            placeholder="Tanvir Ahmed"
            className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[#3E4734]">Email *</span>
          <input
            name="email"
            type="email"
            required
            placeholder="name@bup.edu.bd or personal email"
            className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
          />
          <span className="mt-1 block text-[11px] text-[#728383]">
            @bup.edu.bd emails automatically receive a 5% verified student discount.
          </span>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[#3E4734]">Phone number</span>
          <input
            name="phone"
            placeholder="+880 1711 000000"
            className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
          />
        </label>

        {role === 'BUYER' && (
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#3E4734]">BUP Student ID (optional)</span>
            <input
              name="studentId"
              placeholder="e.g. 22041108"
              className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
            />
          </label>
        )}

        {role === 'SELLER' && (
          <>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-[#3E4734]">Store Name *</span>
              <input
                name="storeName"
                required
                placeholder="e.g. FST Tech Store, BUP Hoodie Co."
                className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-[#3E4734]">Seller Category</span>
              <select
                name="sellerType"
                defaultValue="Student Vendor"
                className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
              >
                {SELLER_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[#3E4734]">Password * (min 6 characters)</span>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 py-2.5 pl-3.5 pr-10 text-sm outline-none focus:border-[#B25D3E]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-2.5 text-[#728383] hover:text-[#392525]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[#3E4734]">Confirm Password *</span>
          <input
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            placeholder="••••••••"
            className="w-full rounded-xl border border-[rgba(57,37,37,0.18)] bg-white/70 px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
          />
        </label>

        {error && <p className="text-sm font-medium text-[#B25D3E]">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#392525] py-3.5 text-sm font-semibold text-[#FAF5E9] shadow-md transition hover:bg-[#213527] disabled:opacity-60"
        >
          <span>
            {pending ? 'Creating account…' : role === 'SELLER' ? 'Open Seller Account' : 'Create Buyer Account'}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#3E4734]">
        Already have an account?{' '}
        <Link
          href={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login'}
          className="font-medium text-[#B25D3E] underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#728383]">Loading registration…</div>}>
      <RegisterForm />
    </Suspense>
  )
}
