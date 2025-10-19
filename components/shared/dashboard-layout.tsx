"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Target,
  Home,
  MessageSquare,
  Bell,
  ChevronDown,
  List,
  BarChart3,
  Clock,
  FileText,
  DollarSign,
  AlertTriangle,
  Settings,
  UserCheck,
  Building,
  Users,
  Truck,
  Package,
  Warehouse,
  Shield,
  TrendingUp,
} from "lucide-react"

const sidebarItems = [
  { icon: List, label: "Công việc", path: "/", hasSubmenu: true },
  { icon: BarChart3, label: "Dự án", path: "/projects" },
  { icon: Clock, label: "Lịch trình", path: "/schedule" },
  { icon: FileText, label: "Báo cáo", path: "/reports" },
  { icon: DollarSign, label: "Ngân sách", path: "/budget" },
  { icon: AlertTriangle, label: "Cảnh báo", path: "/alerts" },
  { icon: BarChart3, label: "Thống kê công việc", path: "/work-statistics" },
  { icon: TrendingUp, label: "Thống kê kinh doanh", path: "/business-statistics" },
  // { icon: UserCheck, label: "Hồ sơ nhân sự", path: "/hr-profile" },
  { icon: Settings, label: "Quản lý chung", path: "/management", hasSubmenu: true },
]

const subItems = ["Tất cả", "Bạn thực hiện", "Bạn đã giao", "Bạn theo dõi", "Phòng ban bạn", "Dự kiến", "Báo cáo"]

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

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
    switch (subItem) {
      case "Tất cả":
        router.push("/?filter=all")
        break
      case "Bạn thực hiện":
        router.push("/?filter=assigned")
        break
      case "Bạn đã giao":
        router.push("/?filter=delegated")
        break
      case "Bạn theo dõi":
        router.push("/?filter=following")
        break
      case "Phòng ban bạn":
        router.push("/?filter=department")
        break
      case "Dự kiến":
        router.push("/?filter=planned")
        break
      case "Báo cáo":
        router.push("/reports")
        break
    }
  }

  const handleSearchClick = () => {
    alert("Chức năng tìm kiếm")
  }

  const handleTargetClick = () => {
    alert("Chức năng Mục tiêu đang được phát triển")
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  const handleMessageClick = () => {
    alert("Bạn có 5 tin nhắn mới")
  }

  const handleNotificationClick = () => {
    alert("Bạn có 3 thông báo mới:\n- Công việc cần được xem xét\n- Dự án mới được giao\n- Báo cáo tuần đã sẵn sàng")
  }

  const getActiveMenu = () => {
    if (pathname === "/") return "Công việc"
    if (pathname === "/projects") return "Dự án"
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
    <>
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="/s-logo.png" alt="S Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>
          <div className="text-xl font-semibold">S PARKING OFFICE</div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={handleSearchClick}
              title="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={handleTargetClick}
              title="Mục tiêu"
            >
              <Target className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={handleHomeClick}
              title="Trang chủ"
            >
              <Home className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2 relative"
              onClick={handleMessageClick}
              title="Tin nhắn"
            >
              <MessageSquare className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2 relative"
              onClick={handleNotificationClick}
              title="Thông báo"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
            </Button>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/user-profile-illustration.png" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Hồ sơ cá nhân</DropdownMenuItem>
              <DropdownMenuItem>Cài đặt</DropdownMenuItem>
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </>
  )
}
