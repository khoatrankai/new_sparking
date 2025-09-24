"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Plus,
  Package,
  MapPin,
  MoreHorizontal,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function WarehousePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const warehouses = [
    {
      id: 1,
      name: "Kho chính - Quận 12",
      location: "123 Đường Kho bãi, Quận 12, TP.HCM",
      manager: "Nguyễn Văn A",
      capacity: 1000,
      occupied: 750,
      status: "Hoạt động",
      temperature: "25°C",
      humidity: "60%",
      items: 156,
      categories: ["Thiết bị IT", "Văn phòng phẩm", "Linh kiện"],
    },
    {
      id: 2,
      name: "Kho phụ - Quận 7",
      location: "456 Đường Logistics, Quận 7, TP.HCM",
      manager: "Trần Thị B",
      capacity: 500,
      occupied: 480,
      status: "Gần đầy",
      temperature: "23°C",
      humidity: "55%",
      items: 89,
      categories: ["Thiết bị bảo trì", "Dụng cụ"],
    },
    {
      id: 3,
      name: "Kho lạnh - Quận 1",
      location: "789 Đường Bảo quản, Quận 1, TP.HCM",
      manager: "Lê Văn C",
      capacity: 200,
      occupied: 120,
      status: "Hoạt động",
      temperature: "5°C",
      humidity: "45%",
      items: 45,
      categories: ["Thiết bị nhạy cảm", "Linh kiện điện tử"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoạt động":
        return "bg-green-100 text-green-800"
      case "Gần đầy":
        return "bg-yellow-100 text-yellow-800"
      case "Bảo trì":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Hoạt động":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Gần đầy":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "Bảo trì":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const getCapacityColor = (occupied: number, capacity: number) => {
    const percentage = (occupied / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý kho</h1>
            <p className="text-gray-600">Quản lý kho bãi và tồn kho</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Thêm kho mới
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100">
                  <Warehouse className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng số kho</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng mặt hàng</p>
                  <p className="text-2xl font-bold text-gray-900">290</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-100">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tỷ lệ sử dụng</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-yellow-100">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cảnh báo</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
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
                placeholder="Tìm kiếm kho..."
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

        {/* Warehouse List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">{warehouse.name}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(warehouse.status)}
                  <Badge className={getStatusColor(warehouse.status)}>{warehouse.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location and Manager */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {warehouse.location}
                  </div>
                  <p className="text-gray-600">
                    Quản lý: <span className="font-medium">{warehouse.manager}</span>
                  </p>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sức chứa</span>
                    <span className={`font-medium ${getCapacityColor(warehouse.occupied, warehouse.capacity)}`}>
                      {warehouse.occupied}/{warehouse.capacity} m²
                    </span>
                  </div>
                  <Progress value={(warehouse.occupied / warehouse.capacity) * 100} className="h-2" />
                </div>

                {/* Environmental Conditions */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nhiệt độ</p>
                    <p className="font-medium text-blue-600">{warehouse.temperature}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Độ ẩm</p>
                    <p className="font-medium text-green-600">{warehouse.humidity}</p>
                  </div>
                </div>

                {/* Items and Categories */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Số mặt hàng</span>
                    <span className="font-medium text-gray-900">{warehouse.items}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {warehouse.categories.map((category, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700">Quản lý kho</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
