"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import DashboardLayout from "@/components/shared/dashboard-layout"
import { Search, Filter, TrendingUp, Calendar, Trash2 } from "lucide-react"
import dynamic from "next/dynamic";
import contractService from "@/services/contractService."

const PieChart3D = dynamic(() => import("../../components/ui/pie-chart-3D"), {
  ssr: false,
});
export default function BusinessStatisticsPage() {
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"];
  const [monthlyData,setMonthlyData] = useState<any>([
    { month: "Tháng 1", value: 25 },
    { month: "Tháng 2", value: 55 },
    { month: "Tháng 3", value: 45 },
    { month: "Tháng 4", value: 60 },
    { month: "Tháng 5", value: 50 },
    { month: "Tháng 6", value: 75 },
    { month: "Tháng 7", value: 60 },
    { month: "Tháng 8", value: 90 },
    { month: "Tháng 9", value: 75 },
    { month: "Tháng 10", value: 55 },
    { month: "Tháng 11", value: 35 },
    { month: "Tháng 12", value: 75 },
  ])
  const [hcmData,setDataHcm] = useState<any>([])
  const [totalRevenue,setTotalRevenue] = useState<number>()
  const [revenueHcm,setRevenueHcm] = useState<number>()
  const [revenueHn,setRevenueHn] = useState<number>()
  const [profitHcm,setProfitHcm] = useState<number>()
  const [profitHn,setProfitHn] = useState<number>()
  const [searchQuery, setSearchQuery] = useState("")
const dataPie = [
    { category: "Chủ đầu tư", value: 50 },
    { category: "Công ty cổ điển", value: 35 },
    { category: "Đối tác", value: 15 },
    { category: "Nội bộ", value: 5 },
  ];
  // Revenue data
  // const revenueData = {
  //   totalRevenue: "6.719.576.000",
  //   hanoi: { revenue: "3.119.263.000", profit: "721.116.000" },
  //   hochiminh: { revenue: "3.600.313.000", profit: "927.333.000" },
  // }

  const getDateRange = ()=> {
  const today = new Date();

  // Lấy ngày đầu tháng
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  // Hàm format ngày dạng d/m/yyyy
  function formatDate(date:any) {
    const d = date.getDate();
    const m = date.getMonth() + 1; // tháng trong JS bắt đầu từ 0
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  }

  return `${formatDate(firstDay)}-${formatDate(today)}`;
}
  // Chart data for Ho Chi Minh City
  // const hcmData = [
  //   { label: "Máy giữ xe", count: 118, color: "bg-red-400" },
  //   { label: "Kiểm soát cửa", count: 87, color: "bg-teal-400" },
  //   { label: "Phần tăng thang máy", count: 98, color: "bg-yellow-400" },
  //   { label: "Camera", count: 35, color: "bg-orange-400" },
  // ]

  // Funding sources data
  const fundingSources = [
    { name: "Chủ đầu tư", percentage: 50, color: "#F59E0B" },
    { name: "Công ty cổ điển", percentage: 35, color: "#3B82F6" },
    { name: "Đối tác", percentage: 15, color: "#10B981" },
    { name: "Nội bộ", percentage: 5, color: "#EF4444" },
  ]

  // Monthly trend data (simplified)
  // const monthlyData = [
  //   { month: "Tháng 1", value: 25 },
  //   { month: "Tháng 2", value: 55 },
  //   { month: "Tháng 3", value: 45 },
  //   { month: "Tháng 4", value: 60 },
  //   { month: "Tháng 5", value: 50 },
  //   { month: "Tháng 6", value: 75 },
  //   { month: "Tháng 7", value: 60 },
  //   { month: "Tháng 8", value: 90 },
  //   { month: "Tháng 9", value: 75 },
  //   { month: "Tháng 10", value: 55 },
  //   { month: "Tháng 11", value: 35 },
  //   { month: "Tháng 12", value: 75 },
  // ]

  const getMonthRangeTimestamps =()=> {
  const now = new Date(); // thời điểm hiện tại

  // Bắt đầu tháng: 00:00 ngày 1
  const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

  // Kết thúc: chính là "bây giờ"
  const end = now;

  return {
    startMs: start.getTime().toString(), // mili giây
    endMs: end.getTime().toString(),
    startSec: Math.floor(start.getTime() / 1000).toString(), // giây
    endSec: Math.floor(end.getTime() / 1000).toString()
  };
}

  const fetchData = async()=>{
    const timestampOK = getMonthRangeTimestamps()
    const hcmData = await contractService.getSalesByProvince({timestamp_end:timestampOK.endSec,timestamp_start:timestampOK.startSec,ids:'04fd27de-6321-47e9-bb67-613133e11e90'})
    const hnData = await contractService.getSalesByProvince({timestamp_end:timestampOK.endSec,timestamp_start:timestampOK.startSec,ids:'40651c65-d484-4781-8564-3d1f5ecf4730'})
    const revenueList = await contractService.getDashboardRevenue(new Date().getFullYear())
    let exportHcm = 0
    const totalHcm = hcmData?.statusCode === 200? hcmData?.data?.reduce((total:any,curr:any)=>{
      const totalCurr = curr?.datas?.reduce((totalOK:any,currOK:any)=>{
        if(currOK?.type === "export"){
          exportHcm = exportHcm + currOK?.price
          return totalOK
        }
         return totalOK + currOK?.price
      },0)
      return totalCurr + total
    },0):0
    let exportHn = 0
    const totalHn = hnData?.statusCode === 200? hnData?.data?.reduce((total:any,curr:any)=>{
      const totalCurr = curr?.datas?.reduce((totalOK:any,currOK:any)=>{
        if(currOK?.type === "export"){
          exportHn = exportHn + currOK?.price
          return totalOK
        }
         return totalOK + currOK?.price
      },0)
      return totalCurr + total
    },0) :0
    setTotalRevenue(totalHcm+totalHn)
    setProfitHcm(totalHcm - exportHcm)
    setProfitHn(totalHn - exportHn)
    setRevenueHcm(totalHcm)
    setDataHcm(hcmData?.data)
    setRevenueHn(totalHn)
    setMonthlyData((prev:any)=>{
      const dataRes = revenueList?.statusCode === 200 ?revenueList?.data?.list:[]
      return prev.map((dt:any,index:number)=>{
        const dataOK = dataRes.find((dtt:any)=> dtt.month === index+1)
        if(dataOK){
          return {...dt,value:(dataOK?.totalPrice/revenueList?.data?.max)*100}
        }
        return {...dt,value:0}
      })
    })
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
              <h1 className="text-2xl font-bold text-gray-900"></h1>
              <p className="text-gray-600">Thống kê kết quả kinh doanh từ {getDateRange()}</p>
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
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Lọi tất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="hanoi">Hà Nội</SelectItem>
                  <SelectItem value="hcm">TP.HCM</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Bộ lọc
              </Button>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">Chi tiết</button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tổng doanh số
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 w-full overflow-hidden">
                {/* Simple line chart representation */}
                <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <line
                      key={y}
                      x1="20"
                      y1={y * 1.6 + 20}
                      x2="280"
                      y2={y * 1.6 + 20}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Data lines */}
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    points={monthlyData.map((d:any, i:any) => `${20 + i * 22},${180 - d.value * 1.5}`).join(" ")}
                  />
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    points={monthlyData.map((d:any, i:any) => `${20 + i * 22},${180 - (d.value - 10) * 1.5}`).join(" ")}
                  />

                  {/* Data points */}
                  {monthlyData.map((d:any, i:any) => (
                    <circle key={i} cx={20 + i * 22} cy={180 - d.value * 1.5} r="3" fill="#3B82F6" />
                  ))}
                </svg>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card className="bg-primary text-primary-foreground items-center justify-center">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Tổng doanh số bán hàng</h3>
                <p className="text-3xl font-bold">{(totalRevenue||0).toLocaleString('vi-VN')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by City */}
          <div className="space-y-4 flex flex-col">
            <Card className="flex-1 justify-center">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Doanh số Hà Nội</p>
                    <p className="text-xl font-bold text-gray-900">{(revenueHn||0).toLocaleString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lợi nhuận Hà Nội</p>
                    <p className="text-xl font-bold text-orange-600">{(profitHn||0).toLocaleString('vi-VN')}</p>
                  </div>
                </div>
              </CardContent>
            </Card >

            <Card className="flex-1 justify-center">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Doanh số Hồ Chí Minh</p>
                    <p className="text-xl font-bold text-gray-900">{(revenueHcm||0).toLocaleString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lợi nhuận Hồ Chí Minh</p>
                    <p className="text-xl font-bold text-orange-600">{(profitHcm||0).toLocaleString('vi-VN')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Ho Chi Minh City Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Doanh số TP. Hồ Chí Minh</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hcmData?.map((item:any, index:number) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{item?.type_product?.name}</span>
                        <span className="text-sm font-medium">{item?.datas?.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${colors?.[index]}`}
                          style={{ width: `${(item?.datas?.length / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Funding Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Nguồn hợp đồng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {/* <div className="relative w-64 h-64 mx-auto mb-6">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <defs>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
                      </filter>
                    </defs>

                    {(() => {
                      let cumulativePercentage = 0
                      return fundingSources.map((item, index) => {
                        const startAngle = (cumulativePercentage * 360) / 100
                        const endAngle = ((cumulativePercentage + item.percentage) * 360) / 100
                        const startAngleRad = (startAngle * Math.PI) / 180
                        const endAngleRad = (endAngle * Math.PI) / 180

                        const largeArcFlag = item.percentage > 50 ? 1 : 0
                        const x1 = 100 + 80 * Math.cos(startAngleRad)
                        const y1 = 100 + 80 * Math.sin(startAngleRad)
                        const x2 = 100 + 80 * Math.cos(endAngleRad)
                        const y2 = 100 + 80 * Math.sin(endAngleRad)

                        const pathData = [
                          `M 100 100`,
                          `L ${x1} ${y1}`,
                          `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                          `Z`,
                        ].join(" ")

                        const labelAngle = (startAngle + endAngle) / 2
                        const labelAngleRad = (labelAngle * Math.PI) / 180
                        const labelX = 100 + 60 * Math.cos(labelAngleRad)
                        const labelY = 100 + 60 * Math.sin(labelAngleRad)

                        cumulativePercentage += item.percentage

                        return (
                          <g key={index}>
                            <path
                              d={pathData}
                              fill={item.color}
                              stroke="white"
                              strokeWidth="2"
                              filter="url(#shadow)"
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-sm font-bold fill-white"
                              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                            >
                              {item.percentage}%
                            </text>
                          </g>
                        )
                      })
                    })()}
                  </svg>
                </div> */}
                <PieChart3D data={dataPie} />
                {/* Legend */}
                {/* <div className="w-full max-w-xs space-y-3">
                  {fundingSources.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-600 font-medium">{item.percentage}%</span>
                      <span className="text-gray-700 flex-1">{item.name}</span>
                    </div>
                  ))}
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    //  </DashboardLayout>
  )
}
