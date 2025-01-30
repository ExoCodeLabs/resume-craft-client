import React from "react"
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
import { Button } from "@/components/ui/button"

const ResumeUploadCard = ({
  formik,
  selectedFile,
  handleFileChange,
  handleButtonClick,
}) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1" id="resume_upload">
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
                formik.touched.jobDescription && formik.errors.jobDescription
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Mark the field as touched
              value={formik.values.jobDescription} // Bind to Formik
            />
            {formik.touched.jobDescription && formik.errors.jobDescription ? (
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

export default ResumeUploadCard
