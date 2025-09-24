/* eslint-disable react-hooks/rules-of-hooks */
"use client";
// import Contractor from "@/components/Contractor/Contractor";
import Forbiden from "@/components/Forbiden/Forbiden";
import Contractor from "@/components/v2/Contractor/Contractor";
import { fetchCustomerInfos } from "@/redux/store/slices/customerSlices/get_all_customer.slice";
import { fetchContractors } from "@/redux/store/slices/projectSlices/get_contractor.slice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// type Props = {}

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // if () {=
      dispatch(fetchCustomerInfos());
      dispatch(fetchContractors());
    // }
  }, []);
  return (
    <div className="p-4">{true ? <Contractor /> : <Forbiden />}</div>
  );
}
