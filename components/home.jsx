/* eslint-disable react/no-unescaped-entities */
"use client"
import Link from "next/link"
import { useFormik } from "formik" // Import Formik
import * as Yup from "yup" // Import Yup for validation
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ParseApiResponse } from "@/lib/utils"

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
  const [aiResponse, setAiResponse] = useState("")
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      jobDescription: "",
    },
    validationSchema, // Add validation schema to Formik
    onSubmit: async ({ jobTitle, jobDescription }) => {
      if (!selectedFile) {
        alert("Please select a PDF file first.")
        return
      }
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

        setAiResponse(await response.json())
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    },
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      alert("Please select a PDF file.")
    }
  }

  const handleButtonClick = () => {
    document.getElementById("fileInput").click()
  }

  const { resume, cover_letter: coverLetter } = aiResponse

  console.log({ resume, coverLetter })
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-background px-6">
        <Link href="#" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">ResumeCraft-AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Craft Your Perfect Resume with AI
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tailor your resume to the job you want with our AI-powered resume
              generator.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Get Started
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <main className="flex-1 px-6 py-8 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <form onSubmit={formik.handleSubmit}>
              {" "}
              {/* Use Formik's handleSubmit */}
              <CardHeader>
                <input
                  type="file"
                  accept="application/pdf"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {/* Consolidated button for file selection and upload */}
                <Button
                  component="span"
                  className="w-full"
                  onClick={handleButtonClick}
                >
                  <UploadIcon className="mr-2 h-5 w-5" />
                  {selectedFile ? selectedFile.name : "Upload LinkedIn Profile"}
                </Button>
              </CardHeader>
              <CardHeader>
                <CardTitle>Paste Job Description</CardTitle>
                <CardDescription>
                  Enter the job description you want to tailor your resume for.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Input
                    name="jobTitle"
                    placeholder="Enter job title"
                    className={`w-full ${
                      formik.touched.jobTitle && formik.errors.jobTitle
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Mark the field as touched
                    value={formik.values.jobTitle} // Bind to Formik
                  />
                  {formik.touched.jobTitle && formik.errors.jobTitle ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.jobTitle}
                    </div>
                  ) : null}
                  <Textarea
                    name="jobDescription"
                    placeholder="Paste job description here..."
                    className={`h-[200px] w-full resize-none ${
                      formik.touched.jobDescription &&
                      formik.errors.jobDescription
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Mark the field as touched
                    value={formik.values.jobDescription} // Bind to Formik
                  />
                  {formik.touched.jobDescription &&
                  formik.errors.jobDescription ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.jobDescription}
                    </div>
                  ) : null}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  Generate Resume
                </Button>
              </CardFooter>
            </form>
          </Card>
          {resume && coverLetter ? (
            <>
              {" "}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
                <CardHeader>
                  <CardTitle>Resume Preview</CardTitle>
                  <CardDescription>
                    This is your generated resume based on the job description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <div className="text-lg font-bold">{resume.name}</div>
                      <div className="text-md text-muted-foreground">
                        {resume.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {resume.contact.email}| {resume.contact.github} |
                        {resume.contact.phone} | {resume.contact.linkedin}
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                      <div className="text-sm font-semibold">Experience</div>
                      <div className="grid gap-2">
                        {resume.experience.map((job, index) => (
                          <div key={index} className="grid gap-1">
                            <div className="text-base font-medium">
                              {job.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {job.company} | {job.dates}
                            </div>
                            <div className="text-sm">{job.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-semibold">Education</div>
                      {resume.education.map((edu, index) => (
                        <div key={index} className="grid gap-1">
                          <div className="text-base font-medium">
                            {edu.degree} in {edu.major}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {edu.school} | {edu.dates}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-semibold">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Download Resume</Button>
                </CardFooter>
              </Card>
              <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
                <CardHeader>
                  <CardTitle>Cover Letter Preview</CardTitle>
                  <CardDescription>
                    This is your generated cover letter based on the job
                    description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <div className="text-lg font-bold">
                        {coverLetter.header}
                      </div>
                      <div className="text-sm">{coverLetter.intro}</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-base font-medium">
                        Relevant Experience
                      </div>
                      <div className="text-sm">{coverLetter.body}</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-base font-medium">Conclusion</div>
                      <div className="text-sm">{coverLetter.closing}</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-base font-medium">Sincerely,</div>
                      <div className="text-lg font-bold">{resume.name}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Download Cover Letter</Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
      <footer className="flex items-center justify-between border-t bg-background px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Designed and developed by ExoCode Labs
        </div>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
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
