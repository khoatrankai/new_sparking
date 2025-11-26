"use client";
import { toggleMenu } from "@/redux/store/slices/menu.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
// import { Avatar } from "antd";
import Image from "next/image";
import React, { Ref, useRef } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MenuAdmin from "../Menu/MenuAdmin/MenuAdmin";
import Notify from "../Notify/Notify";
import { Button } from "../ui/button";
import { Bell, ChevronDown, Home, MessageSquare, Search, Target } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import ModalUpdateUser from "../v2/User/Tool/Modal/ModalUpdateUser/ModalUpdateUser";
import ModalChangePassword from "../v2/User/Tool/Modal/ModalChangePassword";
import usePostData from "@/hooks/usePostData";
import userService from "@/services/userService";
import { fetchUserProfile } from "@/redux/store/slices/userSlices/get_profile.slice";
import { useRouter } from "next/navigation";
// import { exportToWord } from "@/lib/ReportDay/docx";
// import { exportToExcel } from "@/lib/ReportDay/excel";
// import { exportToPDF } from "@/lib/ReportDay/pdf";

// type Props = {};

const Header = () => {
  const {postdata} = usePostData()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const refBtnProfile = useRef<HTMLButtonElement>(null);
  const refBtnPassword = useRef<HTMLButtonElement>(null);
  const { datas: dataProfile } = useSelector(
    (state: RootState) => state.get_profile
  );
  const { datas: dataProject } = useSelector(
    (state: RootState) => state.get_projects
  );
  const { datas: countNotify } = useSelector(
    (state: RootState) => state.get_count_notify
  );
  const handleLogout = async () => {
    const statusCode = await postdata(() => userService.logoutUser());
    if (statusCode === 200) {
      dispatch(fetchUserProfile())
        .unwrap()
        .then((dt) => {
          if (dt.statusCode === 400) {
            router.push("/login");
          }
        })
        .catch(() => {
          router.push("/login");
        });
    }
  };
  return (
    // <div className="min-h-16 z-50 relative">
    //   <div className="h-16 bg-white px-4 flex justify-between items-center fixed inset-x-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
    //     <div className="flex items-center gap-2 h-full">
    //       <IoMenu
    //         className="h-8 w-8 cursor-pointer"
    //         onClick={() => {
    //           dispatch(toggleMenu());
    //         }}
    //       />
    //       <Image
    //         className="cursor-pointer"
    //         alt=""
    //         src={"/logo1.png"}
    //         height={40}
    //         width={140}
    //         onClick={() => {
    //           window.location.href = "/";
    //         }}
    //       />
    //     </div>
    //     {dataProfile ? (
    //       <div className="flex gap-4">
    //         <div className="relative group">
    //           <Badge count={countNotify}>
    //             <Button
    //               type="primary"
    //               icon={<FaBell />}
    //               className="w-8 h-8 rounded-full"
    //             />
    //           </Badge>

    //           <div className="absolute max-w-96 w-96 h-fit right-0 top-full z-50 bg-white invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
    //             <Notify />
    //           </div>
    //         </div>
    //         <div className="relative group">
    //           <Avatar
    //             alt=""
    //             src={dataProfile.picture_url}
    //             className="w-8 h-8"
    //           />
    //           <div className="absolute w-fit h-fit right-0 top-full z-50 bg-white invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
    //             <MenuAdmin />
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="rounded-full bg-[#00A9AE] w-fit h-fit p-2">
    //         <FaUser className="text-white" />
    //       </div>
    //     )}
    //   </div>
    // </div>
     <div className="min-h-16 z-50 relative">
      <div className="h-16 bg-white flex justify-between items-center fixed inset-x-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <header className="bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between shadow-sm w-full">
        <div className="flex items-center gap-6 cursor-pointer" onClick={()=>{
          window.location.href = '/'
        }}>
          <div className="flex items-center gap-3">
            <div className="h-12 flex items-center justify-center">
              <img src="/s-logo.png" alt="S Logo" className="h-12 object-contain" />
            </div>
          </div>
          <div className="text-xl font-semibold"><span className="font-light">S PARKING</span> OFFICE</div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-2">
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={()=>{}}
              title="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </Button> */}
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={()=>{}}
              title="Mục tiêu"
            >
              <Target className="w-5 h-5" />
            </Button> */}
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={()=>{router.push('/')}}
              title="Trang chủ"
            >
              <Home className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
              onClick={()=>{router.push(`/chat`)}}
              title="Tin nhắn"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10 p-2 relative group"
              onClick={()=>{}}
              title="Thông báo"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium">
                {countNotify}
              </div>
              <div className="absolute max-w-96 w-96 h-fit right-0 top-full z-50 bg-white invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                <Notify />
              </div>
            </Button>
          </nav>
<DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                     <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={dataProfile?.picture_url} />
                                  <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                                </Avatar>
                                <ChevronDown className="w-4 h-4" />
                                
                              </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {
                                      refBtnProfile.current?.click();
                                    }}>
                                      📂 Hồ sơ
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => refBtnPassword.current?.click()}>
                                      🔐 Đổi mật khẩu
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => {
                                        handleLogout()
                                      }} 
                                      className="text-red-500"
                                    >
                                      ◀️ Thoát
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
         
        </div>
      </header>
      </div>
      <ModalUpdateUser
        ID={dataProfile?.user_id as string}
        refBtnUser={refBtnProfile as Ref<HTMLButtonElement>}
      />
      <ModalChangePassword
        refBtnUser={refBtnPassword as Ref<HTMLButtonElement>}
      />
      </div>
     
  );
};

export default Header;
