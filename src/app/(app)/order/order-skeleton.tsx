export function OrderSkeleton() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-2 ">
      <div className="w-20 h-7 rounded-md animate-pulse bg-[#DEE2E7]" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-md border animate-pulse bg-[#DEE2E7] p-2 flex flex-col gap-1"
        >
          <div className="w-16 h-6 rounded-md animate-pulse bg-[#EFF2F4]" />
          <div className="w-24 h-7 rounded-md animate-pulse bg-[#EFF2F4]" />
          <div className="w-14 h-5 rounded-md animate-pulse bg-[#EFF2F4]" />
        </div>
      ))}
    </div>
  )
}
