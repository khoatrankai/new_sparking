import '@/utils/assets/fonts/arial-normal.js';
import '@/utils/assets/fonts/arial-bold.js';
import '@/utils/assets/fonts/arial-italic.js';

interface ExportData {
  week: string;
  month: string;
  year: string;
  name: string;
  position: string;
  department: string;
  workItems: Array<{
    id: number;
    name: string;
    time: string;
    completed: string;
    uncompleted: string;
    solution: string;
  }>;
  notes: string;
}

export async function exportToPDFWeek(data: ExportData) {
  const jsPDF = (await import("jspdf")).default;

  const doc = new jsPDF("l", "mm", "a4");
  const pageWidth = 297;
  const margin = 15;
  let yPos = 20;

  doc.setFont("arial", "normal");

  // Helper function to add text
  const addText = (text: string, x: number, y: number, options?: any) => {
    doc.text(text, x, y, options);
  };

  // Logo
  const res = await fetch("/logo1.png");
  const buffer = await res.arrayBuffer();
  const base64Logo = btoa(
    new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  doc.addImage(base64Logo, "PNG", margin, yPos - 5, 40, 15);

  // Tiêu đề
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("arial", "bold");
  addText("BÁO CÁO KẾT QUẢ CÔNG VIỆC TUẦN", pageWidth / 2, yPos, { align: "center" });

  // Mã tài liệu
  doc.setFontSize(10);
  doc.setFont("arial", "normal");
  addText("S Parking - 202509D1", pageWidth - margin, yPos, { align: "right" });

  yPos += 8;

  // Ngày tháng
  const dateStr = `Tuần ${data.week || "..."} tháng ${data.month || "..."} năm ${data.year || "..."}`;
  addText(dateStr, pageWidth / 2, yPos, { align: "center" });

  yPos += 10;

  // Thông tin cá nhân
  doc.setFontSize(10);
  doc.setFont("arial", "bold");
  addText("Họ và tên:", margin, yPos);
  doc.setFont("arial", "normal");
  addText(data.name || "", margin + 25, yPos);

  addText("Chức vụ:", margin + 80, yPos);
  addText(data.position || "", margin + 105, yPos);

  addText("Bộ phận công tác:", margin + 155, yPos);
  addText(data.department || "", margin + 190, yPos);

  yPos += 10;

  // Kích thước bảng
  const col1Width = 15;
  const col2Width = 50;
  const col3Width = 50;
  const col4Width = 50;
  const col5Width = 50;
  const col6Width = pageWidth - margin * 2 - col1Width - col2Width - col3Width - col4Width - col5Width;
  const rowHeight = 25;

  // Header bảng
  doc.setFillColor(255, 255, 255);
  const xPositions = [
    margin,
    margin + col1Width,
    margin + col1Width + col2Width,
    margin + col1Width + col2Width + col3Width,
    margin + col1Width + col2Width + col3Width + col4Width,
    margin + col1Width + col2Width + col3Width + col4Width + col5Width,
  ];

  doc.rect(xPositions[0], yPos, col1Width, 10, "FD");
  doc.rect(xPositions[1], yPos, col2Width, 10, "FD");
  doc.rect(xPositions[2], yPos, col3Width, 10, "FD");
  doc.rect(xPositions[3], yPos, col4Width, 10, "FD");
  doc.rect(xPositions[4], yPos, col5Width, 10, "FD");
  doc.rect(xPositions[5], yPos, col6Width, 10, "FD");

  doc.setFont("arial", "bold");
  doc.setFontSize(10);
  addText("TT", xPositions[0] + col1Width / 2, yPos + 7, { align: "center" });
  addText("Tên công việc", xPositions[1] + col2Width / 2, yPos + 7, { align: "center" });
  addText("Thời gian làm việc", xPositions[2] + col3Width / 2, yPos + 7, { align: "center" });
  addText("Kết quả đã hoàn thành", xPositions[3] + col4Width / 2, yPos + 7, { align: "center" });
  addText("Công việc chưa hoàn thành", xPositions[4] + col5Width / 2, yPos + 7, { align: "center" });
  addText("Hướng xử lý/giải quyết", xPositions[5] + col6Width / 2, yPos + 7, { align: "center" });

  yPos += 10;

  // Dòng bảng
  doc.setFont("arial", "normal");
  doc.setFontSize(9);

  data.workItems.forEach((item, index) => {
    // Draw cells
    doc.rect(xPositions[0], yPos, col1Width, rowHeight);
    doc.rect(xPositions[1], yPos, col2Width, rowHeight);
    doc.rect(xPositions[2], yPos, col3Width, rowHeight);
    doc.rect(xPositions[3], yPos, col4Width, rowHeight);
    doc.rect(xPositions[4], yPos, col5Width, rowHeight);
    doc.rect(xPositions[5], yPos, col6Width, rowHeight);

    // Add content
    addText((index + 1).toString(), xPositions[0] + col1Width / 2, yPos + 7, { align: "center" });

    const contentLines = doc.splitTextToSize(item.name || "", col2Width - 4);
    const timeLines = doc.splitTextToSize(item.time || "", col3Width - 4);
    const completedLines = doc.splitTextToSize(item.completed || "", col4Width - 4);
    const uncompletedLines = doc.splitTextToSize(item.uncompleted || "", col5Width - 4);
    const solutionLines = doc.splitTextToSize(item.solution || "", col6Width - 4);

    const lineSpacing = 5;

    contentLines.forEach((line: string, i: number) => {
      addText(line, xPositions[1] + 2, yPos + 7 + i * lineSpacing);
    });
    timeLines.forEach((line: string, i: number) => {
      addText(line, xPositions[2] + 2, yPos + 7 + i * lineSpacing);
    });
    completedLines.forEach((line: string, i: number) => {
      addText(line, xPositions[3] + 2, yPos + 7 + i * lineSpacing);
    });
    uncompletedLines.forEach((line: string, i: number) => {
      addText(line, xPositions[4] + 2, yPos + 7 + i * lineSpacing);
    });
    solutionLines.forEach((line: string, i: number) => {
      addText(line, xPositions[5] + 2, yPos + 7 + i * lineSpacing);
    });

    yPos += rowHeight;
  });

  yPos += 5;

  // Ghi chú
  doc.setFont("arial", "italic");
  doc.setFontSize(9);
  addText("Khó khăn, vướng mắc, góp ý:", margin, yPos);

  yPos += 5;

  doc.setFont("arial", "normal");
  const notesLines = doc.splitTextToSize(data.notes || "", pageWidth - margin * 2);
  notesLines.forEach((line: string, i: number) => {
    addText(line, margin, yPos + i * 5);
  });

  // Lưu file
  const fileName = `bao-cao-cong-viec-tuan.pdf`;
  doc.save(fileName);
}
