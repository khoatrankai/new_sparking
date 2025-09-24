"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info, CheckCircle, Search, Filter, Bell, X, Eye } from "lucide-react"

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const alerts = [
    {
      id: 1,
      type: "error",
      title: "Vượt ngân sách dự án",
      message: 'Dự án "Bảo trì hệ thống" đã vượt ngân sách 5%',
      time: "2 phút trước",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "warning",
      title: "Deadline sắp đến",
      message: 'Nhiệm vụ "Thiết kế giao diện" sẽ đến hạn trong 2 ngày',
      time: "15 phút trước",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "Cập nhật hệ thống",
      message: "Hệ thống sẽ được bảo trì vào 2:00 AM ngày mai",
      time: "1 giờ trước",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "success",
      title: "Hoàn thành nhiệm vụ",
      message: 'Nhiệm vụ "Kiểm thử tính năng đăng nhập" đã hoàn thành',
      time: "2 giờ trước",
      read: true,
      priority: "low",
    },
    {
      id: 5,
      type: "warning",
      title: "Tài nguyên thiếu hụt",
      message: "Server đang sử dụng 85% CPU, cần kiểm tra",
      time: "3 giờ trước",
      read: false,
      priority: "high",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "border-l-red-500 bg-red-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      case "success":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Cao</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Thấp</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Bình thường</Badge>
    }
  }

  const unreadCount = alerts.filter((alert) => !alert.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Cảnh báo
              {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
            </h1>
            <p className="text-gray-600">Theo dõi thông báo và cảnh báo hệ thống</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Đánh dấu tất cả đã đọc</Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Bell className="w-4 h-4 mr-2" />
              Cài đặt thông báo
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm cảnh báo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                Tất cả
              </Button>
              <Button
                variant={selectedFilter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("unread")}
              >
                Chưa đọc
              </Button>
              <Button
                variant={selectedFilter === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("high")}
              >
                Ưu tiên cao
              </Button>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lỗi nghiêm trọng</p>
                  <p className="text-xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-yellow-100">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cảnh báo</p>
                  <p className="text-xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thông tin</p>
                  <p className="text-xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thành công</p>
                  <p className="text-xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách cảnh báo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border-l-4 rounded-lg ${getAlertColor(alert.type)} ${
                    !alert.read ? "border-2 border-teal-200" : "border border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${!alert.read ? "text-gray-900" : "text-gray-700"}`}>
                            {alert.title}
                          </h3>
                          {getPriorityBadge(alert.priority)}
                          {!alert.read && <div className="w-2 h-2 bg-teal-500 rounded-full"></div>}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
