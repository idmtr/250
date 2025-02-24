import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_access'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'Password is required' 
      }, { status: 400 })
    }

    const adminSecret = process.env.ADMIN_SECRET
    if (!adminSecret) {
      console.error('ADMIN_SECRET not configured')
      return NextResponse.json({ 
        success: false, 
        error: 'Server configuration error' 
      }, { status: 500 })
    }

    if (password === adminSecret) {
      const response = NextResponse.json({
        success: true,
        message: 'Login successful'
      })

      // Set cookie in the response
      response.cookies.set(COOKIE_NAME, adminSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      })

      return response
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Invalid password' 
    }, { status: 401 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    }, { status: 500 })
  }
}