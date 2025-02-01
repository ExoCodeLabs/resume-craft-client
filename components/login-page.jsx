"use client"
import { useState } from "react"
import { Formik, Form, Field, FieldArray } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Header from "./Header"
import Footer from "./Footer"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  job_title: Yup.string().required("Job title is required"),
  location: Yup.string().required("Location is required"),
  contact: Yup.object().shape({
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    linkedin: Yup.string().url("Invalid URL"),
    github: Yup.string().url("Invalid URL"),
  }),
  skills: Yup.array().of(Yup.string()),
  experience: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      company: Yup.string().required("Company is required"),
      location: Yup.string().required("Location is required"),
      dates: Yup.string().required("Dates are required"),
      description: Yup.string().required("Description is required"),
    })
  ),
  education: Yup.array().of(
    Yup.object().shape({
      degree: Yup.string().required("Degree is required"),
      major: Yup.string().required("Major is required"),
      school: Yup.string().required("School is required"),
      dates: Yup.string().required("Dates are required"),
    })
  ),
})

const initialValues = {
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
}

export default function LoginPage() {
  const [submittedData, setSubmittedData] = useState(null)

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmittedData(values)
    setSubmitting(false)
    // Here you would typically send the data to your backend
    console.log(values)
  }

  return (
    <>
      <Header />
      <div className="mx-auto p-4 bg-primary mx-0">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Resume Craft AI</CardTitle>
            <CardDescription>Fill in your resume details</CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="name">Name</Label>
                    <Field name="name" as={Input} />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}

                    <Label htmlFor="job_title">Job Title</Label>
                    <Field name="job_title" as={Input} />
                    {errors.job_title && touched.job_title && (
                      <div className="text-red-500">{errors.job_title}</div>
                    )}

                    <Label htmlFor="location">Location</Label>
                    <Field name="location" as={Input} />
                    {errors.location && touched.location && (
                      <div className="text-red-500">{errors.location}</div>
                    )}
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="contact">
                      <AccordionTrigger>Contact Information</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <Label htmlFor="contact.phone">Phone</Label>
                          <Field name="contact.phone" as={Input} />
                          {errors.contact?.phone && touched.contact?.phone && (
                            <div className="text-red-500">
                              {errors.contact.phone}
                            </div>
                          )}

                          <Label htmlFor="contact.email">Email</Label>
                          <Field name="contact.email" as={Input} type="email" />
                          {errors.contact?.email && touched.contact?.email && (
                            <div className="text-red-500">
                              {errors.contact.email}
                            </div>
                          )}

                          <Label htmlFor="contact.linkedin">LinkedIn</Label>
                          <Field name="contact.linkedin" as={Input} />
                          {errors.contact?.linkedin &&
                            touched.contact?.linkedin && (
                              <div className="text-red-500">
                                {errors.contact.linkedin}
                              </div>
                            )}

                          <Label htmlFor="contact.github">GitHub</Label>
                          <Field name="contact.github" as={Input} />
                          {errors.contact?.github &&
                            touched.contact?.github && (
                              <div className="text-red-500">
                                {errors.contact.github}
                              </div>
                            )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="skills">
                      <AccordionTrigger>Skills</AccordionTrigger>
                      <AccordionContent>
                        <FieldArray name="skills">
                          {({ push, remove, form }) => (
                            <div>
                              {form.values.skills.map((skill, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2 mb-2"
                                >
                                  <Field name={`skills.${index}`} as={Input} />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <Button type="button" onClick={() => push("")}>
                                Add Skill
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="experience">
                      <AccordionTrigger>Experience</AccordionTrigger>
                      <AccordionContent>
                        <FieldArray name="experience">
                          {({ push, remove }) => (
                            <div>
                              {initialValues.experience.map((_, index) => (
                                <div
                                  key={index}
                                  className="mb-4 p-4 border rounded"
                                >
                                  <Label htmlFor={`experience.${index}.title`}>
                                    Title
                                  </Label>
                                  <Field
                                    name={`experience.${index}.title`}
                                    as={Input}
                                  />
                                  {errors.experience?.[index]?.title &&
                                    touched.experience?.[index]?.title && (
                                      <div className="text-red-500">
                                        {errors.experience[index].title}
                                      </div>
                                    )}

                                  <Label
                                    htmlFor={`experience.${index}.company`}
                                  >
                                    Company
                                  </Label>
                                  <Field
                                    name={`experience.${index}.company`}
                                    as={Input}
                                  />
                                  {errors.experience?.[index]?.company &&
                                    touched.experience?.[index]?.company && (
                                      <div className="text-red-500">
                                        {errors.experience[index].company}
                                      </div>
                                    )}

                                  <Label
                                    htmlFor={`experience.${index}.location`}
                                  >
                                    Location
                                  </Label>
                                  <Field
                                    name={`experience.${index}.location`}
                                    as={Input}
                                  />
                                  {errors.experience?.[index]?.location &&
                                    touched.experience?.[index]?.location && (
                                      <div className="text-red-500">
                                        {errors.experience[index].location}
                                      </div>
                                    )}

                                  <Label htmlFor={`experience.${index}.dates`}>
                                    Dates
                                  </Label>
                                  <Field
                                    name={`experience.${index}.dates`}
                                    as={Input}
                                  />
                                  {errors.experience?.[index]?.dates &&
                                    touched.experience?.[index]?.dates && (
                                      <div className="text-red-500">
                                        {errors.experience[index].dates}
                                      </div>
                                    )}

                                  <Label
                                    htmlFor={`experience.${index}.description`}
                                  >
                                    Description
                                  </Label>
                                  <Field
                                    name={`experience.${index}.description`}
                                    as="textarea"
                                    className="w-full p-2 border rounded"
                                  />
                                  {errors.experience?.[index]?.description &&
                                    touched.experience?.[index]
                                      ?.description && (
                                      <div className="text-red-500">
                                        {errors.experience[index].description}
                                      </div>
                                    )}

                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                    className="mt-2"
                                  >
                                    Remove Experience
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="button"
                                onClick={() =>
                                  push({
                                    title: "",
                                    company: "",
                                    location: "",
                                    dates: "",
                                    description: "",
                                  })
                                }
                              >
                                Add Experience
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="education">
                      <AccordionTrigger>Education</AccordionTrigger>
                      <AccordionContent>
                        <FieldArray name="education">
                          {({ push, remove }) => (
                            <div>
                              {initialValues.education.map((_, index) => (
                                <div
                                  key={index}
                                  className="mb-4 p-4 border rounded"
                                >
                                  <Label htmlFor={`education.${index}.degree`}>
                                    Degree
                                  </Label>
                                  <Field
                                    name={`education.${index}.degree`}
                                    as={Input}
                                  />
                                  {errors.education?.[index]?.degree &&
                                    touched.education?.[index]?.degree && (
                                      <div className="text-red-500">
                                        {errors.education[index].degree}
                                      </div>
                                    )}

                                  <Label htmlFor={`education.${index}.major`}>
                                    Major
                                  </Label>
                                  <Field
                                    name={`education.${index}.major`}
                                    as={Input}
                                  />
                                  {errors.education?.[index]?.major &&
                                    touched.education?.[index]?.major && (
                                      <div className="text-red-500">
                                        {errors.education[index].major}
                                      </div>
                                    )}

                                  <Label htmlFor={`education.${index}.school`}>
                                    School
                                  </Label>
                                  <Field
                                    name={`education.${index}.school`}
                                    as={Input}
                                  />
                                  {errors.education?.[index]?.school &&
                                    touched.education?.[index]?.school && (
                                      <div className="text-red-500">
                                        {errors.education[index].school}
                                      </div>
                                    )}

                                  <Label htmlFor={`education.${index}.dates`}>
                                    Dates
                                  </Label>
                                  <Field
                                    name={`education.${index}.dates`}
                                    as={Input}
                                  />
                                  {errors.education?.[index]?.dates &&
                                    touched.education?.[index]?.dates && (
                                      <div className="text-red-500">
                                        {errors.education[index].dates}
                                      </div>
                                    )}

                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                    className="mt-2"
                                  >
                                    Remove Education
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="button"
                                onClick={() =>
                                  push({
                                    degree: "",
                                    major: "",
                                    school: "",
                                    dates: "",
                                  })
                                }
                              >
                                Add Education
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
        {submittedData && (
          <Card className="mt-8 w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Submitted Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </>
  )
}
