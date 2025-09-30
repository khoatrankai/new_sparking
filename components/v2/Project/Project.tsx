"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import moment from 'moment'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import DashboardLayout from "@/components/shared/dashboard-layout"
import {
  Filter,
  Download,
  Upload,
  Calendar,
  BarChart3,
  Kanban,
  List,
  Settings,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
  FileText,
  Clock,
  AlertTriangle,
  Shield,
  Building,
  UserCheck,
  Package,
  Truck,
  Warehouse,
  DollarSign,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import { IGetProject } from "@/models/projectInterface"
import ModalAddProject from "./Tool/Modal/ModalAddProject"
import ModalUpdateProject from "./Tool/Modal/ModalUpdateProject"
import projectService from "@/services/projectService"
import usePostData from "@/hooks/usePostData"
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice"
import { Modal } from "antd"


export default function Project() {
  //  const { datas: dataSources } = useSelector(
  //     (state: RootState) => state.get_works
  //   );
  const dispatch = useDispatch<AppDispatch>()
  const {postdata}=usePostData()
  const [idEdit,setIdEdit] = useState<string>("")
  const refBtn = useRef<HTMLButtonElement>(null)
  const refBtnEdit = useRef<HTMLButtonElement>(null);
const { datas: dataSources } = useSelector(
    (state: RootState) => state.get_projects
  );
  const { datas: dataUsers } = useSelector(
      (state: RootState) => state.get_users
    );
const router = useRouter()
  // const [dataSources,setDataSources] = useState<IGetProject[]>([])
  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState(false);
    const [tabs,setTabs] = useState<any>([
  { name: "Đang chờ",name_tag:"waiting", count: 10, active: false },
  { name: "Bắt đầu",name_tag:"start", count: 10, active: false },
  { name: "Hoàn thành",name_tag:"completed", count: 10, active: false },
  { name: "Tạm dừng",name_tag:"pause", count: 8, active: false },
  { name: "Đã hủy",name_tag:"cancel", count: 7, active: false },
])
    const searchParams = useSearchParams()
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const [activeTab, setActiveTab] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedSidebar, setExpandedSidebar] = useState<string | null>("Dự án")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<any>(null)
    // const [activeMenu, setActiveMenu] = useState("Dự án")
    useEffect(() => {
            if (idEdit !== "") {
              refBtnEdit.current?.click();
            }
        }, [idEdit]);
    useEffect(()=>{
      if(dataSources){
        // console.log(tabs,dataSources)
        setTabs((prev:any)=>{
          return prev.map((tab:any)=>{
            const countItem =  Array.isArray(dataSources)
  ?dataSources.filter((it:any)=>{ return it?.status === tab.name_tag}).length : 0
            return{
              ...tab,count:countItem
            }

          })
        })
      }
    },[dataSources])
    // const fetchData = async(typeDashboard?:string)=>{
    //     const res = await activityService.getWorksFilter({type:typeDashboard})
    //     if(res?.statusCode === 200){
    //       setDataSources(res?.data?.datas ?? [])
    //     }
    //   }
      useEffect(()=>{
          // fetchData(searchParams.get('type') ?? undefined)
      },[searchParams])
      // useEffect(()=>{
      //   fetchData()
      // },[])
    const [newTask, setNewTask] = useState({
      title: "",
      status: "Đang thực hiện",
      priority: "medium",
      assignee: "",
      description: "",
    })
  
    const toggleTaskSelection = (taskId: string) => {
      setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
    }
  
    const toggleSelectAll = () => {
      if (selectedTasks.length === filteredTasks.length) {
        setSelectedTasks([])
      } else {
        setSelectedTasks(filteredTasks.map((task:IGetProject) => task.project_id))
      }
    }
  
    const toggleSidebarItem = (label: string) => {
      setExpandedSidebar(expandedSidebar === label ? null : label)
    }

  
    const handleAddTask = () => {
      if (newTask.title.trim()) {
        const task = {
          id: dataSources.length + 1,
          title: newTask.title,
          status: newTask.status,
          statusColor: getStatusColor(newTask.status),
          assignees: ["/diverse-user-avatars.png"],
          progress: 0,
          timeRange: "Hôm nay - 30 ngày",
          priority: newTask.priority,
        }
        // tasks.push(task)
        setNewTask({ title: "", status: "Đang thực hiện", priority: "medium", assignee: "", description: "" })
        setIsAddTaskOpen(false)
        alert("Đã thêm dự án mới thành công!")
      }
    }
  
    const handleEditTask = (task: any) => {
      setEditingTask(task)
      setIsEditTaskOpen(true)
    }
    const handleDelete = async () => {
    const statusCode = await postdata(() =>
      projectService.deleteProject(selectedTasks)
    );
    if (statusCode === 200) {
      dispatch(fetchProjects());
      setSelectedTasks([]);
      setIsModalConfirmDelete(false);
    }
  };
    const handleDeleteTask = (taskId: string) => {
      if (confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
        const index = dataSources.findIndex((t:any) => t.work_id === taskId)
        if (index > -1) {
          dataSources.splice(index, 1)
          setSelectedTasks((prev) => prev.filter((id) => id !== taskId))
          alert("Đã xóa dự án thành công!")
        }
      }
    }
  
    const handleBulkDelete = () => {
      if (selectedTasks.length > 0 && confirm(`Bạn có chắc chắn muốn xóa ${selectedTasks.length} dự án đã chọn?`)) {
        selectedTasks.forEach((taskId) => {
          const index = dataSources.findIndex((t:any) => t.work_id === taskId)
          if (index > -1) {
            dataSources.splice(index, 1)
          }
        })
        setSelectedTasks([])
        alert("Đã xóa các dự án đã chọn!")
      }
    }
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Hoàn thành":
          return "status-green"
        case "Đang thực hiện":
          return "status-blue"
        case "Đang tạm dừng":
          return "status-orange"
        case "Đã hủy":
          return "status-red"
        case "Đang đánh giá":
          return "status-purple"
        default:
          return "status-gray"
      }
    }
  
   const filteredTasks = Array.isArray(dataSources)
  ? dataSources.filter((task: IGetProject) => {
      const matchesSearch =
        task?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
      const matchesStatus =
        task?.status === activeTab || activeTab === "all"
      return matchesSearch && matchesStatus
    })
  : []
  
    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage)
  
    return (
      // <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Tìm kiếm dự án..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="Đang thực hiện">Đang thực hiện</SelectItem>
                <SelectItem value="Đang tạm dừng">Đang tạm dừng</SelectItem>
                <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                <SelectItem value="Đang đánh giá">Đang đánh giá</SelectItem>
              </SelectContent>
            </Select>
            {/* <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm dự án
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm dự án mới</DialogTitle>
                  <DialogDescription>Tạo một dự án mới cho dự án của bạn</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tên dự án</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Nhập tên dự án..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Mô tả chi tiết dự án..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Trạng thái</Label>
                      <Select value={newTask.status} onValueChange={(value) => setNewTask({ ...newTask, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Đang thực hiện">Đang thực hiện</SelectItem>
                          <SelectItem value="Đang tạm dừng">Đang tạm dừng</SelectItem>
                          <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Ưu tiên</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Cao</SelectItem>
                          <SelectItem value="medium">Trung bình</SelectItem>
                          <SelectItem value="low">Thấp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleAddTask}>Thêm dự án</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog> */}
             <Button className="bg-primary hover:bg-primary/90" onClick={()=>{
              refBtn.current?.click()
             }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm dự án
                </Button>
            {selectedTasks.length > 0 && (
              <Button variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa ({selectedTasks.length})
              </Button>
            )}
          </div>
  
          <div className="flex items-center gap-8 mb-6 border-b border-border">
            {tabs.map((tab:any) => (
              <div
                key={tab.name}
                className={`flex items-center gap-2 cursor-pointer pb-3 border-b-2 transition-colors ${
                  tab.active || activeTab === tab.name_tag
                    ? "text-primary border-primary font-medium"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
                onClick={() => {setActiveTab(tab.name_tag)
                  setCurrentPage(1)
                }}
              >
                <span>{tab.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    tab.active || activeTab === tab.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  ({tab.count})
                </span>
              </div>
            ))}
          </div>
  
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTasks.length)} /{" "}
                  {filteredTasks.length} bản ghi
                </span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Trang</span>
                <span className="font-medium">{currentPage.toString().padStart(2, "0")}</span>
                <span>/</span>
                <span>{totalPages.toString().padStart(2, "0")}</span>
              </div>
            </div>
  
            {/* <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <List className="w-4 h-4 mr-1" />
                Danh sách
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Kanban className="w-4 h-4 mr-1" />
                Kanban
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <BarChart3 className="w-4 h-4 mr-1" />
                Gantt
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Calendar className="w-4 h-4 mr-1" />
                Calendar
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <Upload className="w-4 h-4 mr-1" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <MoreHorizontal className="w-4 h-4 mr-1" />
                HD360
              </Button>
            </div> */}
          </div>
  
          <Card className="dashboard-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th className="w-12 p-4 text-left">
                      <Checkbox
                        checked={selectedTasks.length === paginatedTasks.length && paginatedTasks.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 font-medium text-sm">Tên dự án</th>
                    <th className="text-left p-4 font-medium text-sm">Trạng thái</th>
                    <th className="text-left p-4 font-medium text-sm">Khách hàng</th>
                    <th className="text-left p-4 font-medium text-sm">Giá trị</th>
                    <th className="text-left p-4 font-medium text-sm">Thời gian</th>
                    <th className="w-24 p-4 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTasks.map((task) => (
                    <tr key={task.project_id} className="border-t hover:bg-muted/30 transition-colors task-row">
                      <td className="table-cell">
                        <Checkbox
                          checked={selectedTasks.includes(task.project_id)}
                          onCheckedChange={() => toggleTaskSelection(task.project_id)}
                        />
                      </td>
                      
                      <td className="table-cell max-w-md">
                        <p className="text-sm line-clamp-2 text-foreground">{task.name}</p>
                      </td>
                      <td className="table-cell">
                        <Badge variant="secondary">
                          { tabs.find((dt:any)=> dt?.name_tag === task?.status)?.name}
                        </Badge>
                      </td>
                      <td className="table-cell max-w-md">
                        <p className="text-sm line-clamp-2 text-foreground">{task.name}</p>
                      </td>
                      <td className="table-cell max-w-md">
                        <p className="text-sm line-clamp-2 text-foreground">{task?.price?.toLocaleString("vi-VN")}đ</p>
                      </td>
                     
                      <td className="table-cell">
                        <span className="text-sm text-muted-foreground">{moment(task?.start_date).format('DD/MM/YYYY')} - {moment(task?.end_date).format('DD/MM/YYYY')}</span>
                      </td>
                      {/* <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 progress-bar">
                            <div className="progress-fill h-full" style={{ width: `100%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground font-medium min-w-[35px]">{100}%</span>
                        </div>
                      </td> */}
                     
                      <td className="table-cell">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Xem chi tiết" onClick={()=>{
                            router.push(`/project/info/${task?.project_id}`)
                          }}>
                            <Eye className="w-4 h-4 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setIdEdit(task?.project_id)
                            }}
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedTasks([task?.project_id])
                              setIsModalConfirmDelete(true)
                            }}
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
  
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTasks.length)} của{" "}
              {filteredTasks.length} bản ghi
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <ModalAddProject refBtnProject={refBtn}/>
          <ModalUpdateProject ID={idEdit as string} setID={setIdEdit} refBtnProject={refBtnEdit}/>
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
      // </DashboardLayout>
    )
}
