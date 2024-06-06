import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { getCart } from '@/app/actions/actions'
import { Checkout, IOrder } from '@/components/checkout'
import { RemoveItemButton } from '@/components/remove-item-from-cart'
import { EmptyCart } from '@/components/ui/empty-cart'
import { UpdateItemQuantity } from '@/components/update-item-quantity'
import { formatCurrency } from '@/lib/format-currency'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cart',
  }
}

export default async function CartPage() {
  const cart = await getCart()

  const tax = 7

  const isCartEmpty = cart === undefined || cart?.items.length === 0

  if (isCartEmpty) {
    return <EmptyCart />
  }

  const totalToPay = cart?.totalPrice && cart.totalPrice + tax

  const totalItems = cart?.items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const order: IOrder = {
    customerId: cart?.customerId ?? '',
    cartId: cart?.id ?? '',
    amount: totalToPay ?? 0,
    totalItems: totalItems ?? 0,
  }

  return (
    <div className="flex-1 md:mx-4 min-[1180px]:mx-0 flex flex-col justify-center md:justify-start md:mt-10">
      <section className="bg-white flex-1 md:border md:border-[#DEE2E7] flex md:rounded-md md:flex-row md:flex-initial md:items-start  flex-col gap-4 pb-10 md:pb-4 border-t border-[#EFF2F4] pt-4">
        {/* items */}
        <div className="flex flex-col gap-4 md:pl-4">
          {cart?.items.map((product) => (
            <div
              key={product.productId}
              className="pb-4 border-b border-[#EFF2F4] px-4 relative"
            >
              <div className="flex items-start gap-[0.625rem] mb-5">
                <div className="w-full max-w-[4.5rem] overflow-hidden h-[4.5rem] bg-[#F7F7F7] border border-[#E0E0E0] rounded-md">
                  <Image
                    className="w-full h-full object-contain"
                    src={product.imageUrl}
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <span className="block line-clamp-2 leading-normal mb-1">
                    {product.title}
                  </span>
                  <p className="line-clamp-2 text-sm text-[#8B96A5] leading-normal">
                    {product.description}
                  </p>
                </div>
                <RemoveItemButton productId={product.productId} />
              </div>
              <div className="w-full flex items-center justify-between">
                <UpdateItemQuantity
                  productId={product.productId}
                  quantity={product.quantity}
                />
                <div className="text-[#1C1C1C] font-medium leading-normal">
                  {formatCurrency({
                    currency: product.price,
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* total */}
        <div className="px-4 flex flex-col gap-2 md:min-w-[17.5rem] md:border-l md:border-[#EFF2F4]">
          <div className="flex items-center justify-between">
            <span className="text-[#8B96A5] leading-normal">
              Items ({totalItems}):
            </span>
            <span className="text-[#1C1C1C] font-medium leading-normal">
              {formatCurrency({ currency: cart?.totalPrice })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B96A5] leading-normal">Shipping:</span>
            <span className="text-[#00B517]">Free</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8B96A5] leading-normal">Tax:</span>
            <span className="text-[#1C1C1C] font-medium leading-normal">
              {formatCurrency({ currency: tax })}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <strong className="text-lg leading-normal text-[#1C1C1C]">
              Total:
            </strong>
            <strong className="text-lg leading-normal text-[#1C1C1C]">
              {formatCurrency({
                currency: totalToPay,
              })}
            </strong>
          </div>
          <Checkout order={order} />
          <Link
            className="text-[#0D6EFD] text-sm text-center underline"
            href="/"
          >
            Add more items to cart
          </Link>
        </div>
      </section>
    </div>
  )
}
