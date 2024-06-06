'use client'

import { useTransition } from 'react'

import { createOrder } from '@/app/actions/actions'

export interface IOrder {
  customerId: string
  cartId: string
  totalItems: number
  amount: number
}

interface CheckoutProps {
  order: IOrder
}

export function Checkout({ order }: CheckoutProps) {
  const [isPending, startTransition] = useTransition()

  async function handleCheckout() {
    startTransition(async () => {
      await createOrder(order)
    })
  }

  return (
    <button
      onClick={handleCheckout}
      className="w-full py-4 bg-[#00B517] hover:opacity-85 transition rounded-md text-white font-medium leading-none mt-2 disabled:opacity-55"
      disabled={isPending}
      aria-disabled={isPending}
    >
      {isPending ? (
        <span className="flex items-center justify-center">
          <span className="border-t-2 border-r-2 border-white border-solid h-4 w-4 rounded-full animate-spin"></span>
        </span>
      ) : (
        <span>Checkout</span>
      )}
    </button>
  )
}
