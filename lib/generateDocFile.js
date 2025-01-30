import { Document, Packer, Paragraph, TextRun } from "docx"
import saveAs from "save-as"

const DocDownloader = async () => {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Hello World this i rishi"),
                new TextRun({
                  text: "Foo Bar",
                  bold: true,
                }),
                new TextRun({
                  text: "\tGithub is the best",
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    })

    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      saveAs(blob, "example.docx")
      console.log("Document created successfully")
    })
  } catch (error) {
    console.error("Error downloading the file:", error)
  }
}

const mockResume = {
  name: "John Doe",
  title: "Software Engineer",
  contact: {
    email: "john.doe@example.com",
    github: "github.com/johndoe",
    phone: "123-456-7890",
    linkedin: "linkedin.com/in/johndoe",
  },
  experience: [
    {
      title: "Senior Developer",
      company: "Tech Company",
      dates: "Jan 2020 - Present",
      description: "Developed and maintained web applications.",
    },
    {
      title: "Junior Developer",
      company: "Another Tech Company",
      dates: "Jan 2018 - Dec 2019",
      description: "Assisted in the development of web applications.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science",
      major: "Computer Science",
      school: "University of Somewhere",
      dates: "2014 - 2018",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "CSS"],
}
const GenerateResumeDoc = (resume = mockResume) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: resume.name,
                bold: true,
                size: 28,
              }),
              new TextRun({
                text: resume.title,
                bold: true,
                size: 24,
                break: 1,
              }),
              new TextRun({
                text: `${resume.contact.email} | ${resume.contact.github} | ${resume.contact.phone} | ${resume.contact.linkedin}`,
                size: 20,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({
                text: "Experience",
                bold: true,
                size: 24,
                break: 1,
              }),
            ],
          }),
          ...resume.experience.map(
            (job) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({
                    text: `${job.title}`,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: `\n${job.company} | ${job.dates}`,
                    size: 20,
                  }),
                  new TextRun({
                    text: `\n${job.description}`,
                    size: 20,
                    break: 1,
                  }),
                ],
              })
          ),
          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({
                text: "Education",
                bold: true,
                size: 24,
              }),
            ],
          }),
          ...resume.education.map(
            (edu) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({
                    text: `${edu.degree} in ${edu.major}`,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: `\n  ${edu.dates}`,
                    size: 20,
                  }),
                  new TextRun({
                    text: `\n${edu.school}`,
                    size: 20,
                    break: 1,
                  }),
                ],
              })
          ),
          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({
                text: "Skills",
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: resume.skills.map(
              (skill) =>
                new TextRun({
                  text: `${skill}", "`,
                  size: 20,
                })
            ),
          }),
        ],
      },
    ],
  })

  try {
    Packer.toBlob(doc).then((blob) => {
      console.log(blob)
      saveAs(blob, "resume.docx")
      console.log("Document created successfully")
    })
  } catch (error) {
    console.error("Error downloading the file:", error)
  }
}

export { GenerateResumeDoc, DocDownloader }
