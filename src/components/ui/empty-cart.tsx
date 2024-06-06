import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function EmptyCart() {
  return (
    <div className="flex flex-col font-bold justify-center items-center flex-1 gap-10 px-4">
      <h2 className="text-xl text-[#505050]">Your shopping cart is empty</h2>
      <Image src="/empty-cart.svg" width={200} height={200} alt="" />
      <Link
        href="/"
        className="bg-button-gradient max-w-80 transition hover:opacity-85 flex items-center text-white rounded-md py-4 px-5 w-full justify-center gap-2"
      >
        <Plus className="w-5" strokeWidth={3} />
        Add Items
      </Link>
    </div>
  )
}
