"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Plus, MoreHorizontal, Calendar, Users, Target } from "lucide-react"
// import DashboardLayout from "@/components/shared/dashboard-layout"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const projects = [
    {
      id: 1,
      name: "Hệ thống quản lý bãi đỗ xe thông minh",
      description: "Phát triển ứng dụng quản lý bãi đỗ xe với AI",
      status: "Đang thực hiện",
      progress: 75,
      startDate: "01/01/2024",
      endDate: "30/06/2024",
      team: 8,
      priority: "Cao",
      budget: "500,000,000 VNĐ",
    },
    {
      id: 2,
      name: "Nâng cấp hệ thống bảo mật",
      description: "Cải thiện hệ thống bảo mật và giám sát",
      status: "Hoàn thành",
      progress: 100,
      startDate: "15/11/2023",
      endDate: "15/03/2024",
      team: 5,
      priority: "Trung bình",
      budget: "300,000,000 VNĐ",
    },
    {
      id: 3,
      name: "Ứng dụng mobile cho khách hàng",
      description: "Phát triển app mobile cho người dùng cuối",
      status: "Lên kế hoạch",
      progress: 15,
      startDate: "01/07/2024",
      endDate: "31/12/2024",
      team: 6,
      priority: "Cao",
      budget: "400,000,000 VNĐ",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang thực hiện":
        return "bg-blue-100 text-blue-800"
      case "Hoàn thành":
        return "bg-green-100 text-green-800"
      case "Lên kế hoạch":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao":
        return "bg-red-100 text-red-800"
      case "Trung bình":
        return "bg-orange-100 text-orange-800"
      case "Thấp":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    // <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dự án</h1>
              <p className="text-gray-600">Quản lý và theo dõi các dự án</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Tạo dự án mới
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{project.name}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status and Priority */}
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Project Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.team} thành viên</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{project.budget}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    // </DashboardLayout>
  )
}
