import supabase from "./supabase";

export interface Inven {
  id: number;
  created_at: string;
  pd_name: string;
  wholesale_domain: string;
  pd_code: string;
  inventory_optinos: Array<{
    id: number;
    name: string;
    price: string;
    stock: number;
    created_at: string;
  }>;
}

//wholesale테이블 모두 가져오기
export async function wholesale() {
  return await supabase.from("wholesale").select("*").order("create_at").order("created_at", { ascending: false });
}

//상품 인벤토리 가져오기
export async function getProduct() {
  return await supabase.from("inventory_management").select("wholesale(name, url), *, inventory_optinos(*)").order("created_at", { ascending: false });
}

//상품 업데이트
export async function upsertProduct(datas: Inven) {
  return await supabase.from("inventory_management").upsert(datas);
}
