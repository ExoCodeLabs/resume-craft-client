import { Document, Packer, Paragraph, TextRun, UnderlineType } from "docx"
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

  objective:
    "Seasoned Full Stack Developer specializing in Full Stack Web development with over 3 years of experience. Proven track record in leading development teams and delivering innovative software solutions. Eager to contribute technical expertise and leadership skills to advance technology development in a forward-thinking company. ",
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
  resume = mockResume
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
                size: 42,
                font: "Calibri",
              }),
              new TextRun({
                text: resume.title,
                bold: true,
                size: 24,
                break: 1,
                font: "Calibri",
              }),
              new TextRun({
                text: `${resume.contact.email} | ${resume.contact.github} | ${resume.contact.phone} | ${resume.contact.linkedin}`,
                size: 20,
                break: 2,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                underline: {
                  type: UnderlineType.DOUBLE,
                  color: "FF0000",
                },
                text: "Objective",
                bold: true,
                size: 24,
                break: 1,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({
                text: resume.objective,
                size: 22,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({
                text: "Experience",
                size: 24,
                font: "Calibri",
                bold: true,
              }),
            ],
          }),
          ...resume.experience.map(
            (job) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [
                  new TextRun({
                    text: `${job.title}, ${job.company} `,
                    bold: true,
                    size: 22,
                    font: "Calibri",
                  }),
                  new TextRun({
                    text: `\n${job.dates}`,
                    size: 20,
                    font: "Calibri",
                  }),
                  new TextRun({
                    text: `\n${job.description}`,
                    size: 20,
                    break: 1,
                    font: "Calibri",
                  }),
                ],
              })
          ),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({
                text: "Education",
                bold: true,
                size: 24,
                font: "Calibri",
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
                    font: "Calibri",
                    break: 1,
                  }),
                  new TextRun({
                    text: `\n  ${edu.dates}`,
                    size: 20,
                    font: "Calibri",
                  }),
                  new TextRun({
                    text: `\n${edu.school}`,
                    size: 20,
                    break: 1,
                    font: "Calibri",
                  }),
                ],
              })
          ),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({
                text: "Skills",
                bold: true,
                size: 24,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: resume.skills.map(
              (skill) =>
                new TextRun({
                  text: `${skill}, `,
                  size: 20,
                  font: "Calibri",
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
