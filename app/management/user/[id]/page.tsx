"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import DashboardLayout from "@/components/shared/dashboard-layout"
import { Search, Plus, Mail, Phone, MapPin, User, FileText, CheckCircle2, Circle } from "lucide-react"
import RadarChart from "@/components/ui/spider-chart"
import { Progress } from "@/components/ui/progress"
import { IDocuments, InfoUser, ISkills } from "@/models/userInterface"
import { useParams, useSearchParams } from "next/navigation"
import userService from "@/services/userService"
import activityService from "@/services/activityService"
import ReportWork from "@/components/Reports/ReportWork/ReportWork"
// const mockData = [
//   { 'Thành phần': 'Design', type: 'Điểm yêu cầu', 'Điểm': 70 },
//   { 'Thành phần': 'Design', type: 'Điểm đạt được', 'Điểm': 30 },
//   { 'Thành phần': 'Development', type: 'Điểm yêu cầu', 'Điểm': 60 },
//   { 'Thành phần': 'Development', type: 'Điểm đạt được', 'Điểm': 70 },
//   { 'Thành phần': 'Marketing', type: 'Điểm yêu cầu', 'Điểm': 50 },
//   { 'Thành phần': 'Marketing', type: 'Điểm đạt được', 'Điểm': 60 },
//   { 'Thành phần': 'Users', type: 'Điểm yêu cầu', 'Điểm': 40 },
//   { 'Thành phần': 'Users', type: 'Điểm đạt được', 'Điểm': 50 },
//   { 'Thành phần': 'Test', type: 'Điểm yêu cầu', 'Điểm': 60 },
//   { 'Thành phần': 'Test', type: 'Điểm đạt được', 'Điểm': 70 },
//   { 'Thành phần': 'Language', type: 'Điểm yêu cầu', 'Điểm': 70 },
//   { 'Thành phần': 'Language', type: 'Điểm đạt được', 'Điểm': 50 },
//   { 'Thành phần': 'Technology', type: 'Điểm yêu cầu', 'Điểm': 50 },
//   { 'Thành phần': 'Technology', type: 'Điểm đạt được', 'Điểm': 40 },
//   { 'Thành phần': 'Support', type: 'Điểm yêu cầu', 'Điểm': 30 },
//   { 'Thành phần': 'Support', type: 'Điểm đạt được', 'Điểm': 40 },
//   { 'Thành phần': 'Sales', type: 'Điểm yêu cầu', 'Điểm': 60 },
//   { 'Thành phần': 'Sales', type: 'Điểm đạt được', 'Điểm': 40 },
//   { 'Thành phần': 'UX', type: 'Điểm yêu cầu', 'Điểm': 50 },
//   { 'Thành phần': 'UX', type: 'Điểm đạt được', 'Điểm': 60 },
// ];
export default function HRProfilePage() {
  const {id} = useParams()
  const [activeTab,setActiveTab] = useState<any>('info')
  const [mockData,setMockData] = useState<any>([])
  const [tasks,setTasks] = useState<any>([])
  const [dataEfficiency,setDataEfficiency] = useState<any>()
  const [dataUser,setDataUser] = useState<InfoUser>()
  const [maxNumber,setMaxNumber] = useState<number>(1) 
  const [maxEfficiency,setMaxEfficiency] = useState<number>(0) 
  const [searchQuery, setSearchQuery] = useState("")

  // Employee profile data
  // const employee = {
  //   name: "NGUYỄN THIÊN NHÃ",
  //   position: "Trưởng phòng Kinh doanh",
  //   employeeId: "SP 079190001116",
  //   department: "Phòng Kinh doanh",
  //   avatar: "/user-profile-illustration.png",
  //   contact: {
  //     email: "nha.nguyen@sparking.com.vn",
  //     phone: "0943262718",
  //     birthDate: "16/3/1999",
  //     address: "124/77 Huỳnh Tấn Phát, Phú Thuận, Q.7, HCM",
  //     gender: "Nữ",
  //   },
  // }

  // Skills data for radar chart
// const performanceData = [
//   { label: "Thái độ", value: 85, color: "bg-chart-1" },
//   { label: "Đúng giờ", value: 92, color: "bg-chart-2" },
//   { label: "Tận tâm", value: 78, color: "bg-chart-3" },
//   { label: "Trách nhiệm", value: 88, color: "bg-chart-4" },
//   { label: "Kỷ luật", value: 95, color: "bg-chart-5" },
// ]

  // Work performance data
  const workMetrics = [
    { label: "Chỉ số", value: "Tổng số", count: 540 },
    { label: "Ngày công", value: "Tổng công", count: 180 },
    { label: "Dự án", value: "Số lần", count: 10 },
    { label: "Vệ sinh", value: "Lần", count: 15 },
    { label: "Xin nghỉ", value: "Giờ", count: 2 },
    { label: "Tăng ca", value: "Giờ", count: 100 },
  ]

  // Achievement progress data
  // const achievements = [
  //   { title: "Hoàn thành trước hạn", progress: 540, color: "bg-teal-500" },
  //   { title: "Hoàn thành đúng hạn", progress: 540, color: "bg-teal-500" },
  //   { title: "Hoàn thành quá hạn", progress: 540, color: "bg-teal-500" },
  //   { title: "Chưa hoàn thành", progress: 540, color: "bg-red-500" },
  // ]

  // Development progress data
//   const tasks = [
//   { id: 1, title: "Ảnh cá nhân", completed: true, date: "07 Th 3, 2021" },
//   { id: 2, title: "Thông cấp, thông tin chuyển môn", completed: true, date: "07 Th 3, 2021" },
//   { id: 3, title: "Cam kết làm việc", completed: true, date: "07 Th 3, 2021" },
//   { id: 4, title: "CV/Hồ sơ", completed: true, date: "07 Th 3, 2021" },
//   { id: 5, title: "Hợp đồng lao động", completed: false, date: "07 Th 3, 2021" },
//   { id: 6, title: "Quyết định tham gia đội hợp đồng", completed: false, date: "07 Th 3, 2021" },
// ]
  // Tab navigation
  const tabs = [
    { name: "Thông tin chung",name_tag:'info', active: true },
    { name: "Báo cáo công việc",name_tag:'report', active: false },
    // { name: "Sơ yếu lý lịch", active: false },
    // { name: "Công việc & Hợp đồng", active: false },
    // { name: "Bảo hiểm & Phúc lợi", active: false },
    // { name: "Lương & Phụ cấp", active: false },
  ]
  const fetchData = async()=>{
    const res = await userService.getUserIDAdmin(id as string)
    if(res?.statusCode === 200){
      setDataUser(res?.data)
      let max=0
      if(res?.data?.number_workday > max){
        max = res?.data?.number_workday
      }
      if(res?.data?.number_golay > max){
        max = res?.data?.number_golay
      }
      if(res?.data?.number_leaveearly > max){
        max = res?.data?.number_leaveearly
      }
      if(res?.data?.number_rest > max){
        max = res?.data?.number_rest
      }
      if(res?.data?.number_overtime > max){
        max = res?.data?.number_overtime
      }
      setMaxNumber(max)
      setMockData(res?.data?.skills?.map((dt:ISkills)=>[{'Thành phần': dt.name, type: 'Điểm yêu cầu', 'Điểm': dt.score_request},{'Thành phần': dt.name, type: 'Điểm yêu cầu', 'Điểm': dt.score_review}]) || [])
      setTasks(res?.data?.document?.map((dt:IDocuments)=>{
        return {id: dt.document_id, title: dt.name, completed: true, date:''}
      }) || [])
    }
    const resEfficiency = await activityService.getWorkEfficiency(id as string)
    if(resEfficiency?.statusCode === 200){
      setDataEfficiency(resEfficiency?.data)
      let max = 1
      if(resEfficiency?.data?.yetComplete > max){
        max =resEfficiency?.data?.yetComplete
      }
      if(resEfficiency?.data?.completedBefore > max){
        max =resEfficiency?.data?.completedBefore
      }
      if(resEfficiency?.data?.completedSame > max){
        max =resEfficiency?.data?.completedSame
      }
      if(resEfficiency?.data?.completedAfter > max){
        max =resEfficiency?.data?.completedAfter
      }
      setMaxEfficiency(max)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    // <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NHÂN SỰ</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Thêm mới
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Lưu lại
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Ký số
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Biểu mẫu
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Biểu hiện
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 font-medium ${
                  tab.active ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={()=>{
                    setActiveTab(tab.name_tag)
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        {
          activeTab === "info" &&
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={dataUser?.picture_url || "/placeholder.svg"} alt={dataUser?.last_name} />
                  <AvatarFallback className="text-2xl">{dataUser?.last_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-gray-900">{dataUser?.first_name+" "+dataUser?.last_name}</h2>
                {/* <p className="text-gray-600">{dataUser?.group_user?.name_group}</p> */}
                <p className="text-sm text-gray-500">Mã nhân viên: {dataUser?.user_id}</p>
                <p className="text-sm text-gray-500">{dataUser?.group_user?.name_group}</p>
                <Button className="mt-4 bg-primary hover:bg-primary/90">Đang làm việc</Button>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Thông tin nhân sự</h3>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Email</span>
                  <span className="ml-auto text-gray-900">{dataUser?.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Số điện thoại</span>
                  <span className="ml-auto text-gray-900">{dataUser?.phone_number}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Facebook</span>
                  <span className="ml-auto text-gray-900">{dataUser?.link_facebook}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kỹ năng làm việc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-64 h-64 mx-auto">
                  <RadarChart data={mockData} />
                </div>
              </CardContent>
            </Card>
                     <Card>
              <CardHeader>
                <CardTitle>Tiến trình tiếp nhận hồ sơ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task:any) => (
                    <div key={task.id} className="flex items-center space-x-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-chart-1 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${task.completed ? "text-card-foreground" : "text-muted-foreground"}`}>
                          {task.title}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{task.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            
               <Card>
              <CardHeader>
                <CardTitle>Ý thức làm việc</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                <div key={0} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">Ngày công</span>
                    <span className="text-sm text-muted-foreground">{dataUser?.number_workday}</span>
                  </div>
                  <Progress value={dataUser?.number_workday} className="h-2" />
                </div>
                 <div key={1} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">Đi muộn</span>
                    <span className="text-sm text-muted-foreground">{dataUser?.number_golay}</span>
                  </div>
                  <Progress value={dataUser?.number_golay} className="h-2" />
                </div>
                 <div key={2} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">Về sớm</span>
                    <span className="text-sm text-muted-foreground">{dataUser?.number_leaveearly}</span>
                  </div>
                  <Progress value={dataUser?.number_leaveearly} className="h-2" />
                </div>
                 <div key={3} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">Xin nghỉ</span>
                    <span className="text-sm text-muted-foreground">{dataUser?.number_rest}</span>
                  </div>
                  <Progress value={dataUser?.number_rest} className="h-2" />
                </div>
                 <div key={4} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-card-foreground">Tăng ca</span>
                    <span className="text-sm text-muted-foreground">{dataUser?.number_overtime}</span>
                  </div>
                  <Progress value={dataUser?.number_overtime} className="h-2" />
                </div>
            </div>
              </CardContent>
            </Card>
           <Card>
              <CardHeader>
                <CardTitle>Hiệu quả công việc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-teal-50 rounded-lg">
                    <p className="text-2xl font-bold text-teal-600">540</p>
                    <p className="text-sm text-gray-600">việc</p>
                  </div>

                    <div key={0} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">Hoàn thành trước thời hạn</span>
                          <span className="text-sm font-medium">{dataEfficiency?.completedBefore}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className={`h-1 rounded-full bg-teal-500`} style={{ width: `${dataEfficiency?.completedBefore*100/maxEfficiency}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div key={1} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">Hoàn thành sau thời hạn</span>
                          <span className="text-sm font-medium">{dataEfficiency?.completedAfter}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className={`h-1 rounded-full bg-teal-500`} style={{ width: `${dataEfficiency?.completedAfter*100/maxEfficiency}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div key={2} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">Hoàn thành đúng thời hạn</span>
                          <span className="text-sm font-medium">{dataEfficiency?.completedSame}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className={`h-1 rounded-full bg-teal-500`} style={{ width: `${dataEfficiency?.completedSame*100/maxEfficiency}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div key={3} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">Chưa hoàn thành</span>
                          <span className="text-sm font-medium">{dataEfficiency?.yetComplete}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div className={`h-1 rounded-full bg-red-500`} style={{ width: `${dataEfficiency?.yetComplete*100/maxEfficiency}%` }}></div>
                        </div>
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        }
        {
          activeTab === "report" &&
          <ReportWork/>
        }
       
      </div>
    // </DashboardLayout>
  )
}
