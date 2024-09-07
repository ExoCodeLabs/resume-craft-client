// pages/api/download-resume.js
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const { name, title, experience, education, skills } = await req.json()

    console.log({ name, title, experience, education, skills })

    // Create the document
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: name,
                  bold: true,
                  size: 48,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            // Experience section
            ...experience.map((exp) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.role} - ${exp.company}`,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph(exp.description),
            ]),
            // Education section
            new Paragraph({
              children: [
                new TextRun({
                  text: "Education",
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${education.degree} - ${education.institution}`,
                  bold: true,
                }),
              ],
            }),
            // Skills section
            new Paragraph({
              children: [
                new TextRun({
                  text: "Skills",
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph(skills.join(", ")),
          ],
        },
      ],
    })

    // Generate the DOCX file buffer
    const buffer = await Packer.toBuffer(doc)

    // Create a Blob from the buffer
    const fileBlob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })

    // Create a response with fileBlob
    const response = new NextResponse(fileBlob, {
      headers: {
        "Content-Disposition": 'attachment; filename="Resume.docx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    })

    return response
  } catch (error) {
    console.error("Error generating resume:", error)
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 }
    )
  }
}
