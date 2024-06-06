'use client'

import { LoaderCircle, Trash2 } from 'lucide-react'
import { useTransition } from 'react'

import { removeItemFromCart } from '@/app/actions/actions'

interface RemoveItemButtonProps {
  productId: number
}

export function RemoveItemButton({ productId }: RemoveItemButtonProps) {
  const [isPending, startTransition] = useTransition()

  async function handleRemoveItemFromCart() {
    startTransition(async () => {
      await removeItemFromCart(productId)
    })
  }
  return (
    <button
      title="delete item"
      onClick={handleRemoveItemFromCart}
      aria-disabled={isPending}
      className="bg-[#F7F7F7] border transition hover:opacity-80 border-[#E0E0E0] rounded-md p-1"
    >
      <Trash2 className="w-5 text-red-600" />
      {isPending && (
        <span className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <LoaderCircle className="text-red-600 animate-spin" />
        </span>
      )}
    </button>
  )
}
