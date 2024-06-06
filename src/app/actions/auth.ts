'use server'

import { compare, hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { connectDB } from '@/db/connection'
import { Customer } from '@/db/models/customer'
import { createSession, decrypt } from '@/lib/auth-session'

const signupFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Enter a valid name.' }).trim(),
  lastName: z.string().min(2, { message: 'Enter a valid name.' }).trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 8 characters long.' })
    .trim(),
})

const signinFormSchema = z.object({
  email: z.string().email({ message: 'Cannot be empty.' }).trim(),
  password: z.string().min(6, { message: 'Cannot be empty.' }).trim(),
})

type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function signup(state: FormState, formData: FormData) {
  // await new Promise((resolve) => setInterval(resolve, 300000))
  await connectDB()

  const validatedFields = signupFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, firstName, lastName, password } = validatedFields.data

  const userAlreadyExists = await Customer.findOne({ email: { $eq: email } })

  if (userAlreadyExists) {
    return {
      message: 'User already exists.',
    }
  }

  const hashedPassword = await hash(password, 8)

  const userCreated = await Customer.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  })

  if (!userCreated) {
    return {
      message: 'Something went wrong',
    }
  }

  await createSession(userCreated.id)
  revalidatePath('/')
  redirect('/')
}

export async function signin(state: FormState, formData: FormData) {
  await connectDB()

  const validatedFields = signinFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  const user = await Customer.findOne({ email: { $eq: email } })

  if (!user) {
    return {
      message: 'Invalid credentials.',
    }
  }

  const isPasswordCorrect = await compare(password, user.password)

  if (!isPasswordCorrect) {
    return {
      message: 'Invalid credentials.',
    }
  }

  await createSession(user.id)
  revalidatePath('/')
  redirect('/')
}

export async function signout() {
  cookies().delete('session')

  revalidatePath('/')
}

interface GetUserInfoResponse {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
}

export async function getUserInfo(
  session: string,
): Promise<GetUserInfoResponse> {
  const sessionDecrypted = await decrypt(session)

  await connectDB()

  const user = await Customer.findOne({ id: { $eq: sessionDecrypted?.sub } })

  if (!user) {
    throw new Error('User not found.')
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }
}
