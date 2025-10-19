"use client"

import type { ReportData, ScheduleEntry } from "@/lib/types"
import { getDayName, formatDate, getWeekDates, getWeekInfo } from "@/lib/schedule-utils"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import Image from "next/image"
import { useRef } from "react"
import { FileText } from "lucide-react"
import { exportToWord } from "@/lib/ReportSchedule/export-word"
import { ReportPreviewPDF } from "./ReportWork/report-preview"
// import { Image } from "lucide-react"

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

const XIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface ExportPreviewProps {
  weekStart: string
  reportData: ReportData
  refBtnExportPDF?:any
  onClose: () => void
}

export function ReportPreview({ weekStart, reportData,refBtnExportPDF, onClose }: ExportPreviewProps) {
  
   const { datas: dataUsers } = useSelector(
          (state: RootState) => state.get_users
        );
         const { datas: dataProjects } = useSelector(
              (state: RootState) => state.get_projects
            );
  const handlePrint = () => {
    refBtnExportPDF.current.click()
  }

  const handleExportWord = async () => {
    try {
      const formattedTags = reportData.tags.map((tag) => ({
  ...tag,
  works: tag.works.map((work) => {
    const projectName =
      dataProjects?.find((proj) => proj.project_id === work.project)?.name ?? "";

    const userNames = work.list_user?.map((userId) => {
      const user = dataUsers?.find((u) => u.user_id === userId);
      return user ? `${user.first_name} ${user.last_name}` : "";
    }) ?? [];

    return {
      ...work,
      project: projectName,
      list_user: userNames, // <-- vẫn giữ kiểu string[]
    };
  }),
}));
      await exportToWord({
  ...reportData,
  tags: formattedTags,
});
     
    } catch (error) {
      console.error("[v0] Error exporting to Word:", error)
      
    } finally {
     
    }
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto print:hidden">
      <div className="print:hidden sticky top-0 bg-background border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Xem trước xuất file</h2>
        <div className="flex gap-2">
          <Button
                onClick={handleExportWord}
                className="gap-2 bg-transparent"
                variant="outline"
              >
                <FileText className="h-4 w-4" />
                {"Xuất Word"}
              </Button>
          <Button onClick={handlePrint}>
            <DownloadIcon />
            <span className="ml-2">In / Lưu PDF</span>
          </Button>
          <Button variant="outline" onClick={onClose}>
            <XIcon />
            <span className="ml-2">Đóng</span>
          </Button>
        </div>
      </div>

      <ReportPreviewPDF data={reportData}/>
    </div>
  )
}
