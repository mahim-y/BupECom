import Link from 'next/link'
import { formatBdt } from '@/lib/format'
import type { ProductCard as ProductCardType } from '@/lib/catalog'
import { AddToCartButton } from '@/components/marketplace/AddToCartButton'

export function ProductCard({ product }: { product: ProductCardType }) {
  return (
    <article className="group flex flex-col overflow-hidden border-b border-[rgba(57,37,37,0.1)] pb-6">
      <Link href={`/product/${product.id}`} className="block overflow-hidden">
        <div className="aspect-[4/5] overflow-hidden bg-[#E8E2D4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#728383]">
          {product.store_name || product.seller_name}
        </p>
        <Link href={`/product/${product.id}`} className="font-serif text-lg leading-snug text-[#392525]">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            <p className="text-base font-medium text-[#392525]">{formatBdt(product.price)}</p>
            {product.original_price ? (
              <p className="text-xs text-[#728383] line-through">{formatBdt(product.original_price)}</p>
            ) : null}
          </div>
          <AddToCartButton
            product={{
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              sellerName: product.store_name || product.seller_name,
            }}
          />
        </div>
      </div>
    </article>
  )
}
