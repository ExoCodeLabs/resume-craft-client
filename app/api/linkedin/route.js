import { NextResponse } from "next/server"

export function GET() {
  return new Response(JSON.stringify({ message: "API is reachable" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function POST(req) {
  try {
    const { code, redirectUri } = await req.json()
    console.log("Received code and redirectUri:", code, redirectUri)

    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    })

    console.log("Requesting access token with params:", params.toString())

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log("Access Token Response:", data)
      return NextResponse.json({ accessToken: data.access_token })
    } else {
      const errorData = await response.json()
      console.error("Error exchanging code for access token:", errorData)
      return NextResponse.json(
        { error: errorData.error_description },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error("Error in POST /api/linkedin:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
