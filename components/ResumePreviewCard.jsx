import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const ResumePreviewCard = ({ resume }) => {
  return (
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
            <div className="text-md text-muted-foreground">{resume.title}</div>
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
                  <div className="text-base font-medium">{job.title}</div>
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
        <Button variant="outline" onClick={() => DocDownloader()}>
          Download Resume
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ResumePreviewCard
