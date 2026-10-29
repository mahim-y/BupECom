'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Star, MessageSquare, CheckCircle2, User } from 'lucide-react'
import { submitReviewAction } from '@/lib/actions/products'
import type { ProductReview } from '@/lib/catalog'

type ProductReviewsProps = {
  productId: string
  reviews: ProductReview[]
  currentUser: { id: string; name: string } | null
}

export function ProductReviews({ productId, reviews, currentUser }: ProductReviewsProps) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [pending, startTransition] = useTransition()

  const existingReview = currentUser ? reviews.find((r) => r.user_id === currentUser.id) : null

  return (
    <section className="mt-16 border-t border-[rgba(57,37,37,0.12)] pt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#392525]">Community Ratings &amp; Reviews</h2>
          <p className="mt-1 text-xs text-[#728383]">
            Verified feedback from students, faculty, and campus buyers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#392525]">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Reviews List */}
        <div>
          {reviews.length === 0 ? (
            <div className="rounded-2xl border border-[rgba(57,37,37,0.1)] bg-white/40 p-8 text-center text-xs text-[#728383]">
              <MessageSquare className="mx-auto h-8 w-8 text-[#728383]/60 mb-2" />
              <p className="font-semibold text-[#392525]">No reviews yet</p>
              <p className="mt-1">Be the first to share your thoughts on this item.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-[rgba(57,37,37,0.1)] bg-white/60 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#392525] text-[11px] font-bold text-[#FAF5E9]">
                        {r.user_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#392525]">{r.user_name}</p>
                        <p className="text-[10px] text-[#728383]">
                          {new Date(r.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3.5 w-3.5 ${
                            s <= r.rating ? 'fill-current text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {r.comment && (
                    <p className="mt-3 text-xs leading-relaxed text-[#3E4734]">{r.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Review Card */}
        <div>
          <div className="rounded-3xl border border-[rgba(57,37,37,0.14)] bg-white/80 p-6 shadow-sm">
            <h3 className="font-serif text-lg text-[#392525]">
              {existingReview ? 'Update Your Review' : 'Leave a Review'}
            </h3>
            <p className="mt-1 text-xs text-[#728383]">
              Share your experience with product quality, sizing, or delivery speed.
            </p>

            {currentUser ? (
              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setError('')
                  setSuccess('')
                  const formData = new FormData()
                  formData.set('rating', String(rating))
                  formData.set('comment', comment)

                  startTransition(async () => {
                    const res = await submitReviewAction(productId, formData)
                    if (!res.ok) {
                      setError(res.error)
                      return
                    }
                    setSuccess('Your review has been published!')
                    setComment('')
                  })
                }}
              >
                <div>
                  <span className="block text-xs font-medium text-[#392525] mb-1.5">Rating</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1 transition hover:scale-110"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[#392525]">
                      {hoverRating || rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#392525] mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell other students about the material, fit, condition, or seller communication..."
                    className="w-full rounded-xl border border-[rgba(57,37,37,0.2)] bg-white px-3 py-2 text-xs outline-none focus:border-[#B25D3E]"
                  />
                </div>

                {error && <p className="text-xs font-bold text-[#B25D3E]">{error}</p>}
                {success && (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{success}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-[#392525] px-5 py-2.5 text-xs font-semibold text-[#FAF5E9] shadow-sm transition hover:bg-[#213527] disabled:opacity-50"
                >
                  {pending ? 'Submitting…' : existingReview ? 'Update Review' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="mt-5 rounded-2xl border border-[rgba(57,37,37,0.1)] bg-[rgba(57,37,37,0.03)] p-4 text-xs text-[#3E4734]">
                <p>You must be signed in with a campus account to submit a product review.</p>
                <Link
                  href={`/login?redirect=/product/${productId}`}
                  className="mt-3 inline-block rounded-full bg-[#392525] px-4 py-2 text-xs font-semibold text-[#FAF5E9]"
                >
                  Sign in to Review
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
