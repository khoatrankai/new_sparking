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
  notes:string
}

export async function exportToExcelWeek(data: ExportData) {
  const XLSX = await import("xlsx")
  const wb = XLSX.utils.book_new()

  const excelData: any[][] = [
    ["SPARKING", "", "BÁO CÁO KẾT QUẢ CÔNG VIỆC TUẦN", "", "S Parking – 202509W1"],
    ["SMART SECURITY & PARKING", "", `Tuần: ${data.week} Tháng ${data.month} Năm ${data.year}`, "", ""],
    [],
    [`Họ và tên: ${data.name}`, "", `Chức vụ: ${data.position}`, "", `Bộ phận công tác: ${data.department}`],
    [],
    ["TT", "Tên công việc", "Thời gian làm việc", "Kết quả làm được", "Chưa làm được", "Hướng giải quyết"],
  ]

  data.workItems.forEach((item, index) => {
    excelData.push([
      index + 1,
      item.name,
      item.time,
      item.completed,
      item.uncompleted,
      item.solution,
    ])
  })

  excelData.push([])
  excelData.push([`Ghi chú: ${data.notes}`, "", "", "", "", "Người báo cáo (Ký tên)"])
  excelData.push([data.notes])

  const ws = XLSX.utils.aoa_to_sheet(excelData)

  ws["!cols"] = [
    { wch: 5 },   // TT
    { wch: 30 },  // Tên công việc
    { wch: 20 },  // Thời gian làm việc
    { wch: 30 },  // Kết quả làm được
    { wch: 30 },  // Chưa làm được
    { wch: 30 },  // Hướng giải quyết
  ]

  ws["!merges"] = [
    { s: { r: 0, c: 2 }, e: { r: 0, c: 3 } }, // Tiêu đề
    { s: { r: 1, c: 2 }, e: { r: 1, c: 3 } }, // Dòng thời gian
  ]

  XLSX.utils.book_append_sheet(wb, ws, "Báo cáo tuần")

  const fileName = `bao-cao-tuan-${data.week || "W"}-${data.month || "mm"}-${data.year || "yyyy"}.xlsx`
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })

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
