import { ChevronRight, Heart } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { AddToCart } from '@/components/add-to-cart'
import { Product } from '@/components/home'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Rating } from '@/components/ui/ratings'
import { formatCurrency } from '@/lib/format-currency'

export interface ProductDetails extends Product {
  brand: string
  category: string
  rating: number
  images: string[]
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
}

async function getProductDetails(productId: string): Promise<ProductDetails> {
  const res = await fetch(`https://dummyjson.com/products/${productId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch product details')
  }

  return res.json()
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = await getProductDetails(params.id)

  return {
    title: product.title,
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const productResponse = await getProductDetails(params.id)

  return (
    <section className="flex-1 flex flex-col">
      <div className="flex pl-4 min-[1180px]:pl-0 py-4 items-center gap-2 text-sm text-[#505050] underline">
        <Link href="/">Home</Link>
        <ChevronRight className="w-3" />
        <Link href={`/category/${productResponse.title}`}>
          {productResponse.title}
        </Link>
      </div>
      <section className="flex md:flex-initial flex-1 md:p-5 md:border md:border-[#DEE2E7] md:items-start md:mx-4 min-[1180px]:mx-0 md:rounded-md md:mb-4 overflow-hidden md:bg-white flex-col md:flex-row">
        <Carousel className="w-full md:flex-1 md:rounded-md md:border md:border-[DEE2E7]">
          <CarouselContent>
            {productResponse.images.map((img, index) => (
              <CarouselItem
                className="bg-[#EFF2F4] md:bg-transparent h-[19.06rem] md:h-[23.75rem]"
                key={index}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={img}
                  width={500}
                  height={500}
                  alt=""
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute bottom-0 left-4 top-1/2 -translate-y-1/2 rounded-full" />

          <CarouselNext className="absolute bottom-0 right-4 top-1/2 -translate-y-1/2 rounded-full" />
        </Carousel>

        <div className="bg-white flex-1 md:flex-2 p-4">
          <Rating
            readOnly
            initialRating={productResponse.rating}
            maxRating={5}
          />
          <p className="font-medium text-[#1C1C1C] md:text-xl leading-6 mt-3">
            {productResponse.title}
          </p>

          <strong className="block mt-1 text-[#FA3434] md:text-2xl leading-normal">
            {formatCurrency({ currency: productResponse.price })}
          </strong>

          <div className="flex gap-2 mt-[0.625rem] md:w-[60%]">
            <AddToCart
              item={{
                ...productResponse,
                imageUrl: productResponse.images[0],
              }}
            />
            <button className="py-3 text-[#0D6EFD] border border-[#DEE2E7] rounded-md p-3 bg-white font-medium  leading-none">
              <Heart />
            </button>
          </div>
          <p className="text-[#505050]  mt-[0.625rem] text-sm">
            {productResponse.description}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="p-10">
                  <td className="text-[#8B96A5] border-b border-[#DEE2E7] leading-normal py-2">
                    Brand:
                  </td>
                  <td className="text-[#505050] border-b border-[#DEE2E7] py-2">
                    {productResponse.brand}
                  </td>
                </tr>
                <tr>
                  <td className="text-[#8B96A5] border-b border-[#DEE2E7] py-2 leading-normal">
                    Category:
                  </td>
                  <td className="text-[#505050] border-b border-[#DEE2E7] py-2">
                    {productResponse.category}
                  </td>
                </tr>
                <tr>
                  <td className="text-[#8B96A5] border-b border-[#DEE2E7] py-2 leading-normal">
                    Warranty Information:
                  </td>
                  <td className="text-[#505050] border-b border-[#DEE2E7] py-2">
                    {productResponse.warrantyInformation}
                  </td>
                </tr>
                <tr>
                  <td className="text-[#8B96A5] border-b border-[#DEE2E7] py-2 leading-normal">
                    Return Policy:
                  </td>
                  <td className="text-[#505050] border-b border-[#DEE2E7] py-2">
                    {productResponse.returnPolicy}
                  </td>
                </tr>
                <tr>
                  <td className="text-[#8B96A5] border-b border-[#DEE2E7] py-2 leading-normal">
                    Shipping Information:
                  </td>
                  <td className="text-[#505050] border-b border-[#DEE2E7] py-2">
                    {productResponse.shippingInformation}
                  </td>
                </tr>
                <tr>
                  <td className="text-[#8B96A5] border-b border-[#DEE2E7] py-2 leading-normal">
                    Availability Status:
                  </td>
                  <td className="text-[#00B517] border-b border-[#DEE2E7] py-2">
                    {productResponse.availabilityStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  )
}
