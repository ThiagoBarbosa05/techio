'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import { signin } from '@/app/actions/auth'

import { SubmitButton } from '../ui/submit-button'

export function Signin() {
  const [state, action] = useActionState(signin, undefined)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#EFF2F4] p-4">
      <form
        action={action}
        className="border border-[#DEE2E7] bg-white p-4 w-full max-w-[460px] rounded-md"
      >
        <h2 className="text-2xl font-bold mb-8">Log in to your account</h2>
        <div className="flex flex-col gap-4">
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
              placeholder="Your password"
            />
            {state?.errors?.password && (
              <p className="text-xs text-[#E57800] leading-normal mt-1">
                {state.errors.password}
              </p>
            )}
          </div>
        </div>
        {state?.message && (
          <p className="text-sm text-red-600 font-semibold mt-4 animate-pulse">
            {state.message}
          </p>
        )}

        <SubmitButton className="w-full h-12 mt-4 rounded-md" title="sign in">
          Sign in
        </SubmitButton>

        <Link
          className="text-sm text-[#0D6EFD] mt-2 inline-block underline decoration-[#0D6EFD]"
          href="/auth/signup"
        >
          Not have an account yet? sign up
        </Link>
      </form>
    </div>
  )
}
