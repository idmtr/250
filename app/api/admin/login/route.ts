import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_access'

export async function POST(request: Request) {
  console.log('[api] Login attempt received')

  try {
    const { password } = await request.json()
    
    if (!password || typeof password !== 'string') {
      console.log('[api] Invalid request: missing or invalid password')
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Password is required' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!process.env.ADMIN_SECRET) {
      console.error('[api] Server misconfiguration: ADMIN_SECRET not set')
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (password === process.env.ADMIN_SECRET) {
      console.log('[api] Login successful')
      
      // Properly await cookies() before using set
      const cookieStore = await cookies()
      cookieStore.set(COOKIE_NAME, process.env.ADMIN_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      return new NextResponse(
        JSON.stringify({ 
          success: true,
          message: 'Login successful' 
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('[api] Login failed: invalid password')
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'Invalid password' 
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('[api] Server error:', error)
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        error: 'An unexpected error occurred' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}