import pdfParse from "pdf-parse"
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
    // Convert the request to a buffer for `pdf-parse`
    const buffer = await req.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)

    // Parse the PDF file
    const pdfData = await pdfParse(fileBuffer)

    // Return a JSON response with the parsed data
    return NextResponse.json(pdfData.text, { status: 200 })
  } catch (error) {
    console.error("Error parsing PDF:", error)

    // Return an error response in case of any issues
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    )
  }
}
