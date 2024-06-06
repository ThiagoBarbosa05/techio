import dayjs from 'dayjs'
import { Metadata } from 'next'

import { fetchOrders } from '@/app/actions/actions'
import { formatCurrency } from '@/lib/format-currency'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Orders',
  }
}

export default async function OrderPage() {
  const order = await fetchOrders()

  return (
    <section className="flex-1 p-4 min-[1180px]:px-0 flex flex-col gap-2 ">
      <h2 className="text-xl font-bold">My orders</h2>
      {order.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-md border border-[#DEE2E7] p-2 flex flex-col justify-start items-start gap-1"
        >
          <p className="text-[#8B96A5] leading-normal">
            {order.totalItems} item(s)
          </p>
          <strong className="text-[#FA3434] text-lg leading-normal">
            {formatCurrency({ currency: order.amount })}
          </strong>
          <p className="text-sm text-[#00B517]">
            {dayjs(order.createdAt).format('MM/DD/YY')}
          </p>
        </div>
      ))}
    </section>
  )
}
