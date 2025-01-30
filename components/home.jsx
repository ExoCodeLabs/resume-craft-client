"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { Loading } from "./loading"
import Header from "./Header.jsx"
import HeroSection from "./HeroSection.jsx"
import ResumeUploadCard from "./ResumeUploadCard.jsx"
import ResumePreviewCard from "./ResumePreviewCard.jsx"
import CoverLetterPreviewCard from "./CoverLetterPreviewCard.jsx"
import Footer from "./Footer.jsx"

// Define validation schema using Yup
const validationSchema = Yup.object({
  jobTitle: Yup.string()
    .min(3, "Job title must be at least 3 characters")
    .required("Job title is required"),
  jobDescription: Yup.string()
    .min(10, "Job description must be at least 10 characters")
    .required("Job description is required"),
})

export function Home() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState({
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
  })

  const formik = useFormik({
    initialValues: {
      ...aiResponse,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async ({ jobTitle, jobDescription }) => {
      if (!selectedFile) {
        alert("Please select a PDF file first.")
        return
      }
      setisLoading(true)
      const fileBuffer = await selectedFile.arrayBuffer()
      try {
        const parsedFile = await fetch("/api/parse-pdf", {
          method: "POST",
          body: fileBuffer,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        })

        if (!parsedFile.ok) {
          throw new Error("Failed to parse PDF")
        }

        const resumeText = await parsedFile.json()

        const response = await fetch("/api/generate-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobTitle,
            jobDescription,
            resumeText,
          }),
        })

        const parsedResponse = await response.json()

        if (!parsedResponse?.error) setAiResponse(parsedResponse)
        setisLoading(false)
      } catch (error) {
        setisLoading(false)
        console.error("Error uploading file:", error)
      }
    },
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === "application/pdf") setSelectedFile(file)
  }

  const handleButtonClick = () => {
    document.getElementById("fileInput").click()
  }

  const { resume, cover_letter: coverLetter } = aiResponse

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <HeroSection />
      <main className="flex-1 px-6 py-8 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          <ResumeUploadCard
            formik={formik}
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            handleButtonClick={handleButtonClick}
          />
          {!isLoading ? (
            <>
              <ResumePreviewCard resume={resume} />
              <CoverLetterPreviewCard
                coverLetter={coverLetter}
                resume={resume}
              />
            </>
          ) : (
            <>
              <Loading />
              <Loading />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
