import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
  TextRun,
  ImageRun,
  VerticalAlign,
  BorderStyle,
  PageOrientation
} from "docx"

interface ExportData {
  week: string
  month: string
  year: string
  name: string
  position: string
  department: string
  workItems: Array<{
    id: number
    name: string
    time: string
    completed: string
    uncompleted: string
    solution: string
  }>,
  notes: string
}

const getImageBuffer = async (imagePath: string) => {
  const res = await fetch("/logo1.png")
  return await res.arrayBuffer()
}

export async function exportToWordWeek(data: ExportData) {
  const imageBuffer = await getImageBuffer("logo1.png")

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.LANDSCAPE },
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: [
          // Header
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
            rows: [
              new TableRow({
                children: [
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
                      }),
                    ],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "BÁO CÁO KẾT QUẢ CÔNG VIỆC TUẦN", bold: true, size: 28 })],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "S Parking – 202509W1", size: 20 })],
                        alignment: AlignmentType.RIGHT,
                      }),
                    ],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
          }),

          // Date line
          new Paragraph({
            children: [
              new TextRun({
                text: `Tuần: ${data.week || "____"} Tháng ${data.month || "____"} Năm ${data.year || "____"}`,
                size: 22,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 300 },
          }),

          // Info Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(`Họ và tên: ${data.name}`)], width: { size: 33, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph(`Chức vụ: ${data.position}`)], width: { size: 33, type: WidthType.PERCENTAGE } }),
                  new TableCell({ children: [new Paragraph(`Bộ phận công tác: ${data.department}`)], width: { size: 34, type: WidthType.PERCENTAGE } }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // Work table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 15, color: "000000" },
              bottom: { style: BorderStyle.SINGLE, size: 15, color: "000000" },
              left: { style: BorderStyle.SINGLE, size: 15, color: "000000" },
              right: { style: BorderStyle.SINGLE, size: 15, color: "000000" },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 15, color: "000000" },
              insideVertical: { style: BorderStyle.SINGLE, size: 15, color: "000000" },
            },
            rows: [
              // Header row
              new TableRow({
                children: [
                  new TableCell({ 
                     children: [new Paragraph({ children: [new TextRun({ text: "TT", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                }),
                  new TableCell({ 
                     children: [new Paragraph({ children: [new TextRun({ text: "Tên công việc", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                }),
                  new TableCell({ 
                     children: [new Paragraph({ children: [new TextRun({ text: "Thời gian làm việc", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                }),
                  new TableCell({ 
                    children: [new Paragraph({ children: [new TextRun({ text: "Kết quả làm được", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({ 
                     children: [new Paragraph({ children: [new TextRun({ text: "Chưa làm được", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({ 
                     children: [new Paragraph({ children: [new TextRun({ text: "Hướng giải quyết", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                                        width: { size: 10, type: WidthType.PERCENTAGE },
                                        verticalAlign: VerticalAlign.CENTER,
                }),
                ],
              }),
              ...data.workItems.map((item, idx) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(String(idx + 1))] }),
                    new TableCell({ children: [new Paragraph(item.name)] }),
                    new TableCell({ children: [new Paragraph(item.time)] }),
                    new TableCell({ children: [new Paragraph(item.completed)] }),
                    new TableCell({ children: [new Paragraph(item.uncompleted)] }),
                    new TableCell({ children: [new Paragraph(item.solution)] }),
                  ],
                })
              ),
            ],
          }),

          new Paragraph({
  children: [
    new TextRun({
      text: `Ghi chú: ${data.notes}`,
      italics: true,
      size: 22,
    })
  ],
}),
new Paragraph({
  children: [
    new TextRun({
      text: "\tNgười báo cáo (Ký tên)",
      size: 22,
      bold:true
    }),
  ],
  tabStops: [
    {
      type: AlignmentType.RIGHT,
      position: 15000, // vị trí tab tính theo đơn vị twentieths of a point (~6.25 inch)
    },
  ],
  spacing: { before: 300 },
}),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const fileName = `bao-cao-tuan-${data.week || "W"}-${data.month || "mm"}-${data.year || "yyyy"}.docx`
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
