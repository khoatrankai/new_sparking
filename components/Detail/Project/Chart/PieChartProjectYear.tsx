/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import contractService from '@/services/contractService.';
import { useParams } from 'next/navigation';
import projectService from '@/services/projectService';

export const PieChartProjectYear = () => {
  const [dataDashboard,setDataDashboard] = useState<any>()
  const fetchData = async ()=>{
    const yearCurrent = new Date().getFullYear()
    const res = await projectService.getFilterProject({time_start:new Date(`${yearCurrent}-01-01`).getTime(),time_end:new Date(`${yearCurrent}-12-31`).getTime()})
    if(res.statusCode === 200){
      console.log(res)
      setDataDashboard(res.data)
    }
  }
  useEffect(()=>{
      fetchData()
    
  },[])
  const config = {
    data: [
      { type: 'Hoàn tất', value: dataDashboard?.filter((dt:any) => dt.status === "completed")?.length },
      { type: 'Tạm dừng', value: dataDashboard?.filter((dt:any) => dt.status === "pause")?.length  },
      { type: 'Đang thực hiện', value: dataDashboard?.filter((dt:any) => dt.status === "start" || dt.status === "waiting")?.length},
      { type: 'Đã hủy', value: dataDashboard?.filter((dt:any) => dt.status === "cancel")?.length },
    ],
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    label: false,
    
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,

      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: `${(dataDashboard?.filter((dt:any) => dt.status === "completed")?.length)*100/(dataDashboard?.length === 0 ?1 : dataDashboard?.length)}`+'%',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 15,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <Pie {...config} />;
};

