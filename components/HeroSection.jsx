import React from "react"
import Typewriter from "./Typewriter"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="grid w-full items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <Typewriter text="Craft Your Perfect Resume with AI" />
          </h1>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Tailor your resume to the job you want with our AI-powered resume
            generator.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Link
            href="#resume_upload"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get Started
          </Link>
          <Link
            href="https://www.linkedin.com/help/linkedin/answer/a541960"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
            target="_blank"
          >
            Learn how to save linkedIn profile?
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
