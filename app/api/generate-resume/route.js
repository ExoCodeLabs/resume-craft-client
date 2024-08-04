import axios from "axios"
import { NextResponse } from "next/server"

// Define the initial state format
const initialState = {
  resume: {
    name: "",
    job_title: "",
    location: "",
    contact: {
      phone: "",
      email: "",
      linkedin: "",
      github: "",
    },
    skills: [],
    experience: [
      {
        title: "",
        company: "",
        location: "",
        dates: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        major: "",
        school: "",
        dates: "",
      },
    ],
  },
  cover_letter: {
    header: "",
    intro: "",
    body: "",
    closing: "",
  },
}

// POST method to handle API requests
export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const { jobTitle, jobDescription, resumeText } = await req.json()

    // Validate required fields
    if (!jobTitle || !jobDescription || !resumeText) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      )
    }

    // Call OpenAI API to generate ATS-friendly resume and cover letter
    const gptResponse = await chatGPT(jobTitle, jobDescription, resumeText)

    // Respond with the generated content
    return NextResponse.json(gptResponse, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error.message)
    return NextResponse.json(
      { error: "Failed to generate resume and cover letter." },
      { status: 500 }
    )
  }
}

// Function to call OpenAI API
async function chatGPT(jobTitle, jobDescription, resumeText) {
  const apiKey = process.env.OPEN_AI_KEY
  const model = process.env.OPEN_AI_MODEL || "gpt-3.5-turbo"

  const prompt = `
      You are a resume and cover letter writing assistant. Based on the following information, generate an ATS-friendly resume and cover letter from my LinkedIn profile details.

      Job Title: ${jobTitle}
      Job Description: ${jobDescription}
      LinkedIn profile details: ${resumeText}

      Output the resume and cover letter separately and please provide the response in JSON format, following this structure:

      {
        "resume": {
          "name": "",
          "job_title": "",
          "location": "",
          "contact": {
            "phone": "",
            "email": "",
            "linkedin": "",
            "github": ""
          },
          "skills": [],
          "experience": [
            {
              "title": "",
              "company": "",
              "location": "",
              "dates": "",
              "description": ""
            }
          ],
          "education": [
            {
              "degree": "",
              "major": "",
              "school": "",
              "dates": ""
            }
          ]
        },
        "cover_letter": {
          "header": "",
          "intro": "",
          "body": "",
          "closing": ""
        }
      }
    `

  try {
    let isValidJSON = false
    let responseData = null
    let attempts = 0
    const maxAttempts = 3 // Limit the number of attempts to avoid infinite loops

    while (!isValidJSON && attempts < maxAttempts) {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: model,
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      )

      const { choices } = response.data
      const messageContent = choices[0].message.content

      try {
        // Attempt to parse the response as JSON
        responseData = JSON.parse(messageContent)
        console.log("Parsed JSON response:", responseData)

        // Validate the response format
        if (validateResponseFormat(responseData)) {
          console.log("Valid response format detected.")
          isValidJSON = true
        } else {
          console.warn("Invalid JSON format. Retrying...")
          attempts += 1
        }
      } catch (parseError) {
        console.warn("Failed to parse JSON response. Retrying...", parseError)
        attempts += 1
      }
    }

    if (!isValidJSON) {
      throw new Error("Failed to generate a valid JSON response.")
    }
    console.log("Valid response format detected. toooooooo")
    return responseData
  } catch (error) {
    console.error("Error with OpenAI API:", error.message)
    throw error
  }
}

// Function to validate the response format
function validateResponseFormat(response) {
  try {
    const { resume, cover_letter } = response

    // Validate resume format
    const isValidResume =
      typeof resume.name === "string" &&
      typeof resume.job_title === "string" &&
      typeof resume.location === "string" &&
      typeof resume.contact.phone === "string" &&
      typeof resume.contact.email === "string" &&
      typeof resume.contact.linkedin === "string" &&
      typeof resume.contact.github === "string" &&
      Array.isArray(resume.skills) &&
      Array.isArray(resume.experience) &&
      Array.isArray(resume.education) &&
      resume.experience.every(
        (exp) =>
          typeof exp.title === "string" &&
          typeof exp.company === "string" &&
          typeof exp.location === "string" &&
          typeof exp.dates === "string" &&
          typeof exp.description === "string"
      ) &&
      resume.education.every(
        (edu) =>
          typeof edu.degree === "string" &&
          typeof edu.major === "string" &&
          typeof edu.school === "string" &&
          typeof edu.dates === "string"
      )

    // Validate cover letter format
    const isValidCoverLetter =
      typeof cover_letter.header === "string" &&
      typeof cover_letter.intro === "string" &&
      typeof cover_letter.body === "string" &&
      typeof cover_letter.closing === "string"

    return isValidResume && isValidCoverLetter
  } catch (error) {
    console.warn("Error validating response format:", error.message)
    return false
  }
}
