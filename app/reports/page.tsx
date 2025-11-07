"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Clock, Download, Filter, Calendar, PieChart, Activity } from "lucide-react"
import { ChartPie } from "@/components/Detail/Project/Chart/PieChart"
import ChartColumnProject from "@/components/Detail/Project/Chart/ChartColumn"
import activityService from "@/services/activityService"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice"
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice"
import projectService from "@/services/projectService"
import userService from "@/services/userService"
import { PieChartProjectYear } from "@/components/Detail/Project/Chart/PieChartProjectYear"

export default function ReportsPage() {
  // const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [projectStats,setProjectStats] = useState<any>({
      title: "Tổng dự án",
      value: 1,
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    })
    const [workStats,setWorkStats] = useState<any>({
      title: "Tổng dự án",
      value: 1,
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    })
    const [userStats,setUserStats] = useState<any>({
      title: "Tổng dự án",
      value: 1,
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    })
    const [timeKeepingStats,setTimeKeepingStats] = useState<any>({
      title: "Tổng dự án",
      value: 1,
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
    })
  const dispatch = useDispatch<AppDispatch>();
const { datas: dataProject } = useSelector(
    (state: RootState) => state.get_projects
  );
  const { datas: dataUsers } = useSelector(
      (state: RootState) => state.get_users
    );
  const stats = [
    {
      title: "Tổng dự án",
      value: projectStats.value,
      change: projectStats.change,
      trend: projectStats.trend,
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Công việc hoàn thành",
      value: workStats.value,
      change: workStats.change,
      trend: workStats.trend,
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Thành viên tham gia",
     value: userStats.value,
      change: userStats.change,
      trend: userStats.trend,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Giờ làm việc",
       value: timeKeepingStats.value,
      change: timeKeepingStats.change,
      trend: timeKeepingStats.trend,
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  // const projectProgress = [
  //   { name: "Hệ thống quản lý bãi đỗ xe", progress: 85, status: "Đang thực hiện" },
  //   { name: "Ứng dụng mobile", progress: 60, status: "Đang thực hiện" },
  //   { name: "Nâng cấp bảo mật", progress: 100, status: "Hoàn thành" },
  //   { name: "Dashboard analytics", progress: 40, status: "Đang thực hiện" },
  // ]

  const [teamPerformance,setTeamPerformance] = useState([
    { name: "Nguyễn Văn A", tasks: 24, completed: 22, efficiency: 92 },
    { name: "Trần Thị B", tasks: 18, completed: 16, efficiency: 89 },
    { name: "Lê Văn C", tasks: 20, completed: 17, efficiency: 85 },
    { name: "Phạm Thị D", tasks: 15, completed: 14, efficiency: 93 },
  ])
  const fetchData = async()=>{
    dispatch(fetchProjects())
    dispatch(fetchUserInfo())
    const res = await activityService.getUserWork()
    if(res?.statusCode === 200){
      setTeamPerformance(res?.data?.result?.map((dt:any) => {
        return {
          name:dt.user_id,tasks:res?.data?.count,completed:dt?.work_count,efficiency:dt?.work_count*100/res?.data?.count
        }
      }))
    }
    const yearCurrent = new Date().getFullYear()
    const resProjectold = await projectService.getFilterProject({time_start:new Date(`${yearCurrent-1}-01-01`).getTime(),time_end:new Date(`${yearCurrent-1}-12-31`).getTime()})
    const resProjectnew = await projectService.getFilterProject({time_start:new Date(`${yearCurrent}-01-01`).getTime(),time_end:new Date(`${yearCurrent}-12-31`).getTime()})
    const lengolenew = resProjectnew?.data?.length - resProjectold?.data?.length
    if(lengolenew >= 0){
      setProjectStats({
        ...projectStats,value:resProjectnew?.data?.length,change:"+"+((lengolenew*100/(resProjectold?.data?.length === 0?1:resProjectold?.data?.length)))+"%",trend:"up"
      })
    }else{
      setProjectStats({
        ...projectStats,value:resProjectnew?.data?.length,change:"-"+((lengolenew*100/(resProjectold?.data?.length === 0?1:resProjectold?.data?.length)))+"%",trend:"down"
      })
    }

    const resWorkold = await activityService.getWorkCompleted({time_start:new Date(`${yearCurrent-1}-01-01`).getTime(),time_end:new Date(`${yearCurrent-1}-12-31`).getTime()})
    const resWorknew = await activityService.getWorkCompleted({time_start:new Date(`${yearCurrent}-01-01`).getTime(),time_end:new Date(`${yearCurrent}-12-31`).getTime()})
    const lengthWorkolenew = resWorknew?.data?.length - resWorkold?.data?.length
    if(lengthWorkolenew >= 0){
      setWorkStats({
        ...workStats,value:resWorknew?.data?.length,change:"+"+((lengthWorkolenew*100/(resWorkold?.data?.length === 0?1:resWorkold?.data?.length)))+"%",trend:"up"
      })
    }else{
      setWorkStats({
        ...workStats,value:resWorknew?.data?.length,change:"-"+((lengthWorkolenew*100/(resWorkold?.data?.length === 0?1:resWorkold?.data?.length)))+"%",trend:"down"
      })
    }

    const resUserold = await userService.getUserFilter({time_start:new Date(`${yearCurrent-1}-01-01`).getTime(),time_end:new Date(`${yearCurrent-1}-12-31`).getTime()})
    const resUsernew = await userService.getUserFilter({time_start:new Date(`${yearCurrent}-01-01`).getTime(),time_end:new Date(`${yearCurrent}-12-31`).getTime()})
    const lengthUserolenew = resUsernew?.data?.length - resUserold?.data?.length
    if(lengthUserolenew >= 0){
      setUserStats({
        ...userStats,value:resUsernew?.data?.length,change:"+"+((lengthUserolenew*100/(resUserold?.data?.length === 0?1:resUserold?.data?.length)))+"%",trend:"up"
      })
    }else{
      setWorkStats({
        ...userStats,value:resUsernew?.data?.length,change:"-"+((lengthWorkolenew*100/(resUserold?.data?.length === 0?1:resUserold?.data?.length)))+"%",trend:"down"
      })
    }
 const resTimeKeepingold = await userService.getTimekeepingFilter({time_start:new Date(`${yearCurrent-1}-01-01`).getTime(),time_end:new Date(`${yearCurrent-1}-12-31`).getTime()})
    const resTimeKeepingnew = await userService.getTimekeepingFilter({time_start:new Date(`${yearCurrent}-01-01`).getTime(),time_end:new Date(`${yearCurrent}-12-31`).getTime()})
    const lengthTimeKeepingolenew = resTimeKeepingnew?.data?.length - resTimeKeepingold?.data?.length
    if(lengthTimeKeepingolenew >= 0){
      setTimeKeepingStats({
        ...timeKeepingStats,value:resTimeKeepingnew?.data?.length,change:"+"+((lengthTimeKeepingolenew*100/(resTimeKeepingold?.data?.length === 0?1:resTimeKeepingold?.data?.length)))+"%",trend:"up"
      })
    }else{
      setTimeKeepingStats({
        ...timeKeepingStats,value:resTimeKeepingnew?.data?.length,change:"-"+((lengthTimeKeepingolenew*100/(resTimeKeepingold?.data?.length === 0?1:resTimeKeepingold?.data?.length)))+"%",trend:"down"
      })
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Báo cáo</h1>
            <p className="text-gray-600">Thống kê và phân tích hiệu suất</p>
          </div>
          <div className="flex items-center gap-3">
            {/* <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Chọn kỳ
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button> */}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      />
                      <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Tiến độ dự án
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataProject.slice(0, 6).map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          project.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {project.status === "completed"?'Hoàn thành':project.status === "cancel"?'Hủy':project.status === "pause"?'Tạm dừng':project.status === "start"?'Bắt đầu':'Đang chờ'}
                      </Badge>
                      <span className="text-sm font-medium">{project.status === "completed"?'100':project.status === "cancel"?'0':project.status === "pause"?'50':project.status === "start"?'5':'10'}%</span>
                    </div>
                  </div>
                  <Progress value={project.status === "completed"?100:project.status === "cancel"?0:project.status === "pause"?50:project.status === "start"?5:10} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Hiệu suất nhóm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{dataUsers?.find(dt => dt.user_id === member.name)?.first_name} {dataUsers?.find(dt => dt.user_id === member.name)?.last_name}</p>
                      <p className="text-sm text-gray-600">
                        {member.completed}/{member.tasks} công việc
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-teal-600">{member.efficiency}%</p>
                      <p className="text-xs text-gray-500">Hiệu suất</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ dự án mới theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex justify-center bg-gray-50 rounded-lg">
                {/* <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Biểu đồ sẽ được hiển thị tại đây</p>
                </div> */}
                <div className="h-64">
                <ChartColumnProject/>

                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ trạng thái dự án</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex justify-center bg-gray-50 rounded-lg">
                <div className="h-96">
                  <PieChartProjectYear/>
                </div>
                {/* <div className="text-center text-gray-500">
                  <PieChart className="w-12 h-12 mx-auto mb-2" />
                  <p>Biểu đồ tròn sẽ được hiển thị tại đây</p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
