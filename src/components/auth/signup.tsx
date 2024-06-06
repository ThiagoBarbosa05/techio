'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import { signup } from '@/app/actions/auth'

import { SubmitButton } from '../ui/submit-button'

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#EFF2F4] p-4">
      <form
        action={action}
        className="border border-[#DEE2E7] bg-white p-4 w-full max-w-[460px] rounded-md"
      >
        <h2 className="text-2xl font-bold mb-8">Create an account</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label
              className="leading-none text-[#1C1C1C] block mb-2"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name"
              className="border border-[#DEE2E7] text-sm rounded-md p-[0.625rem] w-full  outline-[#0D6EFD]"
            />
            {state?.errors?.firstName && (
              <p className="text-xs text-[#E57800] leading-normal mt-1">
                {state.errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="leading-none text-[#1C1C1C] block mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              className="border border-[#DEE2E7] text-sm rounded-md p-[0.625rem] w-full  outline-[#0D6EFD]"
            />
            {state?.errors?.lastName && (
              <p className="text-xs text-[#E57800] leading-normal mt-1">
                {state.errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label
              className="leading-none text-[#1C1C1C] block mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              className="border border-[#DEE2E7] text-sm rounded-md p-[0.625rem] w-full  outline-[#0D6EFD]"
            />
            {state?.errors?.email && (
              <p className="text-xs text-[#E57800] leading-normal mt-1">
                {state.errors.email}
              </p>
            )}
            {state?.message && (
              <p className="text-xs text-[#E57800] leading-normal mt-1">
                {state.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="leading-none text-[#1C1C1C] block mb-2"
              htmlFor="password"
            >
              password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-[#DEE2E7] text-sm rounded-md p-[0.625rem] w-full  outline-[#0D6EFD]"
              placeholder="min 6 characters"
            />
            {state?.errors?.password && (
              <p className="text-xs text-[#E57800] leading-normal mt-1">
                {state.errors.password}
              </p>
            )}
          </div>
        </div>

        <SubmitButton className="w-full h-12 mt-4 rounded-md" title="sign up">
          Sign up
        </SubmitButton>
        <Link
          className="text-sm text-[#0D6EFD] mt-2 inline-block underline decoration-[#0D6EFD]"
          href="/auth/signin"
        >
          Do you already have an account?, sign in
        </Link>
      </form>
    </div>
  )
}
