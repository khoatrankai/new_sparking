"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, Plus, Mail, Phone, MapPin, MoreHorizontal, Users, Star, TrendingUp } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import ModalAddCustomer from "./ToolCustomer/ModalCustomer/ModalAddCustomer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ModalUpdateCustomer from "./ToolCustomer/ModalCustomer/ModalUpdateCustomer"
import { Modal } from "antd"
import usePostData from "@/hooks/usePostData"
import customerService from "@/services/customerService"
import { fetchCustomerFilter } from "@/redux/store/slices/customerSlices/get_filter_customer.slice"

export default function CustomersPage() {
  const {postdata} = usePostData()
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [idEdit,setIdEdit] = useState<string>("")
  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);
  const refBtnAdd = useRef<HTMLButtonElement>(null)
  const refBtnEdit = useRef<HTMLButtonElement>(null)
  const { datas: customers } = useSelector(
    (state: RootState) => state.get_filter_customer
  );
  // const customers = [
  //   {
  //     id: 1,
  //     name: "Công ty TNHH ABC",
  //     contact: "Nguyễn Văn A",
  //     email: "contact@abc.com",
  //     phone: "0901234567",
  //     address: "123 Đường ABC, Quận 1, TP.HCM",
  //     status: "Hoạt động",
  //     rating: 4.8,
  //     projects: 5,
  //     revenue: "2,500,000,000 VNĐ",
  //   },
  //   {
  //     id: 2,
  //     name: "Tập đoàn XYZ",
  //     contact: "Trần Thị B",
  //     email: "info@xyz.com",
  //     phone: "0901234568",
  //     address: "456 Đường XYZ, Quận 3, TP.HCM",
  //     status: "Hoạt động",
  //     rating: 4.5,
  //     projects: 3,
  //     revenue: "1,800,000,000 VNĐ",
  //   },
  //   {
  //     id: 3,
  //     name: "Công ty DEF",
  //     contact: "Lê Văn C",
  //     email: "hello@def.com",
  //     phone: "0901234569",
  //     address: "789 Đường DEF, Quận 7, TP.HCM",
  //     status: "Tạm dừng",
  //     rating: 4.2,
  //     projects: 2,
  //     revenue: "900,000,000 VNĐ",
  //   },
  // ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  const handleDelete = async () => {
        const statusCode = await postdata(() =>
          customerService.deleteInfoCustomer(selectedTasks)
        );
        if (statusCode === 200) {
          dispatch(fetchCustomerFilter({}));
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
            <h1 className="text-2xl font-bold text-gray-900">Quản lý khách hàng</h1>
            <p className="text-gray-600">Quản lý thông tin và quan hệ khách hàng</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={()=>{
            refBtnAdd.current?.click()
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm khách hàng
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng khách hàng</p>
                  <p className="text-2xl font-bold text-gray-900">{customers?.length}</p>
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
                  <p className="text-sm text-gray-600">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900">{customers?.filter(dt => dt.status_active === "active").length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đánh giá TB</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
{/* 
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-100">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doanh thu</p>
                  <p className="text-xl font-bold text-gray-900">5.2B VNĐ</p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm khách hàng..."
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

        {/* Customer List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.info_id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>{customer.name_company}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{customer.name_company}</h3>
                        <p className="text-sm text-gray-600 mb-2">Liên hệ: {customer.phone_number}</p>

                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {customer.tax_code}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {customer.phone_number}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {customer.address_delivery}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        <Badge className={getStatusColor(customer.status_active)}>{customer.status_active === "active" ?'Đang hoạt động':'Không hoạt động'}</Badge>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>5</span>
                          </div>
                          <p className="text-gray-600">{customer.website}</p>
                          {/* <p className="font-medium text-teal-600">{customer.staff_support}</p> */}
                        </div>
                      </div>

                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIdEdit(customer.info_id)}>
                          ✏️ Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedTasks([customer?.info_id])
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
      <ModalAddCustomer refBtnCustomer={refBtnAdd}/>
      <ModalUpdateCustomer info_id={idEdit} refBtnUpdate={refBtnEdit}/>
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
