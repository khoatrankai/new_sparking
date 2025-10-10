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

// import path from "path";
// import fs from "fs";
interface ExportData {
  date: { day: string; date: string; month: string; year: string }
  name: string
  position: string
  department: string
  workItems: Array<{ id: number; name: string; description: string }>
  notes: string
}

const getImageBuffer = async(imagePath: string) => {
  const res = await fetch("/logo1.png"); // ảnh trong thư mục public
  return await res.arrayBuffer();
};
export async function exportToWord(data: ExportData) {
    const imageBuffer = getImageBuffer("logo1.png");
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
            orientation: PageOrientation.LANDSCAPE
            },
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Header Table
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
                        children: [new TextRun({ text: "BÁO CÁO KẾT QUẢ CÔNG VIỆC NGÀY", bold: true, size: 26 })],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "S Parking – 202509D1", size: 20 })],
                        alignment: AlignmentType.RIGHT,
                      }),
                    ],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
            ],
          }),

          // Date line
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.date.date || "....."} ngày ${data.date.day || "....."} tháng ${data.date.month || "....."} năm ${data.date.year || "......"}`,
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
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `Họ và tên: ${data.name}`, size: 22 }),
                        ],
                      }),
                    ],
                    width: { size: 33, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `Chức vụ: ${data.position}`, size: 22 }),
                        ],
                      }),
                    ],
                    width: { size: 33, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `Bộ phận công tác: ${data.department}`, size: 22 }),
                        ],
                      }),
                    ],
                    width: { size: 34, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // Table of work items
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
                    children: [new Paragraph({ children: [new TextRun({ text: "Nội dung công việc", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Chi tiết công việc", bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
              // Work item rows (max 5)
              ...data.workItems.map((item, idx) => {
                // const item = data.workItems[idx] || { id: idx + 1, content: "", details: "" }
                return new TableRow({
                  height: { value: 800, rule: "atLeast" },
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: String(idx+1), alignment: AlignmentType.CENTER })],
                      verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: item.name })],
                      verticalAlign: VerticalAlign.TOP,
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: item.description })],
                      verticalAlign: VerticalAlign.TOP,
                    }),
                  ],
                })
              }),
            ],
          }),

          // Notes
          new Paragraph({
            children: [new TextRun({ text: `Khó khăn, vướng mắc, góp ý: ${data.notes}`, italics: true, size: 22 })],
            spacing: { before: 300 },
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)

  // Tạo và tải xuống file
  const fileName = `bao-cao-cong-viec-${data.date.date || "dd"}-${data.date.month || "mm"}-${data.date.year || "yyyy"}.docx`
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
