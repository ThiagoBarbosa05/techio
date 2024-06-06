export function HomeSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#DEE2E7] md:h-[21.875rem] rounded-md p-2 animate-pulse flex flex-col gap-2"
        >
          <div className="rounded-md h-[8.937rem] md:min-h-[12.5rem] w-full animate-pulse bg-[#EFF2F4]" />
          <div className="w-10 md:w-[40%] h-5 animate-pulse bg-[#EFF2F4] rounded-md" />
          <div className="w-12 md:w-[35%] h-6 animate-pulse bg-[#EFF2F4] rounded-md" />
          <div className="w-full h-10 md:flex-1 animate-pulse bg-[#EFF2F4] rounded-md" />
        </div>
      ))}
    </div>
  )
}
