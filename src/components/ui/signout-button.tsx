'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { signout } from '@/app/actions/auth'

export function SignoutButton() {
  const router = useRouter()

  return (
    <button
      className="flex items-center w-full justify-center gap-1.5"
      onClick={async () => {
        await signout()
        router.refresh()
        toast.success('You have been successfully logged out.')
      }}
      title="Sign out"
    >
      <span className="text-sm text-[#505050] font-semibold">Sign out</span>
      <LogOut className="w-4 text-[#505050]" />
    </button>
  )
}
