/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Menu } from "antd";
// import Link from "next/link";
import { AlertTriangle, BarChart3, Building, ChevronDown, Clock, DollarSign, FileText, List, Package, Settings, Shield, TrendingUp, Truck, UserCheck, Users, Warehouse } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
// import { GrMoney, GrSystem, GrUserWorker } from "react-icons/gr";
// import { FaUser, FaUserTie } from "react-icons/fa";
// import { TbActivityHeartbeat, TbZoomMoney } from "react-icons/tb";
// import { PiProjectorScreenChartFill } from "react-icons/pi";
// import { AiOutlineFundProjectionScreen } from "react-icons/ai";
// import { LuContainer } from "react-icons/lu";
// import { useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store/store";
// import { useDispatch } from "react-redux";
// import { toggleMenu } from "@/redux/store/slices/menu.slice";
// import useMedia from "use-media";

// type Props = {};

// type MenuItem = Required<MenuProps>["items"][number];
const sidebarItems = [
  { icon: List, label: "Công việc", path: "/work", hasSubmenu: true },
  { icon: BarChart3, label: "Dự án", path: "/project" },
  { icon: Clock, label: "Lịch trình", path: "/schedule" },
  { icon: FileText, label: "Báo cáo", path: "/reports" },
  { icon: DollarSign, label: "Ngân sách", path: "/budget" },
  // { icon: AlertTriangle, label: "Cảnh báo", path: "/alerts" },
  { icon: BarChart3, label: "Thống kê công việc", path: "/work-statistics" },
  { icon: TrendingUp, label: "Thống kê kinh doanh", path: "/business-statistics" },
  // { icon: UserCheck, label: "Hồ sơ nhân sự", path: "/hr-profile" },
  { icon: Settings, label: "Quản lý chung", path: "/management", hasSubmenu: true },
]

const subItems = ["Tất cả", "Bạn thực hiện", "Bạn đã giao", "Bạn theo dõi", "Phòng ban bạn"]


const managementItems = [
  { icon: UserCheck, label: "Nhân viên", path: "/management/user" },
  { icon: Building, label: "Phòng ban", path: "/management/departments" },
  { icon: Building, label: "Tags", path: "/management/tags" },
  { icon: Users, label: "Khách hàng", path: "/management/customers" },
  { icon: Truck, label: "Nhà cung cấp", path: "/management/suppliers" },
  { icon: Package, label: "Nhà thầu", path: "/management/contractors" },
  { icon: Warehouse, label: "Kho", path: "/management/warehouse" },
  { icon: Shield, label: "Quản lý tài sản", path: "/management/assets" },
]
const Sidebar = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const isMobile = useMedia({ maxWidth: 639 });
  // const { datas: dataRoleAccess } = useSelector(
  //   (state: RootState) => state.get_access_roles
  // );
  const searchParams = useSearchParams()
    const router = useRouter()
  const pathname = usePathname()
  const [expandedSidebar, setExpandedSidebar] = useState<string | null>(
    pathname === "/" ? "Công việc" : pathname.startsWith("/management") ? "Quản lý chung" : null,
  )

  const toggleSidebarItem = (label: string) => {
    setExpandedSidebar(expandedSidebar === label ? null : label)
  }

  const handleMenuClick = (item: any) => {
    if (item.hasSubmenu) {
      toggleSidebarItem(item.label)
    } else {
      router.push(item.path)
    }
  }

  const handleManagementClick = (item: any) => {
    router.push(item.path)
  }

  const handleWorkSubMenuClick = (subItem: string) => {
    const params = new URLSearchParams(searchParams.toString())
    switch (subItem) {
      case "Tất cả":
        
                    params.delete('type')
                    router.push(`/work?${params.toString()}`)
        break
      case "Bạn thực hiện":
                    params.set('type','perform')
                    router.push(`/work?${params.toString()}`)
        break
      case "Bạn đã giao":
        params.set('type','assigned')
        router.push(`/work?${params.toString()}`)
        break
      case "Bạn theo dõi":
        params.set('type','follow')
        router.push(`/work?${params.toString()}`)
        break
      case "Phòng ban bạn":
        params.set('type','group')
        router.push(`/work?${params.toString()}`)
        break
      case "Dự kiến":
        router.push("/?filter=planned")
        break
      case "Báo cáo":
        router.push("/reports")
        break
    }
  }

  const getActiveMenu = () => {
    // if (pathname === "/") return "Công việc"
    if (pathname === "/work") return "Công việc"
    if (pathname === "/project") return "Dự án"
    if (pathname === "/schedule") return "Lịch trình"
    if (pathname === "/reports") return "Báo cáo"
    if (pathname === "/budget") return "Ngân sách"
    if (pathname === "/alerts") return "Cảnh báo"
    if (pathname === "/work-statistics") return "Thống kê công việc"
    if (pathname === "/business-statistics") return "Thống kê kinh doanh"
    // if (pathname === "/hr-profile") return "Hồ sơ nhân sự"
    if (pathname.startsWith("/management")) {
      const managementItem = managementItems.find((item) => pathname === item.path)
      return managementItem ? managementItem.label : "Quản lý chung"
    }
    return ""
  }
 const activeMenu = getActiveMenu()
  return (
    //  <div
    //   className={`transition-all max-h-full fixed bottom-0 left-0 top-16 overflow-y-auto py-4 sm:w-52 w-full`}
    // >
       <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen">
          <div className="p-4">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-colors ${
                    activeMenu === item.label
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedSidebar === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </div>

                {/* Sub items for Công việc */}
                {item.label === "Công việc" && expandedSidebar === "Công việc" && (
                  <div className="ml-6 mb-2">
                    {subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer rounded transition-colors hover:bg-sidebar-accent"
                        onClick={() => handleWorkSubMenuClick(subItem)}
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub items for Quản lý chung */}
                {item.label === "Quản lý chung" && expandedSidebar === "Quản lý chung" && (
                  <div className="ml-6 mb-2">
                    {managementItems.map((mgmtItem, mgmtIndex) => (
                      <div
                        key={mgmtIndex}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer rounded transition-colors hover:bg-sidebar-accent ${
                          activeMenu === mgmtItem.label
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => handleManagementClick(mgmtItem)}
                      >
                        <mgmtItem.icon className="w-4 h-4" />
                        {mgmtItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
    // </div>
   
  );
};

export default Sidebar;
