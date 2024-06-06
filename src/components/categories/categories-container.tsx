import React, { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface CategoriesContainerProps extends ComponentProps<'div'> {
  children: React.ReactNode
}
export function CategoriesContainer({
  children,
  className,
  ...props
}: CategoriesContainerProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
