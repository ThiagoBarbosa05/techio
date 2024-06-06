import { Archive, Building2, Headset, Home, List } from 'lucide-react'
import Link from 'next/link'

import { SheetClose } from '@/components/ui/sheet'

export function Navigation() {
  return (
    <nav className="flex flex-col gap-[0.625rem]">
      <ul className="border-b border-[#DEE2E] pb-[0.625rem]">
        <li className="px-2 py-3">
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-4">
              <Home className="w-5 text-[#8B96A5]" />
              <span className="text-[#1C1C1C]">Home</span>
            </Link>
          </SheetClose>
        </li>

        <li className="px-2 py-3">
          <SheetClose asChild>
            <Link
              href="/category/smartphones"
              className="flex items-center gap-4"
            >
              <List className="w-5 text-[#8B96A5]" />
              <span className="text-[#1C1C1C]">Categories</span>
            </Link>
          </SheetClose>
        </li>
        <li className="px-2 py-3">
          <SheetClose asChild>
            <Link href="/order" className="flex items-center gap-4">
              <Archive className="w-5 text-[#8B96A5]" />
              <span className="text-[#1C1C1C]">My orders</span>
            </Link>
          </SheetClose>
        </li>
      </ul>

      <ul className="border-b border-[#DEE2E] pb-[0.625rem]">
        <li className="px-2 py-3">
          <Link href="/" className="flex items-center gap-4">
            <Headset className="w-5 text-[#8B96A5]" />
            <span className="text-[#1C1C1C]">Contact us</span>
          </Link>
        </li>

        <li className="px-2 py-3">
          <Link href="/" className="flex items-center gap-4">
            <Building2 className="w-5 text-[#8B96A5]" />
            <span className="text-[#1C1C1C]">About</span>
          </Link>
        </li>
      </ul>

      <ul>
        <li className="py-3 pl-[2.875rem]">
          <Link href="/" className="flex items-center gap-4">
            <span className="text-[#1C1C1C]">User agreement</span>
          </Link>
        </li>
        <li className="py-3 pl-[2.875rem]">
          <Link href="/" className="flex items-center gap-4">
            <span className="text-[#1C1C1C]">Partnership</span>
          </Link>
        </li>
        <li className="py-3 pl-[2.875rem]">
          <Link href="/" className="flex items-center gap-4">
            <span className="text-[#1C1C1C]">Privacy policy</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
