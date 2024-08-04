import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export function ParseApiResponse(text) {
  const resumeStart = text.indexOf("**Resume**") + "**Resume**".length
  const coverLetterStart = text.indexOf("--- **Cover Letter**")

  // Extract resume and cover letter text
  const resumeText = text.substring(resumeStart, coverLetterStart).trim()
  const coverLetterText = text
    .substring(coverLetterStart + "--- **Cover Letter**".length)
    .trim()

  // Extract information from resume text
  const resumeLines = resumeText
    .split("\n")
    .filter((line) => line.trim() !== "")

  const resume = {
    name: resumeLines[0],
    title: resumeLines[1],
    location: resumeLines[2],
    contact: resumeLines[3],
    linkedin: extractValue(resumeLines, "LinkedIn: "),
    github: extractValue(resumeLines, "GitHub: "),
    skills: extractList(resumeLines, "Top Skills:"),
    certifications: extractList(resumeLines, "Certifications:"),
    summary: extractValue(resumeLines, "Summary:"),
    experience: extractList(resumeLines, "Experience:"),
    education: extractList(resumeLines, "Education:"),
  }

  // Extract information from cover letter text
  const coverLetterLines = coverLetterText
    .split("\n")
    .filter((line) => line.trim() !== "")

  const coverLetter = {
    name: coverLetterLines[0],
    address: coverLetterLines[1],
    city: coverLetterLines[2],
    email: coverLetterLines[3],
    phone: coverLetterLines[4],
    date: coverLetterLines[5],
    company: coverLetterLines[6],
    greeting: coverLetterLines[7],
    body: coverLetterLines.slice(8, coverLetterLines.length - 2).join(" "),
    closing: coverLetterLines[coverLetterLines.length - 2],
    signature: coverLetterLines[coverLetterLines.length - 1],
  }

  return { resume, coverLetter }
}

function extractValue(lines, prefix) {
  const line = lines.find((line) => line.includes(prefix))
  return line ? line.split(prefix)[1].trim() : ""
}

function extractList(lines, prefix) {
  const startIndex = lines.findIndex((line) => line.includes(prefix))
  if (startIndex === -1) return []

  const list = []
  for (let i = startIndex + 1; i < lines.length; i++) {
    if (lines[i].startsWith("-")) {
      list.push(lines[i].substring(1).trim())
    } else if (lines[i] === "") {
      break
    }
  }
  return list
}
