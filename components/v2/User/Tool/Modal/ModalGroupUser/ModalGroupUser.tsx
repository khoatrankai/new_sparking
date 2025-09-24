"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Users, Building, TrendingUp, MoreHorizontal } from "lucide-react"
import { AppDispatch, RootState } from "@/redux/store/store"
import { useDispatch, useSelector } from "react-redux"
import { fetchGroupUser } from "@/redux/store/slices/userSlices/get_all_group.slice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ModalUpdateGroup from "@/components/v2/User/Tool/Modal/ModalGroupUser/ModalUpdateGroup"
import usePostData from "@/hooks/usePostData"
import userService from "@/services/userService"
import { Modal } from "antd"
import ModalGroupRole from "@/components/v2/User/Tool/Modal/ModalGroupRole/ModalGroupRole"
import ModalAddGroup from "@/components/v2/User/Tool/Modal/ModalGroupUser/ModalAddGroup"

export default function DepartmentsPage() {
  const {postdata} = usePostData()
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [groupName, setGroupName] = useState("")
  const [idEdit,setIdEdit] = useState<string>()
  const [idPermission,setIdPermission] = useState<string>()
  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);
  const [nameEdit,setNameEdit] = useState<string>()
  const refBtnEdit = useRef<HTMLButtonElement>(null)
  const refBtnAdd = useRef<HTMLButtonElement>(null)
  const refBtnPermission = useRef<HTMLButtonElement>(null)
  const dispatch = useDispatch<AppDispatch>();
   const { datas: departments } = useSelector(
    (state: RootState) => state.get_group_user
  );
  // const departments = [
  //   {
  //     id: 1,
  //     name: "Công nghệ thông tin",
  //     manager: "Nguyễn Văn An",
  //     employees: 12,
  //     budget: "800,000,000 VNĐ",
  //     performance: 92,
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: 2,
  //     name: "Marketing",
  //     manager: "Trần Thị Bình",
  //     employees: 8,
  //     budget: "500,000,000 VNĐ",
  //     performance: 88,
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: 3,
  //     name: "Nhân sự",
  //     manager: "Lê Văn Cường",
  //     employees: 5,
  //     budget: "300,000,000 VNĐ",
  //     performance: 95,
  //     status: "Hoạt động",
  //   },
  //   {
  //     id: 4,
  //     name: "Kế toán",
  //     manager: "Phạm Thị Dung",
  //     employees: 4,
  //     budget: "200,000,000 VNĐ",
  //     performance: 90,
  //     status: "Hoạt động",
  //   },
  // ]
  const handleDelete = async () => {
      const statusCode = await postdata(() =>
        userService.deleteGroupUser(selectedTasks)
      );
      if (statusCode === 200) {
        dispatch(fetchGroupUser());
        setSelectedTasks([]);
        setIsModalConfirmDelete(false);
      }
    };
  useEffect(()=>{
    if(idEdit && nameEdit){
      refBtnEdit.current?.click()
    }
  },[idEdit,nameEdit])
  useEffect(()=>{
    if(idPermission && groupName){
      refBtnPermission.current?.click()
    }
  },[idPermission,groupName])
  // useEffect(()=>{
  //   dispatch(fetchGroupUser());
  // },[])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý phòng ban</h1>
            <p className="text-gray-600">Tổ chức và quản lý các phòng ban</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={()=>{
            refBtnAdd.current?.click()
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm phòng ban
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
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng phòng ban</p>
                  <p className="text-2xl font-bold text-gray-900">{departments?.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-100">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng nhân viên</p>
                  <p className="text-2xl font-bold text-gray-900">{departments?.reduce((total,curr)=>{
                    return total + (curr?.users?.length || 0)
                  },0)}</p>
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
                  <p className="text-sm text-gray-600">Hiệu suất TB</p>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-orange-100">
                  <Building className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900">{departments?.length}</p>
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
                placeholder="Tìm kiếm phòng ban..."
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

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <Card key={dept.group_id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">{dept.name_group}</CardTitle>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => {setIdPermission(dept.group_id)
                          setGroupName(dept?.name_group)
                         }}>
                          Phân quyền
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {setIdEdit(dept.group_id)
                          setNameEdit(dept.name_group)
                        }}>
                          Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedTasks([dept?.group_id])
                            setIsModalConfirmDelete(true)
                          }} 
                          className="text-red-500"
                        >
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Badge className="bg-green-100 text-green-800 w-fit">Hoạt động</Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {/* <div>
                    <p className="text-gray-600">Trưởng phòng</p>
                    <p className="font-medium text-gray-900">{dept.manager}</p>
                  </div> */}
                  <div>
                    <p className="text-gray-600">Nhân viên</p>
                    <p className="font-medium text-gray-900">{dept?.users?.length} người</p>
                  </div>
                  {/* <div>
                    <p className="text-gray-600">Ngân sách</p>
                    <p className="font-medium text-gray-900">{dept.budget}</p>
                  </div> */}
                  <div>
                    <p className="text-gray-600">Hiệu suất</p>
                    <p className="font-medium text-teal-600">100%</p>
                  </div>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700">Xem chi tiết</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ModalUpdateGroup ID={idEdit} name_group={nameEdit} refBtnUpdate={refBtnEdit}/>
      <ModalAddGroup refBtnAdd={refBtnAdd}/>
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
                          <ModalGroupRole ID={idPermission as string} name={groupName} refBtn={refBtnPermission} />
    </div>
  )
}
