import Image from 'next/image'
import Link from 'next/link'

import { formatCurrency } from '@/lib/format-currency'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
}

export interface GetProductResponse {
  products: Product[]
}

async function getProducts(): Promise<GetProductResponse> {
  const res = await fetch('https://dummyjson.com/products/category/smartphones')

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export async function Home() {
  const productsResponse = await getProducts()

  return (
    <section className="grid grid-cols-2 md:grid-cols-3  gap-2 p-4 min-[1180px]:px-0">
      {productsResponse.products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="rounded-md border border-[#DEE2E7] bg-white p-2"
        >
          <div className="overflow-hidden rounded-md sm:h-[12.5rem]  h-[8.937rem] w-full">
            <Image
              className="h-full w-full object-contain"
              src={product.images[0]}
              width={500}
              height={500}
              alt=""
            />
          </div>

          <div className="py-3">
            <p className="text-sm truncate sm:text-base font-semibold">
              {product.title}
            </p>
            <strong className="leading-6 sm:text-lg block my-1">
              {formatCurrency({ currency: product.price })}
            </strong>
            <p className="line-clamp-2 text-sm sm:text-base leading-normal text-[#8B96A5]">
              {product.description}
            </p>
          </div>
        </Link>
      ))}
    </section>
  )
}
