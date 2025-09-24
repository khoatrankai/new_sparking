import { UploadFile } from "antd";

export interface IDocuments {
  document_id?: string;
  name: string;
  link: string;
  user?: InfoUser | string; // hoặc string nếu chỉ cần id user
}

export interface ISkills {
  skill_id?: string;
  name: string;
  user?: InfoUser | string; // hoặc string nếu chỉ cần id user
  score_request: number;
  score_review: number;
}

interface InfoUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture_url: string;
  phone_number: string;
  position?: string;
  status: string;
  link_in?: string;
  link_skype?: string;
  link_facebook?: string;
  link_zalo?: string;
  number_workday?: number;
  number_golay?: number;
  number_leaveearly?: number;
  number_rest?: number;
  number_overtime?: number;
  group_user?: IGetGroupUser;
  skill?:ISkills[]
  documents?:IDocuments[]
}

export interface IGetTimeKeeping{
  timekeeping_id:string,
  time_start:Date,
  time_end:Date,
  completed:boolean,
  user_info:InfoUser
}

export interface RoleTypeUserDto {
  role_type_id: string;
  name_role: string;
  name_tag: string;
  category_role?: GetCategoryRole;
}

export interface GetCategoryRole {
  category_id: string;
  name_category: string;
  role_type?: RoleTypeUserDto[];
}

export interface GetRoleUser {
  role_id: string;
  status: boolean;
  role_type: RoleTypeUserDto;
}

interface CreateUser {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  group_user?: string;
  position?: string;
  picture_url?: UploadFile[];
  phone_number?: string;
  link_facebook?: string;
  link_zalo?: string;
  link_in?: string;
  link_skype?: string;
  sign_name?: string;
  skills?:ISkills[]
  documents?:IDocuments[]
}

export interface IGetGroupUser {
  group_id: string;
  name_group: string;
  users?:InfoUser[]
}

export interface ICreateGroupUser {
  name_group: string;
}

export interface IUpdateGroupUser {
  name_group: string;
}

export interface NotifyItem {
  notify_user_id: string; // ID người dùng nhận thông báo
  status: boolean; // Trạng thái thông báo (đã đọc/chưa đọc)
  notify: NotifyDetail; // Chi tiết thông báo
}
export interface NotifyDetail {
  notify_id: string; // ID thông báo
  description: string; // Mô tả nội dung thông báo
  link: string; // Đường dẫn kèm thông báo (nếu có)
  created_at: string; // Ngày giờ tạo thông báo
  updated_at: string; // Ngày giờ cập nhật thông báo
}

export type { InfoUser, CreateUser };
