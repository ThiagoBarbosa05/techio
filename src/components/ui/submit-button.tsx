'use client'

import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface SubmitButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}

export function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button
      className={twMerge(
        'bg-button-gradient text-white font-bold disabled:opacity-50 transition hover:opacity-85',
        className,
      )}
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      {...props}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <span className="border-t-2 border-r-2 border-white border-solid h-4 w-4 rounded-full animate-spin"></span>
        </span>
      ) : (
        <div className="flex items-center justify-center gap-2">{children}</div>
      )}
    </button>
  )
}
