"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const ResumeReader = () => {
  const [file, setFile] = useState(null)
  const [resumeData, setResumeData] = useState({})

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    if (file) {
      const fileBuffer = await file.arrayBuffer()
      try {
        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          body: fileBuffer,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to parse PDF")
        }

        const data = await response.json()
        setResumeData(data)
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }
  return (
    <div>
      <h1>Resume Reader</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleFileUpload} className="w-full max-w-md">
        <UploadIcon className="mr-2 h-5 w-5" />
        Upload LinkedIn Profile
      </Button>

      <h2>Resume Data</h2>
      <pre>{JSON.stringify(resumeData, null, 2)}</pre>
    </div>
  )
}

function UploadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
export default ResumeReader
