import { NextResponse } from "next/server"

export async function GET(req) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")

  if (code) {
    return new Response(
      `<script>
        window.opener.postMessage({ code: '${code}' }, window.location.origin);
        window.close();
      </script>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    )
  } else {
    return NextResponse.redirect(`${url.origin}/login`)
  }
}
