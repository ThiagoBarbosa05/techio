import { ImageResponse } from 'next/og'

import { ProductDetails } from './page'

export const runtime = 'edge'

export const alt = ''

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(productId: string): Promise<ProductDetails> {
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
    cache: 'no-store',
  })

  const product = await response.json()

  return product
}

export default async function OgImage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  const productImageURL = new URL(
    product.images[0],
    process.env.APP_URL,
  ).toString()

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#E0E0E0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
