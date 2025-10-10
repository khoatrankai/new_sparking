import '@/utils/assets/fonts/arial-normal.js';
import '@/utils/assets/fonts/arial-bold.js';
import '@/utils/assets/fonts/arial-italic.js';

interface ExportData {
  date: { day: string; date: string; month: string; year: string }
  name: string
  position: string
  department: string
  workItems: Array<{ id: number; name: string; description: string }>
  notes: string
}

export async function exportToPDF(data: ExportData) {
  const jsPDF = (await import("jspdf")).default

  const doc = new jsPDF("p", "mm", "a4")
  doc.setFont('arial',  "bold")
  const pageWidth = 210
  const margin = 15
  let yPos = 20

  const addText = (text: string, x: number, y: number, options?: any) => {
    doc.text(text, x, y, options)
  }

  // Logo
  const res = await fetch("/logo1.png");
  const buffer = await res.arrayBuffer();
  const base64Logo = btoa(
    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  doc.addImage(base64Logo, "PNG", margin, yPos - 5, 40, 15);

  // Tiêu đề
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont("arial", "bold")
  addText("BÁO CÁO KẾT QUẢ CÔNG VIỆC NGÀY", pageWidth / 2, yPos, { align: "center" })

  // Mã tài liệu
  doc.setFontSize(10)
  doc.setFont("arial", "normal")
  addText("S Parking - 202509D1", pageWidth - margin, yPos, { align: "right" })

  yPos += 8

  // Ngày tháng
  const dateStr = `${data.date.date || "..."} ngày ${data.date.day || "..."} tháng ${data.date.month || "..."} năm ${data.date.year || "..."}`
  addText(dateStr, pageWidth / 2, yPos, { align: "center" })

  yPos += 10

  // Thông tin cá nhân
  doc.setFontSize(10)
  doc.setFont("arial", "bold")
  addText("Họ và tên:", margin, yPos)
  doc.setFont("arial", "normal")
  addText(data.name || "", margin + 25, yPos)

  addText("Chức vụ:", margin + 80, yPos)
  addText(data.position || "", margin + 105, yPos)

  addText("Bộ phận công tác:", margin + 135, yPos)
  addText(data.department || "", margin + 170, yPos)

  yPos += 10

  // Bảng nội dung công việc
  const col1Width = 15
  const col2Width = 80
  const col3Width = pageWidth - margin * 2 - col1Width - col2Width
  const rowHeight = 25

  doc.setFillColor(255, 255, 255)
  doc.rect(margin, yPos, col1Width, 10, "FD")
  doc.rect(margin + col1Width, yPos, col2Width, 10, "FD")
  doc.rect(margin + col1Width + col2Width, yPos, col3Width, 10, "FD")

  doc.setFont("arial", "bold")
  doc.setFontSize(10)
  addText("TT", margin + col1Width / 2, yPos + 7, { align: "center" })
  addText("Nội dung công việc", margin + col1Width + col2Width / 2, yPos + 7, { align: "center" })
  addText("Chi tiết công việc", margin + col1Width + col2Width + col3Width / 2, yPos + 7, { align: "center" })

  yPos += 10

  doc.setFont("arial", "normal")
  doc.setFontSize(9)

  data.workItems.forEach((item, index) => {
    doc.rect(margin, yPos, col1Width, rowHeight)
    doc.rect(margin + col1Width, yPos, col2Width, rowHeight)
    doc.rect(margin + col1Width + col2Width, yPos, col3Width, rowHeight)

    addText((index + 1).toString(), margin + col1Width / 2, yPos + 7, { align: "center" })

    const contentLines = doc.splitTextToSize(item.name || "", col2Width - 4)
    const detailLines = doc.splitTextToSize(item.description || "", col3Width - 4)

    contentLines.forEach((line: string, i: number) => {
      addText(line, margin + col1Width + 2, yPos + 7 + i * 5)
    })

    detailLines.forEach((line: string, i: number) => {
      addText(line, margin + col1Width + col2Width + 2, yPos + 7 + i * 5)
    })

    yPos += rowHeight
  })

  yPos += 5

  // Ghi chú
  doc.setFont("arial", "italic")
  doc.setFontSize(9)
  addText("Khó khăn, vướng mắc, góp ý:", margin, yPos)

  yPos += 5

  doc.setFont("arial", "normal")
  const notesLines = doc.splitTextToSize(data.notes || "", pageWidth - margin * 2)
  notesLines.forEach((line: string, i: number) => {
    addText(line, margin, yPos + i * 5)
  })

  // Lưu file
  const fileName = `bao-cao-cong-viec-${data.date.date || "dd"}-${data.date.month || "mm"}-${data.date.year || "yyyy"}.pdf`
  doc.save(fileName)
}
