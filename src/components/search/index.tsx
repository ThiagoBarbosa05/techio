'use client'

import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { searchProducts } from '@/app/actions/actions'

import { SubmitButton } from '../ui/submit-button'

export function SearchProducts() {
  const searchParams = useSearchParams()

  return (
    <div className="w-full bg-white row-start-2 md:row-start-1 col-span-2">
      <form className="flex md:max-w-[32rem] mx-auto" action={searchProducts}>
        <input
          type="search"
          placeholder="Search"
          name="query"
          className="rounded-l-md  border flex-1 border-[#DEE2E7] bg-[#F7FAFC] p-3 py-2  outline-[#0067FF]"
          defaultValue={searchParams.get('q') ?? ''}
        />
        <SubmitButton
          title="search"
          className="bg-button-gradient rounded-r-md px-4 outline-[#0067FF]"
        >
          <span className="hidden md:block">Search</span>
          <Search strokeWidth={3} className="w-4 md:w-5 text-white md:hidden" />
        </SubmitButton>
      </form>
    </div>
  )
}
