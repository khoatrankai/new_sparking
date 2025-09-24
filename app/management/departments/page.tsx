/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Forbiden from "@/components/Forbiden/Forbiden";
import DepartmentsPage from "@/components/v2/User/Tool/Modal/ModalGroupUser/ModalGroupUser";
// import User from "@/components/v2/User/User";
import { fetchGroupUser } from "@/redux/store/slices/userSlices/get_all_group.slice";
import { fetchCategoryRole } from "@/redux/store/slices/userSlices/get_category_role.slice";
// import { fetchUserFilter } from "@/redux/store/slices/userSlices/get_filter_user.slice";
// import Work from "@/components/v2/Work/Work";
// import Work from "@/components/Work/Work";
// import { fetchActivities } from "@/redux/store/slices/activitySlices/activity.slice";
// import { fetchStatusWork } from "@/redux/store/slices/activitySlices/status_work.slice";
// import { fetchTypeWork } from "@/redux/store/slices/activitySlices/type_work.slice";
// import { fetchWorks } from "@/redux/store/slices/activitySlices/work.slide";
// import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import useCheckRole from "@/utils/CheckRole";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = useCheckRole(["admin-top", "user", "user-read"]);
  useEffect(() => {
    if (isAuthorized) {
      // dispatch(fetchUserFilter({}));
      dispatch(fetchCategoryRole());
      dispatch(fetchGroupUser());
    }
  }, [dispatch, isAuthorized]);
  return <div className="p-4">{isAuthorized ? <DepartmentsPage /> : <Forbiden />}</div>;
}
