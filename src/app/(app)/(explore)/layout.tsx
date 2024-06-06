import { Suspense } from 'react'

import { Categories } from '@/components/categories'
import { CategoriesSkeleton } from '@/components/categories/categories-skeleton'

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="md:flex md:items-start">
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      <div className="flex-1">{children}</div>
    </div>
  )
}
