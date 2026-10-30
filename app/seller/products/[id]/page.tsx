import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getProduct } from '@/lib/catalog'
import { ensureSeeded } from '@/lib/seed'
import { ProductForm } from '@/components/marketplace/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await ensureSeeded()
  const user = await getSession()
  if (!user) redirect('/login')

  const { id } = await params
  const product = getProduct(id)
  if (!product || product.seller_id !== user.id) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/seller" className="text-sm text-[#B25D3E] underline">
        Back to seller hub
      </Link>
      <h1 className="mt-4 font-serif text-4xl text-[#392525]">Edit product</h1>
      <div className="mt-8">
        <ProductForm
          initial={{
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            originalPrice: product.original_price,
            image: product.image,
            stock: product.stock,
            tag: product.tag,
            deliveryTime: product.delivery_time,
            isActive: !!product.is_active,
          }}
        />
      </div>
    </div>
  )
}
