'use client'

import { useState, useTransition } from 'react'
import { cancelBuyerOrderAction } from '@/lib/actions/orders'
import { AlertTriangle, Ban } from 'lucide-react'

export function CancelOrderButton({ orderId }: { orderId: string }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  if (!confirmOpen) {
    return (
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
      >
        <Ban className="h-3.5 w-3.5" />
        <span>Cancel This Order</span>
      </button>
    )
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-rose-900">
      <div className="flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-4 w-4 text-rose-600" />
        <span>Are you sure you want to cancel this order?</span>
      </div>
      <p className="mt-1 text-rose-800">
        Reserved items will be returned to the seller&apos;s inventory. This action cannot be reversed.
      </p>
      {error && <p className="mt-2 text-xs font-bold text-rose-600">{error}</p>}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setError('')
            startTransition(async () => {
              const res = await cancelBuyerOrderAction(orderId)
              if (!res.ok) {
                setError(res.error)
                return
              }
            })
          }}
          className="rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
        >
          {pending ? 'Cancelling…' : 'Yes, Cancel Order'}
        </button>
        <button
          type="button"
          onClick={() => setConfirmOpen(false)}
          className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
        >
          Keep Order
        </button>
      </div>
    </div>
  )
}
