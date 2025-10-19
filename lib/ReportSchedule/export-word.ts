import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  BorderStyle,
  AlignmentType,
  VerticalAlign,
  ImageRun
} from "docx"
import { ReportData } from "../types"

// Function to download blob using native browser download
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
const getImageBuffer = async(imagePath: string) => {
  const res = await fetch("/logo1.png"); // ảnh trong thư mục public
  return await res.arrayBuffer();
};
export async function exportToWord(data: ReportData) {
  const imageBuffer = getImageBuffer("logo1.png");
  const headerTable = new Table({
    rows: [
      new TableRow({
        children: [
          // Left column: Logo and company name
          new TableCell({
            children: [
              new Paragraph({
                children: [
                   new ImageRun({
                            data: imageBuffer as any,
                            transformation: {
                            width: 195,
                            height: 57,
                            },
                            type: "png",
                        }),
                ],
              })
            ],
            width: { size: 25, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
          }),
          // Center column: Title and week info
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "KẾ HOẠCH CÔNG TÁC TUẦN",
                    bold: true,
                    size: 28,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: data.weekInfo,
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: { size: 50, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
          }),
          // Right column: Company code
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: data.companyCode,
                    size: 18,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
            width: { size: 25, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    cantSplit: true,
  })

  // Add spacing after header
  const spacingParagraph = new Paragraph({
    children: [new TextRun({ text: "" })],
    spacing: { after: 400 },
  })

  // Create schedule title
  const scheduleTitleParagraph = new Paragraph({
    children: [
      new TextRun({
        text: 'Lịch làm việc tuần',
        bold: true,
        size: 24,
      }),
    ],
    spacing: { after: 200 },
  })

  // Create schedule table
  const scheduleHeaderRow = new TableRow({
    children: data.schedule.headers.map(
      (header) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: header.day,
                  bold: true,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: header.date,
                  bold: true,
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          width: { size: 14.28, type: WidthType.PERCENTAGE },
          shading: { fill: "E5E5E5" },
        }),
    ),
  })

  const scheduleDataRows = data.schedule.timeSlots.map(
    (slot) =>
      new TableRow({
        children: slot.map(
          (cell) =>
            new TableCell({
              margins: {
              top: 100,      // Đơn vị là TWIP (1 point = 20 twip)
              bottom: 100,
              left: 100,
              right: 100,
            },
              children: cell.split("\n").map(
                (line) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: line,
                        size: 18,
                      }),
                    ],
                    spacing: { after: 100 },
                  }),
              ),
              verticalAlign:"center",
              width: { size: 14.28, type: WidthType.PERCENTAGE },
            }),
        ),
      }),
  )

  const scheduleTable = new Table({
    rows: [scheduleHeaderRow, ...scheduleDataRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
  })

  const dataWorks = data.tags.map(dt=>{
     const priorityTitleParagraph = new Paragraph({
    children: [
      new TextRun({
        text: dt.name,
        bold: true,
        size: 24,
      }),
    ],
    spacing: { before: 400, after: 200 },
      })
      const headers = ["CÔNG VIỆC", "CÔNG TRÌNH", "THỰC HIỆN", "TIẾN ĐỘ", "YÊU CẦU CÔNG VIỆC"]
      const priorityHeaderRow = new TableRow({
        children: headers.map(
          (header) =>
            new TableCell({
              children: [
                new Paragraph({
                  
                  children: [
                    new TextRun({
                      
                      text: header,
                      bold: true,
                      size: 20,
                    }),
                  ],
                  alignment: AlignmentType.CENTER
                }),
              ],
              shading: { fill: "E5E5E5" },
              verticalAlign:"center",
      margins: {
        top: 100,     // 100 TWIP = ~1.76mm
        bottom: 100,
        left: 100,
        right: 100,
      },
            }),
        ),
      })

      const priorityDataRows = dt.works.map(
        (row) =>
          new TableRow({
            children: [
              new TableCell({
                margins: {
              top: 100,      // Đơn vị là TWIP (1 point = 20 twip)
              bottom: 100,
              left: 100,
              right: 100,
            },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: row.name,
                        size: 18,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: row.project,
                        size: 18,
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                margins:{
                  bottom:100,
                  left:100,
                  right:100,
                  top:100
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: row.list_user.join(", "),
                        size: 18,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: row.time_process,
                        size: 18,
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                margins:{
                  bottom:100,
                  left:100,
                  right:100,
                  top:100
                },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: row.description,
                        size: 18,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
      )

      const priorityTable = new Table({
        rows: [priorityHeaderRow, ...priorityDataRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
          left: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
          right: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
          insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        },
      })
      return [ priorityTitleParagraph,
          priorityTable]
  }).flat()

 

  // Create document
  const doc = new Document({
    sections: [
      {
         properties: {
        page: {
          size: {
            orientation: "landscape",
          },
        },
      },
        children: [
          headerTable,
          spacingParagraph,
          scheduleTitleParagraph,
          scheduleTable,
          ...dataWorks
        ],
      },
    ],
  })

  // Generate and save
  const blob = await Packer.toBlob(doc)
  downloadBlob(blob, `Bao-cao-${data.weekInfo.replace(/\s+/g, "-")}.docx`)
}
