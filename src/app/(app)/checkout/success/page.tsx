import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Success',
  }
}
export default function SuccessPage() {
  return (
    <div className="flex-1 bg-white md:my-4 md:rounded-md flex min-[1180px]:mx-0 md:mx-4 flex-col justify-center items-center md:border md:border-[#DEE2E7]">
      <Image src="/delivery.svg" width={500} height={500} alt="" />
      <div className="px-4 text-center">
        <h2 className="text-2xl font-bold text-[#0D6EFD] pb-1">
          Order placed successfully!
        </h2>
        <p className="text-[#505050]">
          Your order is being prepared and will be ready for delivery soon.
        </p>

        <div className="flex flex-col items-center gap-2">
          <Link
            className="bg-white border border-[#0D6EFD] text-[#0D6EFD] py-2 px-3 mt-4  leading-none rounded-md text-sm"
            href="/order"
          >
            View orders
          </Link>
          <Link className="text-[#0D6EFD] text-sm underline" href="/">
            Return to home page
          </Link>
        </div>
      </div>
    </div>
  )
}
