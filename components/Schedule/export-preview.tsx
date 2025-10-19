"use client"

import type { ScheduleEntry } from "@/lib/types"
import { getDayName, formatDate, getWeekDates, getWeekInfo } from "@/lib/schedule-utils"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import Image from "next/image"
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
  schedules: ScheduleEntry[]
  refBtnExportPDF?:any
  onClose: () => void
}

export function ExportPreview({ weekStart, schedules, onClose,refBtnExportPDF }: ExportPreviewProps) {
  const { datas: dataUsers } = useSelector(
          (state: RootState) => state.get_users
        );
        const { datas: dataGroups } = useSelector(
          (state: RootState) => state.get_group_user
        );
  const weekDates = getWeekDates(weekStart)
  const weekInfo = getWeekInfo(new Date(weekStart))

  const getSchedulesForDay = (dayIndex: number, period: "morning" | "afternoon") => {
    return schedules
      .filter((s) => {
        if (s.day !== dayIndex) return false
        const hour = Number.parseInt(s.time.split(":")[0])
        if (period === "morning") {
          return hour < 12
        } else {
          return hour >= 12
        }
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  const handlePrint = () => {
    refBtnExportPDF?.current?.click()
  }

  return (
    // <div className="fixed inset-0 bg-background z-50 overflow-auto">
    <>
       <div className="print:hidden sticky top-0 bg-background border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Xem trước xuất file</h2>
        <div className="flex gap-2">
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

      <div className="max-w-[1200px] mx-auto p-8 bg-white print:p-0" id="export-content">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 print:mb-4">
          <div className="flex items-center gap-2">
            {/* <div className="text-2xl font-bold">
              <span className="text-[#FF8C00]">S</span>
              <span className="text-[#00A9A5]">PARKING</span>
            </div> */}
            <Image width={195} height={57} src={'/logo1.png'} alt=""/>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold uppercase">Kế hoạch công tác tuần</h1>
            <p className="text-sm mt-1">
              Tuần {weekInfo.weekNumber} Tháng {weekInfo.month} Năm {weekInfo.year}
            </p>
          </div>
          <div className="text-sm text-right">
            S Parking – {weekInfo.year}
            {String(weekInfo.month).padStart(2, "0")}W{weekInfo.weekNumber}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg font-bold uppercase border-t-2 border-b-2 border-black py-1">Lịch làm việc tuần</h2>
        </div>

        {/* Schedule Table */}
        <table className="w-full border-collapse border-2 border-black text-sm">
          <thead>
            <tr>
              {weekDates.map((date, index) => (
                <th
                  key={index}
                  className="border border-black p-2 bg-gray-100 font-bold text-center"
                  style={{ width: "14.28%" }}
                >
                  <div>{getDayName(index)}</div>
                  <div className="text-xs font-normal mt-1">{formatDate(date)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="border border-black p-1 bg-gray-200 text-center font-bold text-xs">
                BUỔI SÁNG
              </td>
            </tr>
            <tr>
              {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const daySchedules = getSchedulesForDay(dayIndex, "morning")
                return (
                  <td key={dayIndex} className="border border-black p-2 align-top" style={{ minHeight: "150px" }}>
                    <div className="space-y-3">
                      {daySchedules.map((schedule) => (
                        <div key={schedule.id} className="text-xs leading-relaxed">
                          <div className="font-bold mb-1">{schedule.time.substring(0, 5)}</div>
                          <div className="whitespace-pre-wrap italic" style={{ lineHeight: "1.4" }}>
                            {schedule.description}
                          </div>
                          {schedule.type === "individual" && schedule.assigned_to && (
                            <div className="mt-1 text-gray-600">({dataUsers?.find(dt=>dt.user_id === schedule.assigned_to)?.last_name})</div>
                          )}
                          {schedule.type === "group" && schedule.group_name && (
                            <div className="mt-1 text-gray-600">(Nhóm: {dataGroups?.find(dt=>dt.group_id === schedule.group_name)?.name_group})</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                )
              })}
            </tr>
            <tr>
              <td colSpan={7} className="border border-black p-1 bg-gray-200 text-center font-bold text-xs">
                BUỔI CHIỀU
              </td>
            </tr>
            <tr>
              {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const daySchedules = getSchedulesForDay(dayIndex, "afternoon")
                return (
                  <td key={dayIndex} className="border border-black p-2 align-top" style={{ minHeight: "150px" }}>
                    <div className="space-y-3">
                      {daySchedules.map((schedule) => (
                        <div key={schedule.id} className="text-xs leading-relaxed">
                          <div className="font-bold mb-1">{schedule.time.substring(0, 5)}</div>
                          <div className="whitespace-pre-wrap italic" style={{ lineHeight: "1.4" }}>
                            {schedule.description}
                          </div>
                          {schedule.type === "individual" && schedule.assigned_to && (
                            <div className="mt-1 text-gray-600">({dataUsers?.find(dt=>dt.user_id === schedule.assigned_to)?.last_name})</div>
                          )}
                          {schedule.type === "group" && schedule.group_name && (
                            <div className="mt-1 text-gray-600">(Nhóm: {dataGroups?.find(dt=>dt.group_id === schedule.group_name)?.name_group})</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !import;
          }
          #export-content,
          #export-content * {
            visibility: visible;
          }
          #export-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: landscape;
            margin: 1cm;
          }
           
        }
      `}</style>
    </>
     
    // </div>
  )
}
