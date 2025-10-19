import type { ReportData } from "@/lib/types"
import { RootState } from "@/redux/store/store"
import Image from "next/image"
import { ButtonHTMLAttributes } from "react"
import { useSelector } from "react-redux"

interface ReportPreviewProps {
  data: ReportData
  refBtn?:any
}
const handlePrint = () => {
    window.print()
  }
export function ReportPreviewPDF({ data,refBtn }: ReportPreviewProps) {
   const { datas: dataUsers } = useSelector(
        (state: RootState) => state.get_users
      );
       const { datas: dataProjects } = useSelector(
            (state: RootState) => state.get_projects
          );
  const headers = ["CÔNG VIỆC", "CÔNG TRÌNH", "THỰC HIỆN", "TIẾN ĐỘ", "YÊU CẦU CÔNG VIỆC"]
  return (
    <div className="bg-white text-black p-8 min-h-[800px]" id="report-content">
      <button ref={refBtn} hidden onClick={handlePrint}></button>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 border-b-2 border-black pb-4">
        <div className="flex flex-col gap-1">
           <Image width={195} height={57} src={'/logo1.png'} alt=""/>
        </div>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold uppercase tracking-wide">KẾ HOẠCH CÔNG TÁC TUẦN</h1>
          <p className="text-sm mt-1">{data.weekInfo}</p>
        </div>
        <div className="text-right text-sm font-semibold">
          <div>{data.companyCode}</div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="mb-8">
        <h2 className="text-base font-bold mb-3 uppercase tracking-wide bg-gray-100 p-2 border-l-4 border-orange-500">
          Lịch làm việc tuần
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-xs">
            <thead>
              <tr className="bg-gray-200">
                {data.schedule.headers.map((header, idx) => (
                  <th key={idx} className="border border-black p-2 font-bold text-center min-w-[120px]">
                    <div className="font-bold">{header.day}</div>
                    <div className="text-gray-700">{header.date}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.schedule.timeSlots.map((slot, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {slot.map((cell, cellIdx) => (
                    <td key={cellIdx} className="border border-black p-2 align-top">
                      {cell.split("\n").map((line, lineIdx) => (
                        <div key={lineIdx} className="mb-1 leading-relaxed">
                          {line}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Priority Work Section */}
      {
        data.tags.map(dt=>{
          return <>
              <div className="mb-8">
        <h2 className="text-base font-bold mb-3 uppercase tracking-wide bg-gray-100 p-2 border-l-4 border-orange-500">
          {dt.name.toUpperCase()}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-xs">
            <thead>
              <tr className="bg-gray-200">
                {headers.map((header, idx) => (
                  <th key={idx} className="border border-black p-2 font-bold text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dt.works.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-black p-2 align-top">{row.name}</td>
                  <td className="border border-black p-2 text-center align-middle">{dataProjects?.find(dt => dt.project_id === row.project)?.name}</td>
                  <td className="border border-black p-2">{row?.list_user?.map(dt => (dataUsers?.find(dtt=> dtt.user_id === dt)?.first_name+" "+dataUsers?.find((dtt:any)=> dtt.user_id === dt)?.last_name)).join(", ")}</td>
                  <td className="border border-black p-2 text-center align-middle">{row.time_process}</td>
                  <td className="border border-black p-2 align-top leading-relaxed">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          </>
        }) 
      }
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #report-content,
          #report-content * {
            visibility: visible;
          }
          #report-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: landscape;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  )
}
