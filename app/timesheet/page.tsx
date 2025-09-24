"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Plus, Clock, Calendar, Play, Pause, Square } from "lucide-react"
// import DashboardLayout from "@/components/shared/dashboard-layout"

export default function TimesheetPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00:00")

  const timesheetEntries = [
    {
      id: 1,
      task: "Phát triển tính năng đăng nhập",
      project: "Hệ thống quản lý bãi đỗ xe",
      date: "25/01/2024",
      startTime: "09:00",
      endTime: "12:30",
      duration: "3h 30m",
      status: "Hoàn thành",
    },
    {
      id: 2,
      task: "Thiết kế giao diện dashboard",
      project: "Ứng dụng mobile",
      date: "25/01/2024",
      startTime: "13:30",
      endTime: "17:00",
      duration: "3h 30m",
      status: "Hoàn thành",
    },
    {
      id: 3,
      task: "Kiểm thử tính năng thanh toán",
      project: "Hệ thống bảo mật",
      date: "24/01/2024",
      startTime: "10:00",
      endTime: "16:00",
      duration: "6h 00m",
      status: "Hoàn thành",
    },
  ]

  const toggleTracking = () => {
    setIsTracking(!isTracking)
  }

  return (
    // <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Time Sheet</h1>
              <p className="text-gray-600">Theo dõi thời gian làm việc</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm bản ghi
            </Button>
          </div>
        </div>

        {/* Time Tracker */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Theo dõi thời gian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-mono font-bold text-teal-600">{currentTime}</div>
                <div className="text-sm text-gray-600">
                  <p>Nhiệm vụ hiện tại</p>
                  <p className="font-medium">Phát triển tính năng mới</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={isTracking ? "destructive" : "default"}
                  onClick={toggleTracking}
                  className={isTracking ? "" : "bg-green-600 hover:bg-green-700"}
                >
                  {isTracking ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Dừng
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Bắt đầu
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Tạm dừng
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm bản ghi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Chọn ngày
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Timesheet Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bản ghi thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Nhiệm vụ</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Dự án</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Ngày</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Thời gian</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Tổng thời gian</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {timesheetEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{entry.task}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{entry.project}</td>
                      <td className="py-3 px-4 text-gray-600">{entry.date}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {entry.startTime} - {entry.endTime}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-teal-600">{entry.duration}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">{entry.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    // </DashboardLayout>
  )
}
