import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image
        src="/not-found.svg"
        className="w-full"
        width={100}
        height={100}
        alt=""
      />
      <Link
        href="/"
        className="bg-button-gradient flex items-center rounded-lg px-4 py-3 text-white"
      >
        <ChevronLeft /> <span>Home</span>
      </Link>
    </div>
  )
}
