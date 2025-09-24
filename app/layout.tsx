import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import LayoutHeader from "./LayoutHeader"
import CustomImage from "@/components/CustomImage/CustomImage"
import { ToastContainer } from "react-toastify"
import { StoreProvider } from "./StoreProvider"
import { DispatchProvider } from "./DispatchProvider"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "S PARKING OFFICE - Quản lý Dự án",
  description: "Hệ thống quản lý dự án thông minh cho bãi đỗ xe và an ninh",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <DispatchProvider>
        <html lang="vi" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="font-sans">
        <div className="min-h-screen bg-background">
           <Suspense fallback={<>Loading...</>}>
            <LayoutHeader>
              {children}
            </LayoutHeader>
            
            
            </Suspense>

            <ToastContainer />
            <CustomImage />
          </div>
      </body>
    </html>
      </DispatchProvider>
      </StoreProvider>
    
  )
}
