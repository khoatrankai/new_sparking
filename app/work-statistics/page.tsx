"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import dayjs from "dayjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import DashboardLayout from "@/components/shared/dashboard-layout"
import { Search, Filter, BarChart3, PieChart, Clock, CheckCircle, XCircle, AlertCircle, Pause } from "lucide-react"
import { IGetDashboardWorkFilter, IGetTypeWork } from "@/models/activityInterface"
import { RootState } from "@/redux/store/store"
import { useSelector } from "react-redux"
import activityService from "@/services/activityService"
import { DatePicker } from "antd"

export default function WorkStatisticsPage() {
  const { RangePicker } = DatePicker;
  const { datas: dataProjects } = useSelector(
      (state: RootState) => state.get_projects
    );
     const { datas: dataActivities } = useSelector(
      (state: RootState) => state.get_activities
    );
    const { datas: dataContracts } = useSelector(
      (state: RootState) => state.get_contracts
    );
   const [timeFirst, setTimeFirst] = useState<number | undefined>(
    );
    const [timeEnd, setTimeEnd] = useState<number | undefined>(
    );
     const [qtimeFirst, setqTimeFirst] = useState<string | undefined>(
    );
    const [qtimeEnd, setqTimeEnd] = useState<string | undefined>(
    );
  const [maxCount,setMaxCount] = useState<number>(100)
  const [selectProject,setSelectProject] = useState<string>()
  const [selectContract,setSelectContract] = useState<string>()
  const [selectActivity,setSelectActivity] = useState<string>()
  const [dataWork,setDataWork] = useState<IGetDashboardWorkFilter>()
  const [dataTypeWork,setDataTypeWork] = useState<IGetTypeWork[]>([])
  // Work status data
  const workStats = [
    { label: "Công việc đang thực hiện", count: dataWork?.process, percentage: (dataWork?.process ?? 0) / (dataWork?.works?.length ?? 1) *100, color: "bg-blue-500", icon: Clock },
    { label: "Công việc quá hạn", count: dataWork?.expire, percentage: (dataWork?.expire ?? 0) / (dataWork?.works?.length ?? 1) *100, color: "bg-red-500", icon: XCircle },
    { label: "Công việc hoàn thành", count: dataWork?.completed, percentage: (dataWork?.completed ?? 0) / (dataWork?.works?.length ?? 1) *100, color: "bg-green-500", icon: CheckCircle },
    { label: "Công việc hủy", count: dataWork?.cancel, percentage: (dataWork?.cancel ?? 0) / (dataWork?.works?.length ?? 1) *100, color: "bg-purple-500", icon: XCircle },
    { label: "Công việc chờ thực hiện", count: dataWork?.waitting, percentage: (dataWork?.waitting ?? 0) / (dataWork?.works?.length ?? 1) *100, color: "bg-yellow-500", icon: AlertCircle },
    { label: "Công việc chưa hoàn thành", count: dataWork?.not_completed, percentage: (dataWork?.not_completed ?? 0) / (dataWork?.works?.length ?? 1) *100, color: "bg-teal-500", icon: Pause },
  ]

  // Pie chart data for work distribution
  const pieChartData = [
    { name: "Đang thực hiện", value: (dataWork?.process??0) * 100 / (dataWork?.works?.length??1) , color: "#3B82F6" },
    { name: "Quá hạn", value: (dataWork?.expire??0) * 100 / (dataWork?.works?.length??1) , color: "#EF4444" },
    { name: "Chờ thực hiện", value: (dataWork?.waitting??0) * 100 / (dataWork?.works?.length??1) , color: "#F59E0B" },
    { name: "Hoàn thành", value: (dataWork?.completed??0) * 100 / (dataWork?.works?.length??1) , color: "#10B981" },
    { name: "Hủy", value: (dataWork?.cancel??0) * 100 / (dataWork?.works?.length??1) , color: "#8B5CF6" },
    { name: "Chưa hoàn thành", value: (dataWork?.not_completed??0) * 100 / (dataWork?.works?.length??1) , color: "#06B6D4" },
  ]

  // Status breakdown data
  // const statusBreakdown = [
  //   { label: "Khảo sát công việc mới", count: 118, color: "bg-red-400" },
  //   { label: "Thiết kế hồ sơ giải pháp", count: 87, color: "bg-teal-400" },
  //   { label: "Báo giá", count: 98, color: "bg-yellow-400" },
  //   { label: "Ký hợp đồng", count: 35, color: "bg-orange-400" },
  //   { label: "Triển khai thi công, lắp đặt", count: 118, color: "bg-red-400" },
  //   { label: "Bảo trì, bảo dưỡng", count: 87, color: "bg-teal-400" },
  //   { label: "Sự cố hệ thống chưa giải quyết", count: 98, color: "bg-yellow-400" },
  //   { label: "Sự cố hệ thống đã giải quyết", count: 35, color: "bg-orange-400" },
  // ]
  useEffect(()=>{
    if(dataTypeWork.length > 0){
      const max = dataTypeWork.reduce((preV:any,currV:any)=>{
        if((currV?.work?.length ?? 0) > preV){
          return currV.work?.length
        }
        return preV
      },100)
      setMaxCount(max)
    }
  },[dataTypeWork])
  useEffect(()=>{
    fetchData()
  },[selectActivity,selectContract,selectProject,timeFirst,timeEnd])
  const fetchData = async()=>{
    const resDashboardWork = await activityService.dashboardWorkByFilter({activity:selectActivity,contract:selectContract,project:selectProject,date_start:timeFirst?.toString(),date_end:timeEnd?.toString()})
    if(resDashboardWork?.statusCode === 200){
      setDataWork(resDashboardWork?.data)
    }
    const resDashboardTypeWork = await activityService.dashboardTypeWorkByFilter({activity:selectActivity,contract:selectContract,project:selectProject,date_start:timeFirst?.toString(),date_end:timeEnd?.toString()})
    if(resDashboardTypeWork?.statusCode === 200){
      setDataTypeWork(resDashboardTypeWork?.data)
    }
  }
  return (
    // <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">THỐNG KÊ CÔNG VIỆC</h1>
              <p className="text-gray-600">Thống kê kết quả kinh doanh {qtimeFirst === qtimeEnd && !qtimeFirst ? 'các quý':''} {qtimeFirst} {(qtimeFirst === qtimeEnd || !qtimeEnd) ?'':`- ${qtimeEnd}`}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div> */}
             
              <RangePicker
                          className="sm:w-auto w-full h-10"
                          picker={'quarter'}
                          value={[
                            timeFirst ? dayjs(timeFirst) : undefined,
                            timeEnd ? dayjs(timeEnd) : undefined,
                          ]}
                          onChange={(e, values) => {
                            if (values[0] === "" || values[1] === "") {
                              setTimeEnd(undefined);
                              setTimeFirst(undefined);
                              setqTimeEnd(undefined);
                              setqTimeFirst(undefined);
                            } else {
                             
                                if (values[0] !== "") {
                                  const dataStart = values[0].replace("Q", "").split("-");
                                  const dataEnd = values[1].replace("Q", "").split("-");
                                  const startQuarter = new Date(
                                    Number(dataStart[0]),
                                    (Number(dataStart[1]) - 1) * 3,
                                    1
                                  );
                                  const endQuarter = new Date(
                                    Number(dataEnd[0]),
                                    (Number(dataEnd[1]) - 1) * 3 + 3,
                                    0,
                                    23,
                                    59,
                                    59,
                                    59
                                  );
                                  setTimeFirst(startQuarter.getTime());
                                  setTimeEnd(endQuarter.getTime());
                                  setqTimeEnd(values[1]);
                                  setqTimeFirst(values[0]);
                                }
                              
                            }
                          }}
                          // value={}
                        />
              <Select onValueChange={setSelectProject}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  {
                    dataProjects?.map(dt => {
                      return <SelectItem value={dt.project_id}>{dt.name}</SelectItem>
                    })
                  }
                  
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectContract}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Chọn hợp đồng" />
                </SelectTrigger>
                <SelectContent>
                  {
                    dataContracts?.map(dt => {
                      return <SelectItem value={dt.contract_id}>{dt.name_contract}</SelectItem>
                    })
                  }
                  
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectActivity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Chọn hoạt động" />
                </SelectTrigger>
                <SelectContent>
                  {
                    dataActivities?.map(dt => {
                      return <SelectItem value={dt.activity_id}>{dt.name}</SelectItem>
                    })
                  }
                  
                </SelectContent>
              </Select>
              {/* <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
              </Button> */}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">Công việc</button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Chi tiết</button>
          </div>
        </div>

        {/* Work Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {workStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${stat.color.replace("bg-", "bg-").replace("-500", "-100")}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stat.color} text-white`}
                    >
                      {stat.percentage}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Tỉ lệ công việc thực hiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mx-auto mb-4">
                  <div className="w-full h-full rounded-full relative overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                        #3B82F6 0deg 144deg,
                        #EF4444 144deg 252deg,
                        #F59E0B 252deg 342deg,
                        #10B981 342deg 360deg
                      )`,
                      }}
                    >
                      <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{dataWork?.works?.length ?? 0}</p>
                          <p className="text-sm text-gray-600">Tổng công việc</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="w-full max-w-xs space-y-2">
                  {pieChartData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 flex-1">{item.name}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Trạng thái công việc thực hiện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {
                  dataTypeWork?.map(dt =>{
                    return <>
                      <div key={dt.type_work_id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 truncate pr-2">{dt.name}</span>
                      <span className="text-sm font-medium flex-shrink-0">{dt?.work?.length ?? 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${((dt?.work?.length ?? 0) / maxCount) < 0.3?'bg-orange-400':((dt?.work?.length ?? 0) / maxCount) < 0.7 ? 'bg-teal-400':((dt?.work?.length ?? 0) / maxCount) < 0.9 ?'bg-yellow-400':'bg-red-400'} transition-all duration-300`}
                        style={{ width: `${Math.min(((dt?.work?.length ?? 0) / maxCount) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                    </>
                  })
                }
                {/* {statusBreakdown.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 truncate pr-2">{item.label}</span>
                      <span className="text-sm font-medium flex-shrink-0">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                        style={{ width: `${Math.min((item.count / 118) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    // </DashboardLayout>
  )
}
