/* eslint-disable react/no-unescaped-entities */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ResumeReader from "@/components/ui/ResumeReader"

export function Profile() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-4xl rounded-lg border bg-background p-6 shadow-lg">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Your Profile</h2>
            <p className="text-muted-foreground">
              Update your personal information, experience, licenses, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 555-5555" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  defaultValue="San Francisco, CA"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Experience</Label>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Software Engineer</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">2018 - Present</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      5+ years as a software engineer, developing and
                      maintaining web applications using React, Node.js, and
                      PostgreSQL.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Intern</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">2017 - 2018</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      1 year as a software engineering intern, working on
                      various projects and learning new technologies.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="licenses">Licenses & Certifications</Label>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      AWS Certified Solutions Architect
                    </h3>
                    <p className="text-muted-foreground">Obtained in 2021</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">PMP Certification</h3>
                    <p className="text-muted-foreground">Obtained in 2020</p>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      Bachelor's Degree in Computer Science
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground">2013 - 2017</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          University of California, Berkeley
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">{/* <ResumeReader /> */}</div>
        </div>
      </div>
    </div>
  )
}
