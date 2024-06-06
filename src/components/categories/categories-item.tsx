import Link from 'next/link'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface CategoriesItemProps extends ComponentProps<'a'> {
  category: string
}

export function CategoriesItem({ category, className }: CategoriesItemProps) {
  return (
    <Link href={`/category/${category}`} className={cn(className)}>
      {category}
    </Link>
  )
}
