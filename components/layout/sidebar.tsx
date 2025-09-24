"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
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
  ChevronDown,
} from "lucide-react"

const sidebarItems = [
  { icon: List, label: "Công việc", path: "/", hasSubmenu: true },
  { icon: BarChart3, label: "Dự án", path: "/projects" },
  { icon: Clock, label: "Time sheet", path: "/timesheet" },
  { icon: FileText, label: "Báo cáo", path: "/reports" },
  { icon: DollarSign, label: "Ngân sách", path: "/budget" },
  { icon: AlertTriangle, label: "Cảnh báo", path: "/alerts" },
  { icon: Settings, label: "Quản lý chung", path: "/management", hasSubmenu: true },
]

const subItems = ["Tất cả", "Bạn thực hiện", "Bạn đã giao", "Bạn theo dõi", "Phòng ban bạn", "Dự kiến", "Báo cáo"]

const managementItems = [
  { icon: UserCheck, label: "Nhân viên", path: "/management/user" },
  { icon: Building, label: "Phòng ban", path: "/management/departments" },
  { icon: Users, label: "Khách hàng", path: "/management/customers" },
  { icon: Truck, label: "Nhà cung cấp", path: "/management/suppliers" },
  { icon: Package, label: "Nhà thầu", path: "/management/contractors" },
  { icon: Warehouse, label: "Kho", path: "/management/warehouse" },
  { icon: Shield, label: "Quản lý tài sản", path: "/management/assets" },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [expandedSidebar, setExpandedSidebar] = useState<string | null>("Công việc")

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
    // Handle work submenu navigation
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
      // case "Dự kiến":
      //   router.push("/?filter=planned")
      //   break
      // case "Báo cáo":
      //   router.push("/reports")
      //   break
      default:
        break
    }
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <aside className={`w-64 bg-sidebar border-r border-sidebar-border min-h-screen ${className}`}>
      <div className="p-4">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-colors ${
                isActive(item.path)
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
                      isActive(mgmtItem.path)
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
  )
}
