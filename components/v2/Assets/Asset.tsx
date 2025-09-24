"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  Monitor,
  Laptop,
  Smartphone,
  Printer,
  MoreHorizontal,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { RootState } from "@/redux/store/store"
import { useSelector } from "react-redux"
import usePostData from "@/hooks/usePostData"
import productService from "@/services/productService"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ModalAddAsset from "./ToolAsset/ModalAsset/ModalAddAsset"
import ModalUpdateAsset from "./ToolAsset/ModalAsset/ModalUpdateAsset"

export default function AssetsPage() {
  const {postdata} = usePostData()
  const [searchTerm, setSearchTerm] = useState("")
  const { datas: assets } = useSelector(
    (state: RootState) => state.asset_product
  );
  // const [assets,setAssets] = useState<
  // const assets = [
  //   {
  //     id: 1,
  //     name: "MacBook Pro 16-inch",
  //     category: "Laptop",
  //     serialNumber: "MBP2023001",
  //     assignedTo: "Nguyễn Văn A",
  //     department: "IT",
  //     purchaseDate: "15/01/2023",
  //     purchasePrice: "50,000,000 VNĐ",
  //     currentValue: "40,000,000 VNĐ",
  //     status: "Đang sử dụng",
  //     condition: "Tốt",
  //     warrantyExpiry: "15/01/2026",
  //     icon: Laptop,
  //   },
  //   {
  //     id: 2,
  //     name: "Dell Monitor 27-inch",
  //     category: "Monitor",
  //     serialNumber: "DM2023002",
  //     assignedTo: "Trần Thị B",
  //     department: "Marketing",
  //     purchaseDate: "20/02/2023",
  //     purchasePrice: "8,000,000 VNĐ",
  //     currentValue: "6,500,000 VNĐ",
  //     status: "Đang sử dụng",
  //     condition: "Tốt",
  //     warrantyExpiry: "20/02/2025",
  //     icon: Monitor,
  //   },
  //   {
  //     id: 3,
  //     name: "iPhone 14 Pro",
  //     category: "Điện thoại",
  //     serialNumber: "IP2023003",
  //     assignedTo: "Lê Văn C",
  //     department: "Sales",
  //     purchaseDate: "10/03/2023",
  //     purchasePrice: "30,000,000 VNĐ",
  //     currentValue: "22,000,000 VNĐ",
  //     status: "Bảo trì",
  //     condition: "Cần sửa chữa",
  //     warrantyExpiry: "10/03/2024",
  //     icon: Smartphone,
  //   },
  //   {
  //     id: 4,
  //     name: "HP LaserJet Printer",
  //     category: "Máy in",
  //     serialNumber: "HP2023004",
  //     assignedTo: "Phòng hành chính",
  //     department: "Admin",
  //     purchaseDate: "05/04/2023",
  //     purchasePrice: "12,000,000 VNĐ",
  //     currentValue: "9,000,000 VNĐ",
  //     status: "Đang sử dụng",
  //     condition: "Tốt",
  //     warrantyExpiry: "05/04/2025",
  //     icon: Printer,
  //   },
  // ]
 const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [idEdit,setIdEdit] = useState<string>("")
  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);
  const refBtnAdd = useRef<HTMLButtonElement>(null)
  const refBtnEdit = useRef<HTMLButtonElement>(null)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang sử dụng":
        return "bg-green-100 text-green-800"
      case "Bảo trì":
        return "bg-yellow-100 text-yellow-800"
      case "Hỏng":
        return "bg-red-100 text-red-800"
      case "Không sử dụng":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  // const handleDelete = async () => {
  //         const statusCode = await postdata(() =>
  //           productService.delete(selectedTasks)
  //         );
  //         if (statusCode === 200) {
  //           dispatch(fetchCustomerFilter({}));
  //           // dispatch()
  //           setSelectedTasks([]);
  //           setIsModalConfirmDelete(false);
  //         }
  //       };
  useEffect(() => {
              if (idEdit !== "") {
                refBtnEdit.current?.click();
              }
          }, [idEdit]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý tài sản</h1>
            <p className="text-gray-600">Theo dõi và quản lý tài sản công ty</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={()=>{
            refBtnAdd.current?.click()
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm tài sản
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
                  <Monitor className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng tài sản</p>
                  <p className="text-2xl font-bold text-gray-900">{assets?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đang sử dụng</p>
                  <p className="text-2xl font-bold text-gray-900">{assets?.filter(dt => dt.status === "in_use").length || 0}</p>
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
                  <p className="text-sm text-gray-600">Cần bảo trì</p>
                  <p className="text-2xl font-bold text-gray-900">{assets?.filter(dt => dt.status === "under_repair").length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-100">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng giá trị</p>
                  <p className="text-xl font-bold text-gray-900">{assets?.reduce((total,curr)=>{
                    return total + (Number(curr.price) || 0)
                  },0)}</p>
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
                placeholder="Tìm kiếm tài sản..."
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

        {/* Assets List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài sản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* <div className="p-3 rounded-full bg-gray-100">
                        <asset.icon className="w-6 h-6 text-gray-600" />
                      </div> */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {asset.name} • SN: {asset.serial_number}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">
                              Được giao cho: <span className="font-medium">{new Date(asset?.purchase_date || "").toLocaleDateString('vi-vn') }</span>
                            </p>
                            <p className="text-gray-600">
                              Phòng ban: <span className="font-medium">{asset.description}</span>
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              Mua: {new Date(asset?.purchase_date || "").toLocaleDateString('vi-vn') }
                            </div>
                            <p className="text-gray-600">Bảo hành đến: {new Date(asset?.warranty_expiry|| "").toLocaleDateString('vi-vn')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                          {/* <Badge className={getConditionColor(asset.condition)}>{asset.condition}</Badge> */}
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            Giá mua: <span className="font-medium">{asset.price}</span>
                          </p>
                          <p className="text-gray-600">
                            Giá hiện tại: <span className="font-medium text-teal-600">{asset.price}</span>
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIdEdit(asset.id)}>
                          ✏️ Sửa
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem 
                          onClick={() => {
                            setSelectedTasks([asset.id])
                            setIsModalConfirmDelete(true)
                          }} 
                          className="text-red-500"
                        >
                          🗑️ Xóa
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <ModalAddAsset refBtnAsset={refBtnAdd}/>
      <ModalUpdateAsset asset_id={idEdit} refBtnUpdate={refBtnEdit}/>
    </div>
  )
}
