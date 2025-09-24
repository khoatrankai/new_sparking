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
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Truck,
  Package,
  Star,
  TrendingUp,
} from "lucide-react"
import { IGetSupplierProduct } from "@/models/productInterface"
import { AppDispatch, RootState } from "@/redux/store/store"
import { useDispatch, useSelector } from "react-redux"
import usePostData from "@/hooks/usePostData"
import productService from "@/services/productService"
import { fetchSuppliers } from "@/redux/store/slices/productSlices/get_supplier.slice"
import ModalAddSupplier from "./Tool/Modal/ModalSupplier"
import ModalUpdateSupplier from "./Tool/Modal/ModalUpdateSupplier/ModalUpdateSupplier"
import { Modal } from "antd"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SuppliersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState("")
  const { datas: suppliers } = useSelector(
    (state: RootState) => state.get_supplier
  );
  const {postdata} = usePostData()
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const [idEdit,setIdEdit] = useState<string>("")
    const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);
    const refBtnAdd = useRef<HTMLButtonElement>(null)
    const refBtnEdit = useRef<HTMLButtonElement>(null)
  // const suppliers = [
  //   {
  //     id: 1,
  //     name: "Công ty Phần mềm TechSoft",
  //     category: "Phần mềm",
  //     contact: "Nguyễn Văn A",
  //     email: "sales@techsoft.com",
  //     phone: "0901234567",
  //     address: "123 Đường Công nghệ, Quận 9, TP.HCM",
  //     status: "Đang hợp tác",
  //     rating: 4.8,
  //     orders: 12,
  //     totalValue: "800,000,000 VNĐ",
  //   },
  //   {
  //     id: 2,
  //     name: "Công ty Thiết bị HardTech",
  //     category: "Phần cứng",
  //     contact: "Trần Thị B",
  //     email: "info@hardtech.com",
  //     phone: "0901234568",
  //     address: "456 Đường Điện tử, Quận 7, TP.HCM",
  //     status: "Đang hợp tác",
  //     rating: 4.5,
  //     orders: 8,
  //     totalValue: "1,200,000,000 VNĐ",
  //   },
  //   {
  //     id: 3,
  //     name: "Dịch vụ Bảo trì SecureServ",
  //     category: "Dịch vụ",
  //     contact: "Lê Văn C",
  //     email: "support@secureserv.com",
  //     phone: "0901234569",
  //     address: "789 Đường Bảo trì, Quận 1, TP.HCM",
  //     status: "Tạm dừng",
  //     rating: 4.2,
  //     orders: 5,
  //     totalValue: "300,000,000 VNĐ",
  //   },
  // ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang hợp tác":
        return "bg-green-100 text-green-800"
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800"
      case "Ngừng hợp tác":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Phần mềm":
        return "bg-blue-100 text-blue-800"
      case "Phần cứng":
        return "bg-purple-100 text-purple-800"
      case "Dịch vụ":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
const handleDelete = async () => {
        const statusCode = await postdata(() =>
          productService.deleteSupplier(selectedTasks)
        );
        if (statusCode === 200) {
          dispatch(fetchSuppliers());
          // dispatch()
          setSelectedTasks([]);
          setIsModalConfirmDelete(false);
        }
      };
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
            <h1 className="text-2xl font-bold text-gray-900">Quản lý nhà cung cấp</h1>
            <p className="text-gray-600">Quản lý nhà cung cấp và đối tác</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={()=>{
            refBtnAdd.current?.click()
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm nhà cung cấp
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
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng nhà cung cấp</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length || 0}</p>
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
                  <p className="text-sm text-gray-600">Đang hợp tác</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Package className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
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
                  <p className="text-sm text-gray-600">Tổng giá trị</p>
                  <p className="text-xl font-bold text-gray-900">2.3B VNĐ</p>
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
                placeholder="Tìm kiếm nhà cung cấp..."
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

        {/* Suppliers List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách nhà cung cấp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div key={supplier.supplier_id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                        {/* <Badge className={getCategoryColor(supplier.)}>{supplier.category}</Badge> */}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Liên hệ: {supplier.email}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {supplier.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {supplier.phone_number}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {supplier.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        {/* <Badge className={getStatusColor(supplier.s)}>{supplier.status}</Badge> */}
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>5</span>
                          </div>
                          {/* <p className="text-gray-600">{supplier.products.quantity} đơn hàng</p> */}
                          {/* <p className="font-medium text-teal-600">{supplier.totalValue}</p> */}
                        </div>
                      </div>

                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIdEdit(supplier.supplier_id)}>
                          ✏️ Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedTasks([supplier.supplier_id])
                            setIsModalConfirmDelete(true)
                          }} 
                          className="text-red-500"
                        >
                          🗑️ Xóa
                        </DropdownMenuItem>
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
      <ModalAddSupplier refBtnSupplier={refBtnAdd}/>
      <ModalUpdateSupplier ID={idEdit} refBtnUpdate={refBtnEdit}/>
       <Modal
                                        open={isModalConfirmDelete}
                                        title={"Xóa dữ liệu"}
                                        onOk={handleDelete}
                                        onCancel={() => {
                                          setIsModalConfirmDelete(false);
                                        }}
                                      >
                                        Bạn có chắc chắn muốn xóa không ?
                                      </Modal>
    </div>
  )
}
