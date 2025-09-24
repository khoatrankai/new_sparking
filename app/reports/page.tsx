"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Clock, Download, Filter, Calendar, PieChart, Activity } from "lucide-react"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const stats = [
    {
      title: "Tổng dự án",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Nhiệm vụ hoàn thành",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Thành viên tham gia",
      value: "32",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Giờ làm việc",
      value: "1,248",
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const projectProgress = [
    { name: "Hệ thống quản lý bãi đỗ xe", progress: 85, status: "Đang thực hiện" },
    { name: "Ứng dụng mobile", progress: 60, status: "Đang thực hiện" },
    { name: "Nâng cấp bảo mật", progress: 100, status: "Hoàn thành" },
    { name: "Dashboard analytics", progress: 40, status: "Đang thực hiện" },
  ]

  const teamPerformance = [
    { name: "Nguyễn Văn A", tasks: 24, completed: 22, efficiency: 92 },
    { name: "Trần Thị B", tasks: 18, completed: 16, efficiency: 89 },
    { name: "Lê Văn C", tasks: 20, completed: 17, efficiency: 85 },
    { name: "Phạm Thị D", tasks: 15, completed: 14, efficiency: 93 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo</h1>
            <p className="text-gray-600">Thống kê và phân tích hiệu suất</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Chọn kỳ
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      />
                      <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Tiến độ dự án
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectProgress.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          project.status === "Hoàn thành" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {project.status}
                      </Badge>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Hiệu suất nhóm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">
                        {member.completed}/{member.tasks} nhiệm vụ
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-teal-600">{member.efficiency}%</p>
                      <p className="text-xs text-gray-500">Hiệu suất</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ tiến độ theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Biểu đồ sẽ được hiển thị tại đây</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bổ thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <PieChart className="w-12 h-12 mx-auto mb-2" />
                  <p>Biểu đồ tròn sẽ được hiển thị tại đây</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
