"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, Plus, Search, Filter, Download, AlertTriangle } from "lucide-react"

export default function BudgetPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const budgetOverview = {
    totalBudget: 2500000000,
    usedBudget: 1850000000,
    remainingBudget: 650000000,
    monthlySpent: 185000000,
  }

  const budgetItems = [
    {
      id: 1,
      category: "Phát triển phần mềm",
      allocated: 800000000,
      spent: 650000000,
      remaining: 150000000,
      status: "Trong ngân sách",
      progress: 81,
    },
    {
      id: 2,
      category: "Thiết bị phần cứng",
      allocated: 500000000,
      spent: 480000000,
      remaining: 20000000,
      status: "Gần hết ngân sách",
      progress: 96,
    },
    {
      id: 3,
      category: "Marketing & Quảng cáo",
      allocated: 300000000,
      spent: 180000000,
      remaining: 120000000,
      status: "Trong ngân sách",
      progress: 60,
    },
    {
      id: 4,
      category: "Đào tạo nhân viên",
      allocated: 200000000,
      spent: 120000000,
      remaining: 80000000,
      status: "Trong ngân sách",
      progress: 60,
    },
    {
      id: 5,
      category: "Bảo trì hệ thống",
      allocated: 400000000,
      spent: 420000000,
      remaining: -20000000,
      status: "Vượt ngân sách",
      progress: 105,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Trong ngân sách":
        return "bg-green-100 text-green-800"
      case "Gần hết ngân sách":
        return "bg-yellow-100 text-yellow-800"
      case "Vượt ngân sách":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ngân sách</h1>
            <p className="text-gray-600">Quản lý và theo dõi ngân sách dự án</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mục ngân sách
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng ngân sách</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetOverview.totalBudget)}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã sử dụng</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetOverview.usedBudget)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
                    <span className="text-sm text-red-600">74%</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Còn lại</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetOverview.remainingBudget)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 mr-1 text-green-500" />
                    <span className="text-sm text-green-600">26%</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <TrendingDown className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chi tiêu tháng này</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(budgetOverview.monthlySpent)}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm mục ngân sách..."
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

        {/* Budget Items */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết ngân sách</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetItems.map((item) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{item.category}</h3>
                      {item.status === "Vượt ngân sách" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    </div>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Phân bổ</p>
                      <p className="font-semibold">{formatCurrency(item.allocated)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Đã chi</p>
                      <p className="font-semibold">{formatCurrency(item.spent)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Còn lại</p>
                      <p className={`font-semibold ${item.remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                        {formatCurrency(item.remaining)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tiến độ sử dụng</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <Progress
                      value={Math.min(item.progress, 100)}
                      className={`h-2 ${item.progress > 100 ? "bg-red-100" : ""}`}
                    />
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
