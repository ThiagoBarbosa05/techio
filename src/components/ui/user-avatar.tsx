import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const avatarVariants = cva('', {
  variants: {
    size: {
      sm: 'w-7 h-7',
      md: 'w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface UseAvatarProps extends VariantProps<typeof avatarVariants> {}

export function UserAvatar({ size = 'md' }: UseAvatarProps) {
  return (
    <Avatar className={cn(avatarVariants({ size }))}>
      <AvatarImage />
      <AvatarFallback className="bg-[#BDC4CD]">
        <User
          className={twMerge(
            'text-[#DEE2E7] w-',
            size === 'sm' ? 'w-4' : 'w-6',
          )}
        />
      </AvatarFallback>
    </Avatar>
  )
}
