/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Forbiden from "@/components/Forbiden/Forbiden";
import Schedule from "@/components/Schedule/Schedule";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";
import { fetchGroupUser } from "@/redux/store/slices/userSlices/get_all_group.slice";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
// import Work from "@/components/Work/Work";

import { AppDispatch } from "@/redux/store/store";
import useCheckRole from "@/utils/CheckRole";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = useCheckRole([
    "admin-top",
    "activity",
    "activity-read",
    "work",
    "work-read",
  ]);
  useEffect(() => {
    if (isAuthorized) {
      // dispatch(fetchActivities({}));
      dispatch(fetchGroupUser());
      dispatch(fetchUserInfo());
      dispatch(fetchProjects());
      // dispatch(fetchTypeWork());
      // dispatch(fetchStatusWork());
    }
  }, [dispatch, isAuthorized]);
  return <div className="p-4">{isAuthorized ? <Schedule /> : <Forbiden />}</div>;
}
