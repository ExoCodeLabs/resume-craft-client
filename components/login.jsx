"use client" // Add this directive at the top

import { useState, useEffect } from "react"
import { Button } from "./ui/button"

export function Login() {
  const [user, setUser] = useState(null)
  const [popup, setPopup] = useState(null)

  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  const redirectUri = `${
    typeof window === "object" && window.location.origin
  }/api/linkedin/callback`
  const scope = "openid profile email"

  const linkedInLogin = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
      scope
    )}&state=12345`
    const newPopup = window.open(
      authUrl,
      "LinkedIn Login",
      "width=600,height=600"
    )
    setPopup(newPopup)
  }

  const exchangeCodeForToken = async (code) => {
    try {
      console.log("Exchanging code for token with code:", code)
      const response = await fetch("/api/linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, redirectUri }),
      })

      if (response.ok) {
        const { accessToken } = await response.json()
        console.log("Access Token:", accessToken)
        fetchLinkedInUserData(accessToken)
      } else {
        const errorData = await response.json()
        console.error(
          "Error exchanging code for access token:",
          errorData.error
        )
      }
    } catch (error) {
      console.error("Exchange Code Error:", error)
    }
  }

  const fetchLinkedInUserData = async (accessToken) => {
    try {
      console.log("Fetching user data with access token:", accessToken)
      const response = await fetch("/api/linkedin/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      })

      if (response.ok) {
        const userData = await response.json()
        console.log("User Data:", userData)
        setUser(userData)
      } else {
        const errorData = await response.json()
        console.error("Error fetching user data:", errorData.error)
      }
    } catch (error) {
      console.error("Fetch User Data Error:", error)
    }
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === window.location.origin) {
        const { code } = event.data
        if (code) {
          console.log("Received code via postMessage:", code)
          exchangeCodeForToken(code)
          if (popup) {
            popup.close()
          }
        }
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [popup])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Connect with LinkedIn</h2>
            <p className="text-muted-foreground">
              Sign in to your account or create a new one.
            </p>
          </div>
          <Button onClick={linkedInLogin} variant="outline" className="w-full">
            <LinkedinIcon className="mr-2 h-5 w-5" />
            Sign in with LinkedIn
          </Button>
        </div>
        {user && (
          <div>
            <h3>User Details</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
