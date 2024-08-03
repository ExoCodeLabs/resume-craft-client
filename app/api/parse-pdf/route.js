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

    // Extract and structure data from PDF
    const parsedData = parseResumeData(pdfData.text)

    // Return a JSON response with the parsed data
    return NextResponse.json(parsedData, { status: 200 })
  } catch (error) {
    console.error("Error parsing PDF:", error)

    // Return an error response in case of any issues
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    )
  }
}

// Function to parse the resume data text
function parseResumeData(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line)

  const resume = {
    contact: {},
    skills: [],
    certifications: [],
    summary: "",
    experience: [],
    education: [],
  }

  const isContactLine = (line) =>
    line.startsWith("+") ||
    line.includes("@") ||
    line.includes("linkedin.com") ||
    line.includes("github.com")
  const isSkillLine = (line) => line.startsWith("Top Skills")
  const isCertificationLine = (line) => line.startsWith("Certifications")
  const isSummaryLine = (line) => line.startsWith("Summary")
  const isExperienceLine = (line) => line.startsWith("Experience")
  const isEducationLine = (line) => line.startsWith("Education")

  let currentSection = ""
  lines.forEach((line) => {
    if (isContactLine(line)) {
      if (line.includes("@")) {
        resume.contact.email = line
      } else if (line.startsWith("+")) {
        resume.contact.phone = line
      } else if (line.includes("linkedin.com")) {
        resume.contact.linkedin = line
      } else if (line.includes("github.com")) {
        resume.contact.github = line
      }
    } else if (isSkillLine(line)) {
      currentSection = "skills"
    } else if (isCertificationLine(line)) {
      currentSection = "certifications"
    } else if (isSummaryLine(line)) {
      currentSection = "summary"
    } else if (isExperienceLine(line)) {
      currentSection = "experience"
    } else if (isEducationLine(line)) {
      currentSection = "education"
    } else {
      switch (currentSection) {
        case "skills":
          resume.skills.push(line)
          break
        case "certifications":
          resume.certifications.push(line)
          break
        case "summary":
          resume.summary += line + " "
          break
        case "experience":
          resume.experience.push(line)
          break
        case "education":
          resume.education.push(line)
          break
        default:
          break
      }
    }
  })

  return resume
}
