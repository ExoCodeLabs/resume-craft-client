// app/api/parse-pdf/route.js

import pdfParse from "pdf-parse"

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for custom handling
  },
}

export async function POST(req) {
  try {
    const buffer = await req.arrayBuffer()
    const pdfData = await pdfParse(Buffer.from(buffer))
    const parsedData = parseResumeData(pdfData.text)

    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error parsing PDF:", error)
    return new Response(JSON.stringify({ message: "Error parsing PDF" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

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
