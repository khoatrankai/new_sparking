export type ScheduleType = "individual" | "group" | "all"

export interface ScheduleEntry {
  id?: string
  day: number // 0-6 (Sunday-Saturday)
  time: string
  schedule_date:string
  description: string
  type: ScheduleType
  assigned_to?: string | null // For individual schedules
  group_name?: string | null// For group schedules
  // weekStart: string // ISO date string for the Monday of the week
}

export interface ReportData {
  weekInfo: string
  companyCode: string
  schedule: {
    headers: Array<{ day: string; date: string }>
    timeSlots: string[][]
  },
  tags:Array<
    {
      name:string,
      works:Array<{
        name:string,
        project:string,
        list_user:string[],
        time_process:string,
        description:string
      }>
    }>
}

export interface WeekInfo {
  weekNumber: number
  month: number
  year: number
  weekStart: string // ISO date string
}
