import {
  Button,
  DatePicker,
  Dropdown,
  MenuProps,
  Radio,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import moment from "moment";
import { IGetWork2 } from "@/models/activityInterface";
// import { fetchWorksFilter } from "@/redux/store/slices/activitySlices/work_filter.slide";
import Excel from "./Export/Excel";
import { FaRegFileExcel } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { fetchWorksFilterByUser } from "@/redux/store/slices/activitySlices/work_filter_by_user.slide";
import { useParams } from "next/navigation";
import { exportToExcel } from "@/lib/ReportDay/excel";
import { exportToWord } from "@/lib/ReportDay/docx";
import { exportToPDF } from "@/lib/ReportDay/pdf";
import { exportToExcelWeek } from "@/lib/ReportWeek/excel";
import { exportToWordWeek } from "@/lib/ReportWeek/docx";
import { exportToPDFWeek } from "@/lib/ReportWeek/pdf";
// import exportToPDF from "./Export/PDF";
export default function ReportWork() {
    const {id} = useParams()
  const [timeFirst, setTimeFirst] = useState<number | undefined>(
    new Date("2024-12-01").getTime()
  );
  const [timeEnd, setTimeEnd] = useState<number | undefined>(
    new Date("2024-12-31").getTime()
  );
  const weekdays = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];
  const [pageLimit, setPageLimit] = useState<number>(25);
  const [typeTime, setTypeTime] = useState< "date"|"week" | "month" | "year">("year");
  // const { RangePicker } = DatePicker;
  const dispatch = useDispatch<AppDispatch>();
  const { datas: dataSource } = useSelector(
    (state: RootState) => state.get_works_filter_by_user
  );

  const [dataFilter, setDataFilter] = useState<IGetWork2[] | [] | undefined>();
  const items: MenuProps["items"] = [
    {
      label: "Excel",
      key: "excel",
      icon: <FaRegFileExcel />,
    },
    {
      label: "PDF",
      key: "pdf",
      icon: <FaRegFileExcel />,
    },
    {
      label: "Word",
      key: "word",
      icon: <FaRegFileExcel />,
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "excel") {
      ExportExcel();
    }
    if (e.key === "word") {
      ExportWord();
    }

    if (e.key === "pdf") {
      ExportPDF();
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const columns: TableColumnsType<IGetWork2> = [
    {
      title:
      typeTime === "date"
          ? "Ngày"
          :
        typeTime === "month"
          ? "Tháng/Năm"
          : typeTime === "week"
          ? "Tuần/Năm"
          : "Năm",
      dataIndex: ["date"],
      key: "date",
      render: (value, record, index) => {
        if (dataFilter?.[index - 1]?.date === value) {
          return;
        } else {
          return value;
        }
      },
    },
    {
      title: "Tên công việc",
      dataIndex: "name",
      className: "text-xs",
      render: (value?: string) => value || "N/A",
      sorter: (a: IGetWork2, b: IGetWork2) =>
        (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Hoạt động",
      dataIndex: ["activity", "name"],
      className: "text-xs",
      render: (value?: number) => (value ? `${value}` : "N/A"),
      sorter: (a: IGetWork2, b: IGetWork2) =>
        (a.activity?.name || "").localeCompare(b.activity?.name || ""),
    },
    {
      title: "Hợp đồng",
      dataIndex: ["activity", "contract", "name_contract"],
      className: "text-xs",
      render: (value?: number) => (value ? `${value}` : "N/A"),
      sorter: (a: IGetWork2, b: IGetWork2) =>
        (a.activity?.contract?.name_contract || "").localeCompare(
          b.activity?.contract?.name_contract || ""
        ),
    },
    {
      title: "Tình trạng",
      dataIndex: ["status", "name"],
      className: "text-xs",
      render: (value?: string) => value || "N/A",
      sorter: (a: IGetWork2, b: IGetWork2) =>
        (a.status?.name || "").localeCompare(b.status?.name || ""),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "time_start",
      className: "text-xs",
      render: (value?: Date) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "N/A",
      sorter: (a: IGetWork2, b: IGetWork2) =>
        new Date(a.time_start || 0).getTime() -
        new Date(b.time_start || 0).getTime(),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "time_end",
      className: "text-xs",
      render: (value?: Date) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "N/A",
      sorter: (a: IGetWork2, b: IGetWork2) =>
        new Date(a.time_end || 0).getTime() -
        new Date(b.time_end || 0).getTime(),
    },
  ];
  useEffect(() => {
    setDataFilter(
      dataSource.map((dt, index) => {
        return { ...dt, key: index };
      })
    );
  }, [dataSource]);

  useEffect(() => {
    dispatch(
      fetchWorksFilterByUser({
        user:id as string,
        date_start: timeFirst ? timeFirst.toString() : undefined,
        date_end: timeEnd ? timeEnd.toString() : undefined,
        type: typeTime,
      })
    );
  }, [timeFirst, timeEnd, typeTime]);
  useEffect(() => {
    console.log(timeFirst, timeEnd);
  }, [timeFirst, timeEnd]);
  const handleSearchFilter = (value: string) => {
    setDataFilter(
      dataSource?.filter((dt) => {
        return String(
          dt.work_id +
            " " +
            dt.created_at +
            " " +
            dt.description +
            " " +
            dt?.activity?.contract?.name_contract +
            " " +
            dt?.date
        )
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  const ExportExcel = () => {
    
    if(typeTime === "date"){
      console.log(weekdays[new Date(timeFirst as any).getDay()],timeFirst)
       exportToExcel({
date:{
  date:weekdays[new Date(timeFirst as any).getDay()],
  day:new Date(timeFirst as any).getDate().toString(),
  month:new Date(timeFirst as any).getMonth().toString(),
  year: new Date(timeFirst as any).getFullYear().toString()
},
name:dataFilter?.[0]?.list_user?.[0]?.first_name +" "+dataFilter?.[0]?.list_user?.[0]?.last_name,
department: dataFilter?.[0]?.list_user?.[0]?.group_user?.name_group ?? "",
position: dataFilter?.[0]?.list_user?.[0]?.position ?? "",
notes:"",
workItems: dataFilter?.map((dt,index)=>{
  return {
    id:index,
    name:dt.name,
    description:dt.description ?? ""
  }
}) ?? []
    })
    }
    if(typeTime === "week"){
       exportToExcelWeek({
year:new Date(timeFirst as any).getFullYear().toString(),
name:dataFilter?.[0]?.list_user?.[0]?.first_name +" "+dataFilter?.[0]?.list_user?.[0]?.last_name,
department: dataFilter?.[0]?.list_user?.[0]?.group_user?.name_group ?? "",
position: dataFilter?.[0]?.list_user?.[0]?.position ?? "",
notes:"",
month:new Date(timeFirst as any).getMonth().toString(),
week:  moment(new Date(timeFirst as any)).isoWeek().toString(),
workItems: dataFilter?.map((dt,index)=>{
  return {
    id:index,
    name:dt.name,
    completed:dt.completed ?? "",
    uncompleted:dt.uncompleted??"",
    solution:dt.solution??"",
    time:new Date(dt.time_start ?? "").toLocaleDateString('vi-VN') +" - "+new Date(dt.time_end ?? "").toLocaleDateString('vi-VN')


  }
}) ?? []
    })
    }
   
    // const customeData = dataFilter?.map((dt) => {
    //   return {
    //     date: dt.date,
    //     name: dt.name,
    //     activity: dt.activity?.name,
    //     contract: dt.activity?.contract?.name_contract,
    //     status: dt.status.name,
    //     time_start: new Date(dt.time_start).toLocaleDateString("vi-VN"),
    //     time_end: new Date(dt.time_end).toLocaleDateString("vi-VN"),
    //     list_user: dt.list_user?.reduce((preValue, currValue, index) => {
    //       if (index === 0) {
    //         return currValue.first_name + " " + currValue.last_name;
    //       } else {
    //         return (
    //           preValue +
    //           " , " +
    //           currValue.first_name +
    //           " " +
    //           currValue.last_name
    //         );
    //       }
    //     }, ""),
    //   };
    // });
    // Excel(
    //   typeTime,
    //   customeData,
    //   new Date(timeFirst ?? "").toLocaleDateString("vi-VN"),
    //   new Date(timeEnd ?? "").toLocaleDateString("vi-VN")
    // );
  };

  const ExportWord = () => {
    
    if(typeTime === "date"){
       exportToWord({
date:{
  date:weekdays[new Date(timeFirst as any).getDay()],
  day:new Date(timeFirst as any).getDate().toString(),
  month:new Date(timeFirst as any).getMonth().toString(),
  year: new Date(timeFirst as any).getFullYear().toString()
},
name:dataFilter?.[0]?.list_user?.[0]?.first_name +" "+dataFilter?.[0]?.list_user?.[0]?.last_name,
department: dataFilter?.[0]?.list_user?.[0]?.group_user?.name_group ?? "",
position: dataFilter?.[0]?.list_user?.[0]?.position ?? "",
notes:"",
workItems: dataFilter?.map((dt,index)=>{
  return {
    id:index,
    name:dt.name,
    description:dt.description ?? ""
  }
}) ?? []
    })
    }
    if(typeTime === "week"){
       exportToWordWeek({
year:new Date(timeFirst as any).getFullYear().toString(),
name:dataFilter?.[0]?.list_user?.[0]?.first_name +" "+dataFilter?.[0]?.list_user?.[0]?.last_name,
department: dataFilter?.[0]?.list_user?.[0]?.group_user?.name_group ?? "",
position: dataFilter?.[0]?.list_user?.[0]?.position ?? "",
notes:"",
month:new Date(timeFirst as any).getMonth().toString(),
week:  moment(new Date(timeFirst as any)).isoWeek().toString(),
workItems: dataFilter?.map((dt,index)=>{
  return {
    id:index,
    name:dt.name,
    completed:dt.completed ?? "",
    uncompleted:dt.uncompleted??"",
    solution:dt.solution??"",
    time:new Date(dt.time_start ?? "").toLocaleDateString('vi-VN') +" - "+new Date(dt.time_end ?? "").toLocaleDateString('vi-VN')


  }
}) ?? []
    })
    }
  };
const ExportPDF = () => {
    
    if(typeTime === "date"){
       exportToPDF({
date:{
  date:weekdays[new Date(timeFirst as any).getDay()],
  day:new Date(timeFirst as any).getDate().toString(),
  month:new Date(timeFirst as any).getMonth().toString(),
  year: new Date(timeFirst as any).getFullYear().toString()
},
name:dataFilter?.[0]?.list_user?.[0]?.first_name +" "+dataFilter?.[0]?.list_user?.[0]?.last_name,
department: dataFilter?.[0]?.list_user?.[0]?.group_user?.name_group ?? "",
position: dataFilter?.[0]?.list_user?.[0]?.position ?? "",
notes:"",
workItems: dataFilter?.map((dt,index)=>{
  return {
    id:index,
    name:dt.name,
    description:dt.description ?? ""
  }
}) ?? []
    })
    }
    if(typeTime === "week"){
       exportToPDFWeek({
year:new Date(timeFirst as any).getFullYear().toString(),
name:dataFilter?.[0]?.list_user?.[0]?.first_name +" "+dataFilter?.[0]?.list_user?.[0]?.last_name,
department: dataFilter?.[0]?.list_user?.[0]?.group_user?.name_group ?? "",
position: dataFilter?.[0]?.list_user?.[0]?.position ?? "",
notes:"",
month:new Date(timeFirst as any).getMonth().toString(),
week:  moment(new Date(timeFirst as any)).isoWeek().toString(),
workItems: dataFilter?.map((dt,index)=>{
  return {
    id:index,
    name:dt.name,
    completed:dt.completed ?? "",
    uncompleted:dt.uncompleted??"",
    solution:dt.solution??"",
    time:new Date(dt.time_start ?? "").toLocaleDateString('vi-VN') +" - "+new Date(dt.time_end ?? "").toLocaleDateString('vi-VN')


  }
}) ?? []
    })
    }
  };
  // const ExportPDF = () => {
  //   const customeData = dataFilter?.map((dt) => {
  //     return {
  //       date: dt.date,
  //       name: dt.name,
  //       activity: dt.activity?.name,
  //       contract: dt.activity?.contract?.name_contract,
  //       status: dt.status.name,
  //       time_start: new Date(dt.time_start).toLocaleDateString("vi-VN"),
  //       time_end: new Date(dt.time_end).toLocaleDateString("vi-VN"),
  //       list_user: dt.list_user?.reduce((preValue, currValue, index) => {
  //         if (index === 0) {
  //           return currValue.first_name + " " + currValue.last_name;
  //         } else {
  //           return (
  //             preValue +
  //             " , " +
  //             currValue.first_name +
  //             " " +
  //             currValue.last_name
  //           );
  //         }
  //       }, ""),
  //     };
  //   });
  //   exportToPDF(
  //     typeTime,
  //     customeData,
  //     new Date(timeFirst).toLocaleDateString("vi-VN"),
  //     new Date(timeEnd).toLocaleDateString("vi-VN")
  //   );
  // };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-y-2">
        <div className="flex items-center gap-1 flex-wrap">
          <Select
            defaultValue={pageLimit}
            style={{ width: 83 }}
            onChange={(e) => setPageLimit(e)}
            options={[
              { value: 10, label: 10 },
              { value: 25, label: 25 },
              { value: 50, label: 50 },
              { value: 100, label: 100 },
              { value: 500, label: 500 },
              { value: 1000, label: 1000 },
              { value: 100000000, label: "Tất cả" },
            ]}
          />
          <Dropdown menu={menuProps}>
            <Button>
              <Space>Xuất ra</Space>
              <MdKeyboardArrowDown />
            </Button>
          </Dropdown>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <div>
            <Radio.Group
              value={typeTime}
              buttonStyle="solid"
              onChange={(e) => {
                setTypeTime(e.target.value);
              }}
            >
              <Radio.Button value="date">Ngày</Radio.Button>
              <Radio.Button value="week">Tuần</Radio.Button>
              <Radio.Button value="month">Tháng</Radio.Button>
              <Radio.Button value="year">Năm</Radio.Button>
            </Radio.Group>
          </div>
          <DatePicker
  className="sm:w-auto w-full"
  picker={typeTime} // "year", "month", "week", or "date"
  value={timeFirst ? dayjs(timeFirst) : null}
  onChange={(date:any, dateString:any) => {
    if (!date || !dateString) {
      setTimeFirst(undefined);
      setTimeEnd(undefined);
      return;
    }

    if (typeTime === "year") {
      const start = new Date(`${dateString}-01-01`).getTime();
      const end = new Date(`${dateString}-12-31`).getTime();
      setTimeFirst(start);
      setTimeEnd(end);
    }

    if (typeTime === "month") {
      const start = new Date(`${dateString}-01`).getTime();

      const end = moment(new Date(`${dateString}-01`))
        .clone()
        .endOf("month")
        .toDate()
        .getTime();

      setTimeFirst(start);
      setTimeEnd(end);
    }

    if (typeTime === "week") {
      const weekStart = moment(date).startOf("isoWeek").toDate().getTime();
      const weekEnd = moment(date).endOf("isoWeek").toDate().getTime();
      setTimeFirst(weekStart);
      setTimeEnd(weekEnd);
    }

    if (typeTime === "date") {
      const selected = new Date(dateString).getTime();
      setTimeFirst(selected);
      setTimeEnd(selected);
    }
  }}
/>
          <Search
            onChange={(e) => {
              handleSearchFilter(e.target.value);
            }}
            placeholder="Tìm kiếm"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <div className="min-w-fit">
          <Table<IGetWork2>
            columns={columns}
            dataSource={dataFilter}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: pageLimit, // Items per page
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </div>
      </div>
    </div>
  );
}
