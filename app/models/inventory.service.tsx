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

export async function getProduct() {
  return await supabase.from("inventory_management").select("*, inventory_optinos(*)").order("created_at", { ascending: false });
}

export async function upsertProduct(datas: Inven) {
  return await supabase.from("inventory_management").upsert(datas);
}
