import { List } from 'lucide-react'

import { CategoriesContainer } from './categories-container'
import { CategoriesItem } from './categories-item'

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch('https://dummyjson.com/products/category-list')

  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }

  return res.json()
}

export async function Categories() {
  const categories = await fetchCategories()
  return (
    <CategoriesContainer className="bg-white md:max-w-60 md:w-full md:mt-4 md:bg-transparent md:flex-col md:items-start overflow-x-auto md:overflow-x-hidden flex items-center pl-4 min-[1180px]:pl-0 pb-4 .no-scrollbar">
      <span className="text-xl hidden md:flex items-center gap-2 font-bold border-b  border-[#DEE2E7] pb-2">
        <List className="w-5" /> Categories
      </span>
      {categories.map((category, index) => (
        <CategoriesItem
          className="bg-[#EFF2F4] rounded-md py-2 md:px-0 px-[0.625rem] md:text-[#8B96A5] md:hover:text-[#0D6EFD] font-medium mr-2 last:mr-4 text-[#0D6EFD] whitespace-nowrap md:whitespace-normal"
          category={category}
          key={index}
        />
      ))}
    </CategoriesContainer>
  )
}
