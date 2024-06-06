export function SearchSkeleton() {
  return (
    <div className="pb-4 w-full flex flex-1 flex-col mt-10 gap-2 px-[0.625rem]">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-[#DEE2E7] p-2 rounded-md animate-pulse"
        >
          <div className="w-[6.125rem] md:w-[11.25rem] h-[6.125rem] md:h-[11.25rem] rounded-md bg-[#EFF2F4] animate-pulse" />
          <div>
            <div className="w-20 h-7 bg-[#EFF2F4] mb-2 rounded-md animate-pulse" />
            <div className="w-24 h-5 md:h-6 bg-[#EFF2F4] mb-2 rounded-md animate-pulse" />
            <div className="w-20 h-5 bg-[#EFF2F4] mb-2 rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
