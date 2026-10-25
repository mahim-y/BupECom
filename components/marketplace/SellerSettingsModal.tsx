'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, X, CheckCircle2 } from 'lucide-react'
import { updateUserProfileAction } from '@/lib/actions/auth'

type SellerSettingsProps = {
  initial: {
    name: string
    storeName: string | null
    phone: string | null
    storeDescription?: string | null
  }
}

export function SellerSettingsModal({ initial }: SellerSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsOpen(true)
          setError('')
          setSuccess('')
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(57,37,37,0.18)] bg-white/70 px-4 py-2 text-sm font-medium text-[#392525] hover:bg-white transition"
      >
        <Settings className="h-4 w-4" />
        <span>Store Settings</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-[rgba(57,37,37,0.15)] bg-[#FAF5E9] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[rgba(57,37,37,0.1)] pb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#B25D3E]" />
            <h2 className="font-serif text-xl text-[#392525]">Store Profile &amp; Settings</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-[#728383] hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setError('')
            setSuccess('')
            const formData = new FormData(e.currentTarget)
            startTransition(async () => {
              const res = await updateUserProfileAction(formData)
              if (!res.ok) {
                setError(res.error)
                return
              }
              setSuccess('Store profile updated successfully!')
              router.refresh()
              setTimeout(() => setIsOpen(false), 1200)
            })
          }}
        >
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#392525]">Store Public Name</span>
            <input
              name="storeName"
              required
              defaultValue={initial.storeName || ''}
              className="w-full rounded-xl border border-[rgba(57,37,37,0.2)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#392525]">Owner / Contact Name</span>
            <input
              name="name"
              required
              defaultValue={initial.name}
              className="w-full rounded-xl border border-[rgba(57,37,37,0.2)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#392525]">Seller Contact Phone</span>
            <input
              name="phone"
              defaultValue={initial.phone || ''}
              className="w-full rounded-xl border border-[rgba(57,37,37,0.2)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-[#392525]">Store Description</span>
            <textarea
              name="storeDescription"
              rows={3}
              defaultValue={initial.storeDescription || ''}
              placeholder="Tell buyers about your products, custom sizing, delivery spots..."
              className="w-full rounded-xl border border-[rgba(57,37,37,0.2)] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#B25D3E]"
            />
          </label>

          {error && <p className="text-xs font-bold text-[#B25D3E]">{error}</p>}
          {success && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              <span>{success}</span>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-[rgba(57,37,37,0.1)]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-[#392525] px-5 py-2 text-xs font-semibold text-[#FAF5E9] hover:bg-[#213527] disabled:opacity-50"
            >
              {pending ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
