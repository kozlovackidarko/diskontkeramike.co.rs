import { client } from '@/tina/__generated__/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, variables } = body
    if (!query) {
      return NextResponse.json(
        { errors: [{ message: 'Missing query in body' }] },
        { status: 400 }
      )
    }
    const result = await client.request({
      query,
      variables: variables ?? {},
    })
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Tina request failed'
    return NextResponse.json(
      { errors: [{ message }] },
      { status: 500 }
    )
  }
}

export function GET() {
  return NextResponse.json({ message: 'TinaCMS API' })
}
