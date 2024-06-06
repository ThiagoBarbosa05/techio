export function CartSkeleton() {
  return (
    <section className="bg-white md:bg-transparent md:justify-start md:mt-10 flex-1 flex  flex-col gap-4 border-t border-[#EFF2F4]">
      <section className="bg-white flex-1 md:border md:border-[#DEE2E7] flex md:rounded-md md:flex-row md:flex-initial md:items-start  flex-col gap-4 pb-10 md:pb-4 border-t border-[#EFF2F4] pt-4">
        <div className="flex md:flex-1 flex-col gap-4 md:pl-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="pb-4 border-b border-[#EFF2F4] px-4 animate-pulse"
            >
              <div className="flex items-start gap-[0.625rem] mb-5">
                {/* image */}
                <div className="w-full max-w-[4.5rem] h-[4.5rem] animate-pulse rounded-md bg-[#DEE2E7]" />

                <div>
                  {/* title */}

                  <div className="w-32 mb-2 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />

                  {/* description */}
                  <div className="w-48 h-10 animate-pulse rounded-md bg-[#DEE2E7]" />
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="w-[9.375rem] h-11 animate-pulse rounded-md bg-[#DEE2E7]" />
                <div className="w-16 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 flex flex-col gap-2 md:min-w-[17.5rem]">
          <div className="flex items-center justify-between">
            <div className="w-16 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
            <div className="w-24 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-16 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
            <div className="w-24 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-16 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
            <div className="w-24 h-6 animate-pulse rounded-md bg-[#DEE2E7]" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="w-12 h-7 animate-pulse rounded-md bg-[#DEE2E7]" />
            <div className="w-24 h-7 animate-pulse rounded-md bg-[#DEE2E7]" />
          </div>
          <div className="w-full rounded-md animate-pulse bg-[#DEE2E7] mt-2 h-12" />
        </div>
      </section>
    </section>
  )
}
