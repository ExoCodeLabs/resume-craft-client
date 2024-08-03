// components/ResumeReader.js

"use client"

import { useState } from "react"

const ResumeReader = () => {
  const [file, setFile] = useState(null)
  const [resumeData, setResumeData] = useState({})

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    handleFileUpload()
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
        console.log({ data })
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
      <button onClick={handleFileUpload}>Upload and Parse</button>

      <h2>Resume Data</h2>
      <p>{JSON.stringify(resumeData, null, 2)}</p>
    </div>
  )
}

export default ResumeReader
