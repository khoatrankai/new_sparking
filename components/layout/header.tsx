"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Target, Home, MessageSquare, Bell, ChevronDown } from "lucide-react"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const router = useRouter()

  const handleSearchClick = () => {
    const searchInput = document.querySelector('input[placeholder*="Tìm kiếm"]') as HTMLInputElement
    if (searchInput) {
      searchInput.focus()
    }
  }

  const handleTargetClick = () => {
    router.push("/goals")
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  const handleMessageClick = () => {
    router.push("/messages")
  }

  const handleNotificationClick = () => {
    router.push("/notifications")
  } 

  return (
    <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 flex items-center justify-center">
              <img src="/s-logo.png" alt="S Logo" className="h-12 object-contain" />
            </div>
          </div>
          <div className="text-xl font-semibold"><span className="font-light">S PARKING</span> OFFICE</div>
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
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={handleMessageClick}
              title="Tin nhắn"
            >
              <MessageSquare className="w-5 h-5" />
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

          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/user-profile-illustration.png" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>
  )
}
