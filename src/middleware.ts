import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const session = cookies().get('session')

  if (!session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = {
  matcher: ['/cart', '/order'],
}
