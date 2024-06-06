import Image from 'next/image'
import Link from 'next/link'

import { Product } from '@/app/(app)/search/page'
import { formatCurrency } from '@/lib/format-currency'

import { Rating } from '../ui/ratings'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="flex items-center md:items-center gap-2 bg-white border border-[#DEE2E7] p-2 rounded-md"
    >
      <div className="w-[6.125rem] md:w-[11.25rem] h-[6.125rem] md:h-[11.25rem] rounded-md overflow-hidden">
        <Image
          className="w-full h-full object-contain"
          src={product.images[0]}
          width={500}
          height={500}
          alt=""
        />
      </div>
      <div>
        <p className="text-[#505050] leading-normal font-semibold pb-1">
          {product.title}
        </p>
        <strong className="text-[#333] truncate md:text-xl leading-normal">
          {formatCurrency({ currency: product.price })}
        </strong>
        <div className="flex items-center gap-2 mt-1">
          <Rating readOnly initialRating={product.rating} maxRating={5} />
          <span className="text-[#FF9017] text-sm">{product.rating}</span>
        </div>
        <span className="text-[#00B517] text-sm leading-normal">
          Free Shipping
        </span>
      </div>
    </Link>
  )
}
