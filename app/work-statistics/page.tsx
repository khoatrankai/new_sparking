"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import DashboardLayout from "@/components/shared/dashboard-layout"
import { Search, Filter, BarChart3, PieChart, Clock, CheckCircle, XCircle, AlertCircle, Pause } from "lucide-react"

export default function WorkStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Work status data
  const workStats = [
    { label: "Công việc đang thực hiện", count: 68, percentage: 40, color: "bg-blue-500", icon: Clock },
    { label: "Công việc quá hạn", count: 12, percentage: 30, color: "bg-red-500", icon: XCircle },
    { label: "Công việc hoàn thành", count: 28, percentage: 10, color: "bg-green-500", icon: CheckCircle },
    { label: "Công việc hủy", count: 6, percentage: 0, color: "bg-purple-500", icon: XCircle },
    { label: "Công việc chờ thực hiện", count: 7, percentage: 25, color: "bg-yellow-500", icon: AlertCircle },
    { label: "Công việc chưa hoàn thành", count: 8, percentage: 30, color: "bg-teal-500", icon: Pause },
  ]

  // Pie chart data for work distribution
  const pieChartData = [
    { name: "Đang thực hiện", value: 40, color: "#3B82F6" },
    { name: "Quá hạn", value: 30, color: "#EF4444" },
    { name: "Chờ thực hiện", value: 25, color: "#F59E0B" },
    { name: "Hoàn thành", value: 10, color: "#10B981" },
    { name: "Hủy", value: 5, color: "#8B5CF6" },
    { name: "Chưa hoàn thành", value: 15, color: "#06B6D4" },
  ]

  // Status breakdown data
  const statusBreakdown = [
    { label: "Khảo sát công việc mới", count: 118, color: "bg-red-400" },
    { label: "Thiết kế hồ sơ giải pháp", count: 87, color: "bg-teal-400" },
    { label: "Báo giá", count: 98, color: "bg-yellow-400" },
    { label: "Ký hợp đồng", count: 35, color: "bg-orange-400" },
    { label: "Triển khai thi công, lắp đặt", count: 118, color: "bg-red-400" },
    { label: "Bảo trì, bảo dưỡng", count: 87, color: "bg-teal-400" },
    { label: "Sự cố hệ thống chưa giải quyết", count: 98, color: "bg-yellow-400" },
    { label: "Sự cố hệ thống đã giải quyết", count: 35, color: "bg-orange-400" },
  ]

  return (
    // <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">THỐNG KÊ CÔNG VIỆC</h1>
              <p className="text-gray-600">Thống kê kết quả kinh doanh Quy 2/2025</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Lọc tất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang thực hiện</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">Công việc</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Chi tiết</button>
          </div>
        </div>

        {/* Work Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {workStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${stat.color.replace("bg-", "bg-").replace("-500", "-100")}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.color} text-white`}
                    >
                      {stat.percentage}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Tỉ lệ công việc thực hiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mx-auto mb-4">
                  <div className="w-full h-full rounded-full relative overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                        #3B82F6 0deg 144deg,
                        #EF4444 144deg 252deg,
                        #F59E0B 252deg 342deg,
                        #10B981 342deg 360deg
                      )`,
                      }}
                    >
                      <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold">121</p>
                          <p className="text-sm text-gray-600">Tổng công việc</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="w-full max-w-xs space-y-2">
                  {pieChartData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 flex-1">{item.name}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Trạng thái công việc thực hiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {statusBreakdown.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 truncate pr-2">{item.label}</span>
                      <span className="text-sm font-medium flex-shrink-0">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                        style={{ width: `${Math.min((item.count / 118) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    // </DashboardLayout>
  )
}
