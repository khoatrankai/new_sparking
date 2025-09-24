"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Mail, Phone, MoreHorizontal, Users, UserCheck, UserX } from "lucide-react"
import { InfoUser } from "@/models/userInterface"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import ModalAddUser from "./Tool/Modal/ModalUser"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ModalUpdateUser from "./Tool/Modal/ModalUpdateUser/ModalUpdateUser"
import { Modal } from "antd"
import userService from "@/services/userService"
import usePostData from "@/hooks/usePostData"
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice"
import { fetchUserFilter } from "@/redux/store/slices/userSlices/get_filter_user.slice"
import { useRouter } from "next/navigation"

export default function User() {
  const {postdata} = usePostData()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [idEdit,setIdEdit] = useState<string>("")
  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);
   const { datas: employees } = useSelector(
    (state: RootState) => state.get_filter_user
  );
  const refBtn = useRef<HTMLButtonElement>(null)
  const refBtnEdit = useRef<HTMLButtonElement>(null)
  // const employees = [
  //   {
  //     id: 1,
  //     name: "Nguyễn Văn An",
  //     position: "Trưởng phòng IT",
  //     department: "Công nghệ thông tin",
  //     email: "an.nguyen@company.com",
  //     phone: "0901234567",
  //     status: "Đang làm việc",
  //     joinDate: "15/01/2022",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: 2,
  //     name: "Trần Thị Bình",
  //     position: "Nhà phát triển Frontend",
  //     department: "Công nghệ thông tin",
  //     email: "binh.tran@company.com",
  //     phone: "0901234568",
  //     status: "Đang làm việc",
  //     joinDate: "20/03/2022",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  //   {
  //     id: 3,
  //     name: "Lê Văn Cường",
  //     position: "Chuyên viên Marketing",
  //     department: "Marketing",
  //     email: "cuong.le@company.com",
  //     phone: "0901234569",
  //     status: "Nghỉ phép",
  //     joinDate: "10/06/2021",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //   },
  // ]
   const handleDelete = async () => {
      const statusCode = await postdata(() =>
        userService.deleteUser(selectedTasks)
      );
      if (statusCode === 200) {
        dispatch(fetchUserFilter({}));
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // const fetchData = async()=>{
    
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý nhân viên</h1>
            <p className="text-gray-600">Quản lý thông tin và hiệu suất nhân viên</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={()=>{
            refBtn.current?.click()
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm nhân viên
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
                  <p className="text-sm text-gray-600">Tổng nhân viên</p>
                  <p className="text-2xl font-bold text-gray-900">{employees?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đang làm việc</p>
                  <p className="text-2xl font-bold text-gray-900">{employees?.filter(dt => dt.status === "active")?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-yellow-100">
                  <UserX className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nghỉ việc</p>
                  <p className="text-2xl font-bold text-gray-900">{employees?.filter(dt => dt.status !== "active")?.length || 0}</p>
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
                placeholder="Tìm kiếm nhân viên..."
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

        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách nhân viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.user_id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={employee.picture_url || "/placeholder.svg"} alt={employee.last_name} />
                        <AvatarFallback>{employee?.first_name} {employee?.last_name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{employee.first_name} {employee.last_name}</h3>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                        <p className="text-sm text-gray-500">{employee?.group_user?.name_group}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1 min-w-80">
                          <Mail className="w-4 h-4" />
                          {employee.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {employee?.phone_number}
                        </div>
                      </div>

                      <div className="text-center">
                        <Badge className={getStatusColor(employee.status)}>{employee.status === "active"?"Đang làm việc":"Nghỉ việc"}</Badge>
                        <p className="text-xs text-gray-500 mt-1">Ngày công {employee?.number_workday}</p>
                      </div>

                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          router.push(`/management/user/${employee.user_id}`)
                        }}>
                          👁️ Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIdEdit(employee.user_id)}>
                          ✏️ Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedTasks([employee?.user_id])
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
      <ModalAddUser refBtnAdd={refBtn}/>
      <ModalUpdateUser ID={idEdit} refBtnUser={refBtnEdit}/>
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
