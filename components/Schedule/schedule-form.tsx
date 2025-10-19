"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ScheduleEntry, ScheduleType } from "@/lib/types"
import { getDayName } from "@/lib/schedule-utils"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store/store"

interface ScheduleFormProps {
  weekStart: string
  onSubmit: (entry: Omit<ScheduleEntry, "id">) => void
  onCancel: () => void
  initialData?: ScheduleEntry
  // existingUsers?: string[]
  // existingGroups?: string[]
}

export function ScheduleForm({
  weekStart,
  onSubmit,
  onCancel,
  initialData,
  // existingUsers = [],
  // existingGroups = [],
}: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    schedule_date:'',
    day: initialData?.day ?? 0,
    time: initialData?.time ?? "",
    description: initialData?.description ?? "",
    type: initialData?.type ?? ("all" as ScheduleType),
    assigned_to: initialData?.assigned_to ?? "",
    group_name: initialData?.group_name ?? "",
  })
 const { datas: dataUsers } = useSelector(
      (state: RootState) => state.get_users
    );
    const { datas: dataGroups } = useSelector(
      (state: RootState) => state.get_group_user
    );
  const [isNewUser, setIsNewUser] = useState(false)
  const [isNewGroup, setIsNewGroup] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const date = new Date(weekStart??"");
    date.setDate(date.getDate() + (formData.day||0));
    onSubmit({
      ...formData,schedule_date:new Date().toISOString().split('T')[0]
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="day">Ngày trong tuần</Label>
        <Select
          value={formData.day.toString()}
          onValueChange={(value) => setFormData({ ...formData, day: Number.parseInt(value) })}
        >
          <SelectTrigger id="day">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {getDayName(day)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Thời gian</Label>
        <Input
          id="time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Nội dung công việc</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          placeholder="Nhập mô tả công việc..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Loại lịch trình</Label>
        <Select
          value={formData.type}
          onValueChange={(value: ScheduleType) => {
            setFormData({ ...formData, type: value })
            setIsNewUser(false)
            setIsNewGroup(false)
          }}
        >
          <SelectTrigger id="type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Cá nhân</SelectItem>
            <SelectItem value="group">Nhóm</SelectItem>
            <SelectItem value="all">Tất cả mọi người</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type === "individual" && (
        <div className="space-y-2">
          <Label htmlFor="assigned_to">Người được giao</Label>
          {(dataUsers ?? []).length > 0 && !isNewUser ? (
            <div className="space-y-2">
              <Select
                value={formData.assigned_to}
                onValueChange={(value) => {
                  if (value === "__new__") {
                    setIsNewUser(true)
                    setFormData({ ...formData, assigned_to: "" })
                  } else {
                    setFormData({ ...formData, assigned_to: value })
                  }
                }}
              >
                <SelectTrigger id="assigned_to">
                  <SelectValue placeholder="Chọn người..." />
                </SelectTrigger>
                <SelectContent>
                  {(dataUsers ?? []).map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.first_name} {user.last_name} ({user?.group_user?.name_group})
                    </SelectItem>
                  ))}
                  <SelectItem value="__new__">+ Thêm người mới</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                id="assigned_to"
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                placeholder="Nhập tên người..."
                required
              />
              {(dataUsers??[]).length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsNewUser(false)
                    setFormData({ ...formData, assigned_to: "" })
                  }}
                >
                  Chọn từ danh sách có sẵn
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {formData.type === "group" && (
        <div className="space-y-2">
          <Label htmlFor="group_name">Tên nhóm</Label>
          {dataGroups.length > 0 && !isNewGroup ? (
            <div className="space-y-2">
              <Select
                value={formData.group_name}
                onValueChange={(value) => {
                  if (value === "__new__") {
                    setIsNewGroup(true)
                    setFormData({ ...formData, group_name: "" })
                  } else {
                    setFormData({ ...formData, group_name: value })
                  }
                }}
              >
                <SelectTrigger id="group_name">
                  <SelectValue placeholder="Chọn nhóm..." />
                </SelectTrigger>
                <SelectContent>
                  {dataGroups.map((group) => (
                    <SelectItem key={group.group_id} value={group.group_id}>
                      {group.name_group}
                    </SelectItem>
                  ))}
                  <SelectItem value="__new__">+ Thêm nhóm mới</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                id="group_name"
                value={formData.group_name}
                onChange={(e) => setFormData({ ...formData, group_name: e.target.value })}
                placeholder="Nhập tên nhóm..."
                required
              />
              {dataGroups.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsNewGroup(false)
                    setFormData({ ...formData, group_name: "" })
                  }}
                >
                  Chọn từ danh sách có sẵn
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">{initialData ? "Cập nhật" : "Thêm mới"}</Button>
      </div>
    </form>
  )
}
