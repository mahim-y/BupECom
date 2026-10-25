import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { ProductForm } from '@/components/marketplace/ProductForm'

export default async function NewProductPage() {
  const user = await getSession()
  if (!user) redirect('/login')
  if (user.role !== 'SELLER' && user.role !== 'ADMIN') redirect('/sell')

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/seller" className="text-sm text-[#B25D3E] underline">
        Back to seller hub
      </Link>
      <h1 className="mt-4 font-serif text-4xl text-[#392525]">Add product</h1>
      <p className="mt-2 text-sm text-[#3E4734]">List a new item for buyers across campus.</p>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  )
}
