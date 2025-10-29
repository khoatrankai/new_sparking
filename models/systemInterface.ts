interface Province {
  province_id: string;
  name_province: string;
}

interface Vat {
  vat_id: string;
  type_vat: number;
}

interface Profit {
  profit_id: string;
  type_profit: number;
}

export interface TargetRevenue {
  target_id?: string;
  revenue?: number;
  year?: number;
}

export interface Budget {
  id?: string;
  name?: string;
  spent?: number;
  allocation?: number;
  created_at: Date;
  updated_at: Date;
}

export interface LinkSystem {
  link_system_id?: string;
  name_tag?: string;
  link?: string;
}

interface ProductInfo {
  code_product: string;
  name_product: string;
  description: string;
  quantity_product: number;
  vat: number;
  price_product: number;
  type: "TB" | "VT";
  // index_follow:number
}

export type { Province, ProductInfo, Vat, Profit };
