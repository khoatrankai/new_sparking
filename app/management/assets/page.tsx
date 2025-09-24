/* eslint-disable react-hooks/rules-of-hooks */
"use client";
// import Asset from "@/components/Assets/Asset";
import Forbiden from "@/components/Forbiden/Forbiden";
import AssetsPage from "@/components/v2/Assets/Asset";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchAssets } from "@/redux/store/slices/productSlices/get_asset.slice";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // if () {
      dispatch(fetchProjects());
      dispatch(fetchCustomerInfos());
      dispatch(fetchAssets())
    // }
  }, []);
  return (
    <div className="p-4">{true ? <AssetsPage /> : <Forbiden />}</div>
  );
}
