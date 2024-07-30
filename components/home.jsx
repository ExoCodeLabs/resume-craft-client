/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
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

export function Home() {
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
            <CardHeader>
              <CardTitle>Paste Job Description</CardTitle>
              <CardDescription>
                Enter the job description you want to tailor your resume for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Input placeholder="Enter job title" className="w-full" />
                <Textarea
                  placeholder="Paste job description here..."
                  className="h-[200px] w-full resize-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Generate Resume</Button>
            </CardFooter>
          </Card>
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
                  <div className="text-lg font-bold">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    Software Engineer
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">Experience</div>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <div className="text-base font-medium">
                        Software Engineer
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Acme Inc. | 2019 - Present
                      </div>
                      <div className="text-sm">
                        Developed and maintained web applications using React,
                        Node.js, and MongoDB. Collaborated with cross-functional
                        teams to deliver high-quality software. Implemented new
                        features and optimized existing ones to improve user
                        experience.
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-base font-medium">Intern</div>
                      <div className="text-sm text-muted-foreground">
                        XYZ Corp. | 2018 - 2019
                      </div>
                      <div className="text-sm">
                        Assisted in the development of a mobile application
                        using React Native. Participated in code reviews and
                        learned best practices for software development.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">Education</div>
                  <div className="grid gap-1">
                    <div className="text-base font-medium">
                      Bachelor of Science in Computer Science
                    </div>
                    <div className="text-sm text-muted-foreground">
                      University of Example | 2015 - 2019
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                    <Badge variant="outline">Git</Badge>
                    <Badge variant="outline">Agile</Badge>
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
                  <div className="text-lg font-bold">Dear Hiring Manager,</div>
                  <div className="text-sm">
                    I am excited to apply for the Software Engineer position at
                    your esteemed company. With my extensive experience in web
                    development and a strong passion for creating innovative
                    solutions, I believe I am the ideal candidate to contribute
                    to your team's success.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="text-base font-medium">
                    Relevant Experience
                  </div>
                  <div className="text-sm">
                    Throughout my career, I have honed my skills in developing
                    and maintaining web applications using cutting-edge
                    technologies such as React, Node.js, and MongoDB. I have a
                    proven track record of collaborating with cross-functional
                    teams to deliver high-quality software that meets or exceeds
                    client expectations.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="text-base font-medium">Qualifications</div>
                  <div className="text-sm">
                    In addition to my technical expertise, I possess excellent
                    problem-solving and communication skills, which have enabled
                    me to effectively work on complex projects and communicate
                    effectively with stakeholders. I am also a quick learner and
                    am always eager to expand my knowledge and stay up-to-date
                    with the latest industry trends and best practices.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="text-base font-medium">Conclusion</div>
                  <div className="text-sm">
                    I am confident that my skills and experience make me an
                    ideal candidate for this role. I am excited about the
                    opportunity to contribute to your team and help drive the
                    success of your organization. Thank you for your
                    consideration, and I look forward to the opportunity to
                    discuss my qualifications further.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="text-base font-medium">Sincerely,</div>
                  <div className="text-lg font-bold">John Doe</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download Cover Letter</Button>
            </CardFooter>
          </Card>
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
