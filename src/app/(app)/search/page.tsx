import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { ProductCard } from '@/components/product-card'

export interface SearchParams {
  q: string
}

export interface Product {
  id: string
  title: string
  price: number
  images: string[]
  rating: number
}

interface SearchProductsResponse {
  products: Product[]
}

async function getSearchResult(
  query?: string,
): Promise<SearchProductsResponse> {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  return {
    title: searchParams.q,
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const query = searchParams.q
  const searchProductsResponse = await getSearchResult(query)

  return (
    <section className="py-4 w-full flex flex-col justify-center gap-2 min-[1180px]:px-0 px-[0.625rem]">
      <div className="flex mb-2 items-center gap-2 text-sm text-[#505050] underline">
        <Link href="/">Home</Link>
        <ChevronRight className="w-3" />
        <Link href={`/category/${query}`}>{query}</Link>
      </div>
      {searchProductsResponse.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}
