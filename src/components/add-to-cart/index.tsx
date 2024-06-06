'use client'

import { useTransition } from 'react'

import { addItemsToCart } from '@/app/actions/actions'

interface Item {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
}

interface AddToCartProps {
  item: Item
}

export function AddToCart({ item }: AddToCartProps) {
  const [isPending, startTransition] = useTransition()

  async function handleAddItemsToCart() {
    startTransition(async () => {
      await addItemsToCart({
        title: item.title,
        description: item.description,
        productId: item.id,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: 1,
      })
    })
  }

  return (
    <button
      onClick={handleAddItemsToCart}
      aria-disabled={isPending}
      disabled={isPending}
      className="bg-button-gradient flex-1 py-3 rounded-md font-medium text-white leading-none disabled:opacity-65"
    >
      {isPending ? (
        <span className="flex items-center justify-center">
          <span className="border-t-2 border-r-2 border-white border-solid h-4 w-4 rounded-full animate-spin"></span>
        </span>
      ) : (
        <span>Add to cart</span>
      )}
    </button>
  )
}
