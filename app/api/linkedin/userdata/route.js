import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { accessToken } = await req.json()
    console.log("Received access token:", accessToken)

    const userResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    console.log("User response status:", userResponse.status)

    if (userResponse.ok) {
      const userData = await userResponse.json()
      console.log("User Data Response:", userData)
      return NextResponse.json(userData)
    } else {
      const errorData = await userResponse.json()
      console.error("Error fetching user data:", errorData.error)
      return NextResponse.json(
        { error: errorData.error_description },
        { status: userResponse.status }
      )
    }
  } catch (error) {
    console.error("Error in POST /api/linkedin/userdata:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
