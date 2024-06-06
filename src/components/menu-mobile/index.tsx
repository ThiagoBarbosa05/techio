import { Menu, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { Navigation } from './navigation'

export async function MenuMobile() {
  return (
    <div className="flex items-center md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button title="open menu" className="mr-2 text-[#1C1C1C]">
            <Menu />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="h-20  p-4 bg-[#EFF2F4]">
            <section className="flex items-center gap-4">
              <Avatar className="w-10 h-10 ">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback className="bg-[#DEE2E7]">
                  <User className="text-[#505050]" />
                </AvatarFallback>
              </Avatar>
            </section>
          </SheetHeader>

          <div className="mx-auto mt-[0.625rem] w-[90%]">
            <Navigation />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
