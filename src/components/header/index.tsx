import { Archive, LogIn, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getCart } from '@/app/actions/actions'
import { getSession } from '@/lib/auth-session'

import { MenuMobile } from '../menu-mobile'
import { SearchProducts } from '../search'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SignoutButton } from '../ui/signout-button'

export async function Header() {
  const session = getSession()
  const cart = await getCart()

  const totalItemsInCart = cart?.items.length

  return (
    <header className="bg-white py-4 md:grid-rows-none items-center px-4 shadow">
      <div className="grid gap-x-4 gap-y-4 max-w-[1180px] mx-auto md:grid-cols-[150px_minmax(0,_1fr)_200px] gird-rows-2">
        <Link href="/" className="flex items-center row-start-1">
          <MenuMobile />
          <div className="w-[30px] rounded mr-2 bg-[#0D6EFD] p-2 ">
            <Image
              className="w-full"
              src="/logo.svg"
              width={100}
              height={100}
              alt="bag"
            />
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-[#8CB7F5]">
            techio
          </span>
        </Link>

        <SearchProducts />

        <div className="flex items-center md:items-start row-start-1 gap-4 justify-self-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative transition hover:text-[#505050] text-[#8B96A5] flex flex-col items-center gap-1">
              <User className="w-6" />
              <span className="text-xs leading-normal hidden md:block">
                Profile
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {session ? (
                <SignoutButton />
              ) : (
                <Link
                  className="flex items-center w-full justify-center gap-1.5"
                  href="/auth/signin"
                >
                  <span className="text-sm   font-semibold">Sign in</span>
                  <LogIn className="w-4 text-[#505050]" />
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            className="relative hover:text-[#505050] transition hidden md:flex text-[#8B96A5] flex-col items-center gap-1"
            href="/order"
          >
            <Archive className="w-6 " />
            <span className="text-xs leading-normal hidden md:block">
              Orders
            </span>
          </Link>

          <Link
            className="relative hover:text-[#505050] transition flex flex-col text-[#8B96A5] items-center gap-1"
            href="/cart"
          >
            <ShoppingCart className="w-6" />
            <span className="text-xs leading-normal whitespace-nowrap hidden md:block ">
              My cart
            </span>

            {totalItemsInCart! > 0 && (
              <span className="bg-[#0D6EFD] text-white font-bold rounded-full text-xs leading-none absolute -top-2 w-4 h-4 flex items-center justify-center md:right-0 -right-1">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
