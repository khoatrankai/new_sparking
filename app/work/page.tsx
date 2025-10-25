/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Forbiden from "@/components/Forbiden/Forbiden";
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
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = true;
  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchActivities({}));
      dispatch(fetchWorks());
      dispatch(fetchTagWork());
      dispatch(fetchUserInfo());
      dispatch(fetchTypeWork());
      dispatch(fetchStatusWork());
      dispatch(fetchProjects());
      dispatch(fetchCustomerInfos());
      dispatch(fetchSystemProvinces());
    }
  }, [dispatch, isAuthorized]);
  return <div className="p-4">{isAuthorized ? <Work /> : <Forbiden />}</div>;
}
