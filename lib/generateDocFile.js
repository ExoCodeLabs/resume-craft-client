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
export default DocDownloader
