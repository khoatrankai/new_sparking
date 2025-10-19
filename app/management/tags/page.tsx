/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import TagWorkPage from "@/components/Activity/Tool/Modal/ModalTagWork/ModalTagWork";
import Forbiden from "@/components/Forbiden/Forbiden";
import { fetchTagWork } from "@/redux/store/slices/activitySlices/get_all_tag.slice";
// import User from "@/components/v2/User/User";
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
      dispatch(fetchTagWork());
    }
  }, [dispatch, isAuthorized]);
  return <div className="p-4">{isAuthorized ? <TagWorkPage /> : <Forbiden />}</div>;
}
