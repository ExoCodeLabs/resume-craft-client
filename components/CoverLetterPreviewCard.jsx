import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const CoverLetterPreviewCard = ({ coverLetter, resume }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
      <CardHeader>
        <CardTitle>Cover Letter Preview</CardTitle>
        <CardDescription>
          This is your generated cover letter based on the job description.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="text-lg font-bold">{coverLetter.header}</div>
            <div className="text-sm">{coverLetter.intro}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-base font-medium">Relevant Experience</div>
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
  )
}

export default CoverLetterPreviewCard
