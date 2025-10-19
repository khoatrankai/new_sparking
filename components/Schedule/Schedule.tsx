"use client"

import { useState, useEffect, use, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScheduleForm } from "./schedule-form"
import { ScheduleTable } from "./schedule-table"
import { ExportPreview } from "./export-preview"
import type { ScheduleEntry } from "@/lib/types"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import activityService from "@/services/activityService"
import { ReportPreview } from "./report-preview"
import { Modal } from "antd/lib"
import { ReportPreviewPDF } from "./ReportWork/report-preview"
import { ExportPreviewPDF } from "./ReportWork/export-preview"
// import { addSchedule, updateSchedule, deleteSchedule, getSchedulesByWeek } from "@/lib/storage"
import { getDayName, formatDate, getWeekDates, getWeekInfo } from "@/lib/schedule-utils"
const PlusIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const FileDownIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

export default function Schedule() {
   const { datas: dataUsers } = useSelector(
      (state: RootState) => state.get_users
    );
    const { datas: dataGroups } = useSelector(
      (state: RootState) => state.get_group_user
    );
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
  const [currentDate, setCurrentDate] = useState(new Date())
  const [weekStart, setWeekStart] = useState("")
  const [dataTagsWork,setDataTagsWork] = useState<any>([])
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([])
  const [filterType, setFilterType] = useState<"default" | "individual" | "group" | "all">("default")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<ScheduleEntry | null>(null)
  const [showExport, setShowExport] = useState(false)
  const [showExportWork, setShowExportWork] = useState(false)
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const [selectedWeekDate, setSelectedWeekDate] = useState("")
const refBtnExportPDF = useRef<any>(null)
const refBtnExportSchedule = useRef<any>(null)
  useEffect(() => {
    const weekInfo = getWeekInfo(currentDate)
    setWeekStart(weekInfo.weekStart)
  }, [currentDate])

  useEffect(() => {
    if (weekStart) {
      // const timestamp = new Date(weekStart).getTime();
      fetchData()
      // const weekSchedules = getSchedulesByWeek(weekStart)
      // setSchedules(weekSchedules)
    }
  }, [weekStart,selectedGroup,selectedUser,filterType])

  useEffect(() => {
    if (weekStart) {
      fetchDataTagWork()
    }
  }, [weekStart,selectedUser,filterType])

  useEffect(() => {
    setSelectedWeekDate(formatDateForInput(currentDate))
  }, [currentDate])


  const fetchData = async()=>{
    const timestamp = new Date(weekStart).getTime();
    const res = await activityService.getAllScheduleFilter({week_start:timestamp.toString(),assigned_to:selectedUser === "all"?undefined:selectedUser,group_name:selectedGroup === "all"?undefined:selectedGroup,type:filterType === "default"?undefined:filterType})
    if(res?.statusCode === 200){
      setSchedules(res?.data)
    }
  }
  const fetchDataTagWork = async()=>{
    const timestamp = new Date(weekStart).getTime();
    const res = await activityService.getWorkTagFilter({type:filterType === "individual"?"user":"all",user:selectedUser,week_start:timestamp.toString()})
    if(res?.statusCode === 200){
      setDataTagsWork(res?.data)
    }
  }

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleSelectWeek = () => {
    if (selectedWeekDate) {
      const date = new Date(selectedWeekDate)
      setCurrentDate(date)
      setShowWeekPicker(false)
    }
  }

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const handleAddSchedule = async(entry: Omit<ScheduleEntry, "id">) => {
    const newSchedule: ScheduleEntry = {
      ...entry
    }
    // addSchedule(newSchedule)
    const res = await activityService.createSchedule(newSchedule)
    if(res?.statusCode === 201){
      fetchData()
    }
    // setSchedules(getSchedulesByWeek(weekStart))
    setIsFormOpen(false)
  }

  const handleUpdateSchedule = async(entry: Omit<ScheduleEntry, "id">) => {
    if (editingSchedule) {
      // updateSchedule(editingSchedule.id, entry)
      // setSchedules(getSchedulesByWeek(weekStart))
       const res = await activityService.updateSchedule((editingSchedule.id??""),entry)
      if(res?.statusCode === 200){
        fetchData()
      }
      setEditingSchedule(null)
      setIsFormOpen(false)
    }
  }

  const handleDeleteSchedule = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa lịch trình này?")) {
      // deleteSchedule(id)
      // setSchedules(getSchedulesByWeek(weekStart))-
    }
  }

  const handleEdit = (schedule: ScheduleEntry) => {
    setEditingSchedule(schedule)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingSchedule(null)
  }

  const handleFilterTypeChange = (type: "all" | "individual" | "group" | "default") => {
    setFilterType(type)
    if (type !== "individual") setSelectedUser("all")
    if (type !== "group") setSelectedGroup("all")
  }


  // const uniqueUsers = Array.from(
  //   new Set(schedules.filter((s) => s.type === "individual" && s.assigned_to).map((s) => s.assigned_to)),
  // ).filter(Boolean) as string[]

  // const uniqueGroups = Array.from(
  //   new Set(schedules.filter((s) => s.type === "group" && s.group_name).map((s) => s.group_name)),
  // ).filter(Boolean) as string[]

  // const filteredSchedules = schedules.filter((schedule) => {
  //   if (filterType === "all") return true
  //   if (filterType === "individual") {
  //     if (selectedUser === "all") return schedule.type === "individual"
  //     return schedule.type === "individual" && schedule.assigned_to === selectedUser
  //   }
  //   if (filterType === "group") {
  //     if (selectedGroup === "all") return schedule.type === "group"
  //     return schedule.type === "group" && schedule.group_name === selectedGroup
  //   }
  //   return schedule.type === filterType
  // })

  const weekInfo = getWeekInfo(currentDate)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <span className=" text-foreground">Quản lý lịch trình</span>
              </h1>
              <p className="text-muted-foreground">Tạo, cập nhật và xuất lịch làm việc hàng tuần</p>
            </div>
            <div className="flex gap-2 items-center">
              <Button onClick={() => setShowExportWork(true)} size="lg" variant="outline">
              <FileDownIcon />
              <span className="ml-2">Xuất báo cáo</span>
            </Button>
            <Button onClick={() => setShowExport(true)} size="lg" variant="outline">
              <FileDownIcon />
              <span className="ml-2">Xuất file</span>
            </Button>
            </div>
            
          </div>
        </div>

        {/* Week Navigation */}
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePreviousWeek}>
              <ChevronLeftIcon />
              <span className="ml-2">Tuần trước</span>
            </Button>

            <div className="text-center">
              <div className="text-lg font-semibold">
                Tuần {weekInfo.weekNumber} - Tháng {weekInfo.month}/{weekInfo.year}
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <Button variant="ghost" size="sm" onClick={handleToday}>
                  <CalendarIcon />
                  <span className="ml-2">Hôm nay</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowWeekPicker(true)}>
                  <CalendarIcon />
                  <span className="ml-2">Chọn tuần</span>
                </Button>
              </div>
            </div>

            <Button variant="outline" onClick={handleNextWeek}>
              <span className="mr-2">Tuần sau</span>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Lọc theo loại:</span>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "default" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterTypeChange("default")}
                >
                  Tất cả
                </Button>
                <Button
                  variant={filterType === "individual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterTypeChange("individual")}
                >
                  Cá nhân
                </Button>
                <Button
                  variant={filterType === "group" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterTypeChange("group")}
                >
                  Nhóm
                </Button>
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterTypeChange("all")}
                >
                  Tất cả mọi người
                </Button>
              </div>

              {filterType === "individual" && (dataUsers ?? [])?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="filter-user" className="text-sm font-medium whitespace-nowrap">
                    Chọn người:
                  </Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger id="filter-user" className="w-[200px]">
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      {dataUsers?.map((user) => (
                        <SelectItem key={user.user_id} value={user.user_id}>
                          {user.first_name} {user.last_name} ({user?.group_user?.name_group})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {filterType === "group" && dataGroups?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="filter-group" className="text-sm font-medium whitespace-nowrap">
                    Chọn nhóm:
                  </Label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger id="filter-group" className="w-[200px]">
                      <SelectValue placeholder="Tất cả" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      {dataGroups.map((group) => (
                        <SelectItem key={group.group_id} value={group.group_id}>
                          {group.name_group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="ml-auto text-sm text-muted-foreground">
                Hiển thị {schedules.length} / {schedules.length} lịch trình
              </div>
            </div>
          </div>
        </div>

        {/* Add Schedule Button */}
        <div className="mb-4">
          <Button onClick={() => setIsFormOpen(true)} size="lg">
            <PlusIcon />
            <span className="ml-2">Thêm lịch trình mới</span>
          </Button>
        </div>

        {/* Schedule Table */}
        <div className="bg-card border rounded-lg p-4">
          <ScheduleTable
            weekStart={weekStart}
            schedules={schedules}
            onEdit={handleEdit}
            onDelete={handleDeleteSchedule}
          />
        </div>

        {/* Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingSchedule ? "Cập nhật lịch trình" : "Thêm lịch trình mới"}</DialogTitle>
            </DialogHeader>
            <ScheduleForm
              weekStart={weekStart}
              onSubmit={editingSchedule ? handleUpdateSchedule : handleAddSchedule}
              onCancel={handleCloseForm}
              initialData={editingSchedule || undefined}
              // existingUsers={[]}
              // existingGroups={[]}
            />
          </DialogContent>
        </Dialog>

        {/* Week Picker Dialog */}
        <Dialog open={showWeekPicker} onOpenChange={setShowWeekPicker}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chọn tuần</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="week-date">Chọn ngày trong tuần</Label>
                <Input
                  id="week-date"
                  type="date"
                  value={selectedWeekDate}
                  onChange={(e) => setSelectedWeekDate(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">Chọn bất kỳ ngày nào trong tuần bạn muốn xem</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowWeekPicker(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSelectWeek}>Xác nhận</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Export Preview */}
        {/* {showExport && (
          <ExportPreview weekStart={weekStart} schedules={schedules} onClose={() => setShowExport(false)} />
        )} */}
        {/* {showExportWork && ( */}
          <Modal
    open={showExport}
    closable={false}
    // onCancel={() => setShowExportWork(false)}
    // footer={null}
    width="100%" // Hoặc 1200, hoặc theo ý muốn
    style={{ top: 20 }}
    bodyStyle={{ padding: 0 }} // Xoá padding mặc định của Modal
    centered
  >
    <ExportPreview weekStart={weekStart} schedules={schedules} onClose={() => setShowExport(false)} refBtnExportPDF={refBtnExportSchedule}/>
  </Modal>

{/* {showExportWork && ( */}
         <Modal
    open={showExportWork}
    closable={false}
    // onCancel={() => setShowExportWork(false)}
    // footer={null}
    width="100%" // Hoặc 1200, hoặc theo ý muốn
    style={{ top: 20 }}
    bodyStyle={{ padding: 0 }} // Xoá padding mặc định của Modal
    centered
  >
    <ReportPreview  refBtnExportPDF={refBtnExportPDF} weekStart={weekStart} reportData={
      {
  weekInfo: `Tuần ${getWeekInfo(new Date(weekStart)).weekNumber} tháng ${getWeekInfo(new Date(weekStart)).month} năm ${getWeekInfo(new Date(weekStart)).year}`,
  companyCode: `${getWeekInfo(new Date(weekStart)).year}${String(getWeekInfo(new Date(weekStart)).month).padStart(2, "0")}W${getWeekInfo(new Date(weekStart)).weekNumber}`,
  schedule: {
    headers: [
      { day: "Chủ Nhật", date: formatDate(getWeekDates(weekStart)?.[0]) },
      { day: "Thứ Hai", date: formatDate(getWeekDates(weekStart)?.[1]) },
      { day: "Thứ Ba", date: formatDate(getWeekDates(weekStart)?.[2]) },
      { day: "Thứ Tư", date: formatDate(getWeekDates(weekStart)?.[3]) },
      { day: "Thứ Năm", date: formatDate(getWeekDates(weekStart)?.[4]) },
      { day: "Thứ Sáu", date: formatDate(getWeekDates(weekStart)?.[5]) },
      { day: "Thứ Bảy", date: formatDate(getWeekDates(weekStart)?.[6]) },
    ],
     timeSlots: [
      [
        `${getSchedulesForDay(0,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(1,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(2,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
       `${getSchedulesForDay(3,"morning").reduce((preV,currV)=>{
        const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(4,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(5,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(6,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
      ],
      [
         `${getSchedulesForDay(0,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(1,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(2,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
         
        },"")}`,
       `${getSchedulesForDay(3,"afternoon").reduce((preV,currV)=>{
        const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(4,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(5,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(6,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
      ],
    ],
  },
  tags:dataTagsWork,
}
} onClose={() => setShowExportWork(false)} />
  </Modal>
    
    {
      showExportWork && 
      <div className="hidden print:block">
      <ReportPreviewPDF data={
        {
  weekInfo: `Tuần ${getWeekInfo(new Date(weekStart)).weekNumber} tháng ${getWeekInfo(new Date(weekStart)).month} năm ${getWeekInfo(new Date(weekStart)).year}`,
  companyCode: `${getWeekInfo(new Date(weekStart)).year}${String(getWeekInfo(new Date(weekStart)).month).padStart(2, "0")}W${getWeekInfo(new Date(weekStart)).weekNumber}`,
  schedule: {
    headers: [
      { day: "Chủ Nhật", date: formatDate(getWeekDates(weekStart)?.[0]) },
      { day: "Thứ Hai", date: formatDate(getWeekDates(weekStart)?.[1]) },
      { day: "Thứ Ba", date: formatDate(getWeekDates(weekStart)?.[2]) },
      { day: "Thứ Tư", date: formatDate(getWeekDates(weekStart)?.[3]) },
      { day: "Thứ Năm", date: formatDate(getWeekDates(weekStart)?.[4]) },
      { day: "Thứ Sáu", date: formatDate(getWeekDates(weekStart)?.[5]) },
      { day: "Thứ Bảy", date: formatDate(getWeekDates(weekStart)?.[6]) },
    ],
    timeSlots: [
      [
        `${getSchedulesForDay(0,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(1,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(2,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
       `${getSchedulesForDay(3,"morning").reduce((preV,currV)=>{
        const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(4,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(5,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(6,"morning").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
      ],
      [
         `${getSchedulesForDay(0,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(1,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(2,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
         
        },"")}`,
       `${getSchedulesForDay(3,"afternoon").reduce((preV,currV)=>{
        const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(4,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(5,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
        `${getSchedulesForDay(6,"afternoon").reduce((preV,currV)=>{
          const [hours, minutes] = currV.time.split(":");
          if(preV === ""){

            return preV +`${hours}:${minutes}`+" "+currV.description
          }
          return preV + "\n\n"+`${hours}:${minutes}`+" "+currV.description
        },"")}`,
      ],
    ],
  },
  tags:dataTagsWork,
}
      } refBtn={refBtnExportPDF}/>

    </div>
    }

    {
      showExport && 
       <div className="hidden print:block">
        <ExportPreviewPDF  weekStart={weekStart} schedules={schedules} refBtn={refBtnExportSchedule} />

       </div>
    }


 
          
        {/* )} */}
      </div>
    </div>
  )
}
