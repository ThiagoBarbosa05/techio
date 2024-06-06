export function CategoriesSkeleton() {
  return (
    <div className="bg-white md:max-w-60 md:gap-4 md:w-full md:mt-4 md:bg-transparent md:flex-col md:items-start md:overflow-x-hidden overflow-x-auto flex items-center pl-4 pb-4 .no-scrollbar">
      <span className="text-xl w-full h-8 hidden animate-pulse rounded-md bg-[#DEE2E7] md:block pb-2 mt-2" />

      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="w-[85%] md:px-0 min-w-24 mr-2 h-7 px-[0.625rem] animate-pulse rounded-md bg-[#DEE2E7]"
        />
      ))}
    </div>
  )
}
