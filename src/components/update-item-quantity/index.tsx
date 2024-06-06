'use client'

import { LoaderCircle, Minus, Plus } from 'lucide-react'
import { useTransition } from 'react'

import { updateItemQuantity } from '@/app/actions/actions'

interface UpdateItemQuantityProps {
  quantity: number
  productId: number
}

export function UpdateItemQuantity({
  quantity,
  productId,
}: UpdateItemQuantityProps) {
  const [isPending, startTransition] = useTransition()

  async function handleIncrementQuantity() {
    startTransition(async () => {
      await updateItemQuantity({ productId, quantity: quantity + 1 })
    })
  }

  async function handleDecrementQuantity() {
    startTransition(async () => {
      await updateItemQuantity({ productId, quantity: quantity - 1 })
    })
  }

  const minQuantity = 1

  return (
    <div className="w-[9.375rem] flex items-center justify-between border border-[#DEE2E7] rounded-md">
      <button
        onClick={handleDecrementQuantity}
        aria-disabled={quantity === minQuantity || isPending}
        disabled={quantity === minQuantity || isPending}
        className="py-[0.625rem] transition enabled:hover:text-[#505050] px-2 border-r text-[#8B96A5] disabled:opacity-50"
      >
        <Minus />
      </button>
      <span className="flex-1 text-center flex items-center justify-center">
        {isPending ? (
          <LoaderCircle className="text-red-600 w-5 animate-spin" />
        ) : (
          quantity
        )}
      </span>
      <button
        onClick={handleIncrementQuantity}
        aria-disabled={isPending}
        disabled={isPending}
        className="py-[0.625rem] transition enabled:hover:text-[#505050] px-2 border-l text-[#8B96A5] disabled:opacity-50"
      >
        <Plus />
      </button>
    </div>
  )
}
