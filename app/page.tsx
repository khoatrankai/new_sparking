/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Forbiden from "@/components/Forbiden/Forbiden";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Work from "@/components/v2/Work/Work";
// import Work from "@/components/Work/Work";
import { fetchActivities } from "@/redux/store/slices/activitySlices/activity.slice";
import { fetchTagWork } from "@/redux/store/slices/activitySlices/get_all_tag.slice";
import { fetchStatusWork } from "@/redux/store/slices/activitySlices/status_work.slice";
import { fetchTypeWork } from "@/redux/store/slices/activitySlices/type_work.slice";
import { fetchWorks } from "@/redux/store/slices/activitySlices/work.slide";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";
import { fetchSystemProvinces } from "@/redux/store/slices/systemSlices/get_province.slice";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import useCheckRole from "@/utils/CheckRole";
import { ArrowRight, BarChart3, CalendarDays, Car, CheckCircle, Clock, Shield, Users } from "lucide-react";
import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  // const dispatch = useDispatch<AppDispatch>();
  // const isAuthorized = true;
  // useEffect(() => {
  //   if (isAuthorized) {
  //           dispatch(fetchActivities({}));
  //           dispatch(fetchWorks());
  //           dispatch(fetchTagWork());
  //           dispatch(fetchUserInfo());
  //           dispatch(fetchTypeWork());
  //           dispatch(fetchStatusWork());
  //           dispatch(fetchProjects());
  //           dispatch(fetchCustomerInfos());
  //           dispatch(fetchSystemProvinces());
  //   }
  // }, [dispatch, isAuthorized]);
  // return <div className="p-4">{isAuthorized ? <Work /> : <Forbiden />}</div>;
  return <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a2f] via-[#1f4a3a] to-[#245545] py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern-subtle.jpg')] opacity-5" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-emerald-300">
              <Shield className="h-4 w-4" />
              Hệ thống quản lý thông minh
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-balance">
              Chào mừng đến với <span className="text-primary">S Parking Office</span>
            </h1>
            <p className="mb-10 text-lg text-emerald-100/80 md:text-xl text-pretty">
              Giải pháp quản lý lịch trình, công việc và nhân sự toàn diện dành cho doanh nghiệp. Tối ưu hóa hiệu suất
              làm việc của đội ngũ một cách dễ dàng.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2" onClick={()=>{
                window.location.href = '/schedule'
              }}>
                Bắt đầu ngay
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<Users className="h-6 w-6" />} value="500+" label="Doanh nghiệp tin dùng" />
            <StatCard icon={<CalendarDays className="h-6 w-6" />} value="10,000+" label="Lịch trình được quản lý" />
            <StatCard icon={<Clock className="h-6 w-6" />} value="30%" label="Tiết kiệm thời gian" />
            <StatCard icon={<CheckCircle className="h-6 w-6" />} value="99.9%" label="Độ tin cậy" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Tính năng nổi bật</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Hệ thống S Parking Office cung cấp đầy đủ công cụ quản lý hiện đại, giúp doanh nghiệp vận hành hiệu quả
              hơn.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<CalendarDays className="h-8 w-8" />}
              title="Quản lý lịch trình"
              description="Tạo, cập nhật và xuất lịch làm việc hàng tuần cho toàn bộ nhân viên một cách dễ dàng."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Quản lý nhân sự"
              description="Theo dõi thông tin nhân viên, phân công công việc và quản lý nhóm hiệu quả."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Thống kê & Báo cáo"
              description="Xem báo cáo chi tiết về hiệu suất công việc, thống kê kinh doanh theo thời gian thực."
            />
            <FeatureCard
              icon={<Car className="h-8 w-8" />}
              title="Quản lý dự án"
              description="Theo dõi tiến độ dự án, phân bổ nguồn lực và đảm bảo deadline được hoàn thành."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Bảo mật cao"
              description="Hệ thống bảo mật đa lớp, đảm bảo an toàn cho dữ liệu doanh nghiệp."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Ngân sách & Chi phí"
              description="Quản lý ngân sách dự án, theo dõi chi phí và tối ưu hóa nguồn lực tài chính."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-[#1a3a2f] to-[#245545]">
            <CardContent className="p-10 md:p-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Sẵn sàng làm việc!</h2>
                <p className="mb-8 text-emerald-100/80">
                  Hãy sử dụng các công cụ của S Parking Office để tối ưu hoạt động doanh nghiệp của bạn.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="bg-white text-[#1a3a2f] hover:bg-white/90 gap-2" onClick={()=>{
                    window.location.href = "/work"
                  }}>
                    Xem công việc
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white bg-transparent hover:bg-white/10"
                  >
                    Liên hệ hỗ trợ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <img className="max-w-full" src='/image/header.png' />
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              {/* <span className="text-xl font-bold text-foreground">SPARK</span>
              <span className="text-xl font-bold text-primary">ING</span> */}
              <span className="text-xs text-muted-foreground">SMART SECURITY & PARKING</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 S Parking Office. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <Card className="border-border/50 bg-card">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-border/50 bg-card transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}