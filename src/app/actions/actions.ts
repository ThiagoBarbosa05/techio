'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { IOrder } from '@/components/checkout'
import { connectDB } from '@/db/connection'
import { Cart, CartItem } from '@/db/models/cart'
import { Order } from '@/db/models/order'
import { decrypt, getSession } from '@/lib/auth-session'

export async function addItemsToCart(cartItem: CartItem) {
  const session = getSession()
  if (!session) {
    return redirect('/auth/signin')
  }

  const response = await decrypt(session)

  await connectDB()

  const userCart = await Cart.findOne({
    customerId: { $eq: response?.userId },
    isPending: { $eq: false },
  })

  if (userCart) {
    const itemIndex = userCart.items.findIndex(
      (item) => item.productId === cartItem.productId,
    )

    if (itemIndex > -1) {
      userCart.items[itemIndex].quantity += cartItem.quantity
      userCart.totalPrice = userCart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )

      await userCart.save()
    } else {
      userCart.items.push(cartItem)
      userCart.totalPrice = userCart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )

      await userCart.save()
    }
    revalidatePath('/cart')
    redirect('/cart')
  }

  await Cart.create({
    items: [cartItem],
    customerId: response?.userId,
    totalPrice: cartItem.price * cartItem.quantity,
  })

  revalidatePath('/cart')
  redirect('/cart')
}

interface CartResponse {
  id: string
  items: CartItem[]
  customerId: string
  totalPrice: number
  createdAt: Date
  updatedAt: Date
}

export async function getCart(): Promise<CartResponse | undefined> {
  await connectDB()

  try {
    const session = getSession()
    if (!session) {
      return redirect('/auth/signin')
    }

    const response = await decrypt(session)

    const cart = await Cart.findOne({
      customerId: { $eq: response?.userId },
      isPending: { $eq: false },
    })

    if (!cart) {
      return
    }

    return {
      customerId: cart.customerId,
      createdAt: cart.createdAt,
      id: cart.id,
      items: cart.items,
      updatedAt: cart.updatedAt,
      totalPrice: cart.totalPrice,
    }
  } catch (err) {
    console.log(err)
  }
}

export async function removeItemFromCart(productId: number) {
  await connectDB()

  try {
    const session = getSession()
    if (!session) {
      return redirect('/auth/signin')
    }

    const response = await decrypt(session)

    const cart = await Cart.findOneAndUpdate(
      { customerId: { $eq: response?.userId }, isPending: { $eq: false } },
      { $pull: { items: { productId } } },
      { new: true },
    )

    if (!cart) {
      throw new Error('Cart not found.')
    }

    const newTotalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    )

    cart.totalPrice = newTotalPrice

    await cart.save()
  } catch {
    console.log('erro')
  }

  revalidatePath('/cart')
}

interface UpdateItemQuantity {
  productId: number
  quantity: number
}

export async function updateItemQuantity({
  productId,
  quantity,
}: UpdateItemQuantity) {
  await connectDB()

  try {
    const session = getSession()
    if (!session) {
      return redirect('/auth/signin')
    }

    const response = await decrypt(session)

    const cart = await Cart.findOne({
      customerId: response?.userId,
      isPending: { $eq: false },
    })

    if (!cart) {
      throw new Error('Cart not found.')
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    )

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity
    }

    const newTotalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    )

    cart.totalPrice = newTotalPrice

    await cart.save()
  } catch {
    console.log('erro')
  }

  revalidatePath('/cart')
}

export async function createOrder(order: IOrder) {
  await connectDB()

  try {
    const cart = await Cart.findById(order.cartId)

    if (!cart) {
      throw new Error('Cart not found.')
    }

    cart.isPending = true

    await cart.save()

    await Order.create(order)
  } catch (err) {
    console.log(err)
  }
  redirect('/checkout/success')
}

interface OrderResponse {
  id: string
  customerId: string
  totalItems: number
  amount: number
  createdAt?: Date | null
}

export async function fetchOrders(): Promise<OrderResponse[]> {
  await connectDB()

  try {
    const session = getSession()
    if (!session) {
      return redirect('/auth/signin')
    }

    const response = await decrypt(session)
    const order = await Order.find({ customerId: { $eq: response?.userId } })

    if (!order) {
      throw new Error('Cart not found.')
    }

    return order.map((od) => ({
      amount: od.amount,
      customerId: od.customerId,
      id: od.id,
      totalItems: od.totalItems,
      createdAt: od.createdAt,
    }))
  } catch (err) {
    console.log(err)
  }
  redirect('/checkout/success')
}

const FormSearchSchema = z.object({
  query: z.string(),
})
export async function searchProducts(formData: FormData) {
  const { query } = FormSearchSchema.parse({
    query: formData.get('query'),
  })

  redirect(`/search?q=${query}`)
}
