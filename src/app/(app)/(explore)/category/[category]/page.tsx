import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { ProductCard } from '@/components/product-card'

import { Product } from '../../../search/page'

interface ProductByCategoryResponse {
  products: Product[]
}

async function fetchProductsByCategory(
  category: string,
): Promise<ProductByCategoryResponse> {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`)

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  return {
    title: params.category,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const { products } = await fetchProductsByCategory(params.category)

  return (
    <div>
      <section className="flex-1 flex flex-col gap-2 mt-4 px-4 min-[1180px]:px-0 pb-5">
        <div className="flex mb-2 items-center gap-2 text-sm text-[#505050] underline">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3" />
          <Link href={`/category/${params.category}`}>{params.category}</Link>
        </div>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </div>
  )
}
