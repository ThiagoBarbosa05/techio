import Link from 'next/link'
import { Suspense } from 'react'

import { Home } from '@/components/home'
import { HomeSkeleton } from '@/components/home/home-skeleton'

export default async function HomePage() {
  return (
    <section>
      <div className="md:flex md:h-[20rem] md:border md:border-[#DEE2E7] md:mx-4 min-[1180px]:mx-0 md:mt-4 md:p-4 md:bg-white md:rounded-md">
        <div className="h-[11.375rem] md:rounded-md sm:h-[18.35rem] md:h-full md:bg-right m:h-full w-full bg-[url('/banner.svg')] bg-cover bg-bottom bg-no-repeat p-6">
          <div>
            <h2 className="text-lg leading-tight sm:text-xl">
              Latest trending
              <strong className="block">Electronic items</strong>
            </h2>

            <Link
              className="mt-[1.125rem] sm:text-base inline-block rounded-md bg-white px-[0.625rem] py-2 text-xs font-semibold text-[#0D6EFD] shadow-lg shadow-black/10"
              href="/"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      <Suspense fallback={<HomeSkeleton />}>
        <Home />
      </Suspense>
    </section>
  )
}
