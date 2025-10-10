interface ExportData {
  date: { day: string; date: string; month: string; year: string }
  name: string
  position: string
  department: string
  workItems: Array<{ id: number; name: string; description: string }>
  notes: string
}

export async function exportToExcel(data: ExportData) {
  // Dynamic import to avoid SSR issues
  const XLSX = await import("xlsx")

  // Create workbook
  const wb = XLSX.utils.book_new()

  // Prepare data for Excel
  const excelData: any[][] = [
    ["SPARKING", "", "BÁO CÁO KẾT QUẢ CÔNG VIỆC NGÀY", "", "S Parking – 202509D1"],
    [
      "SMART SECURITY & PARKING",
      "",
      `${data.date.date} ngày ${data.date.day} tháng ${data.date.month} năm ${data.date.year}`,
      "",
      "",
    ],
    [],
    [`Họ và tên: ${data.name}`, "", `Chức vụ: ${data.position}`, "", `Bộ phận công tác: ${data.department}`],
    [],
    ["TT", "Nội dung công việc", "Chi tiết công việc"],
  ]

  // Add work items
  data.workItems.forEach((item,index) => {
    excelData.push([index+1, item.name, item.description])
  })

  // Add notes
  excelData.push([])
  excelData.push(["Khó khăn, vướng mắc, góp ý:"])
  excelData.push([data.notes])

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(excelData)

  // Set column widths
  ws["!cols"] = [
    { wch: 5 }, // TT
    { wch: 40 }, // Nội dung công việc
    { wch: 50 }, // Chi tiết công việc
  ]

  // Merge cells for header
  ws["!merges"] = [
    { s: { r: 0, c: 2 }, e: { r: 0, c: 3 } }, // Title
    { s: { r: 1, c: 2 }, e: { r: 1, c: 3 } }, // Date
  ]

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Báo cáo công việc")

  const fileName = `bao-cao-cong-viec-${data.date.date || "dd"}-${data.date.month || "mm"}-${data.date.year || "yyyy"}.xlsx`

  // Generate Excel file as array buffer
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })

  // Create blob and download
  const blob = new Blob([wbout], { type: "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
