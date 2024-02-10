import { LoaderData } from "../root";

//API 통신
const server = "https://quokka.run:8000";

//==========================================================
//셀러 브랜드 정보

export async function apiSellerBrand(channelNo: string) {
  const response = await fetch(`${server}/api/seller/brand?channelNo=${channelNo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
}
//==========================================================

//==========================================================
//상품 리스트

export async function sellerProducts(size: number, page: number, channel: string) {
  const response = await fetch(`${server}/api/seller/products?size=${size}&page=${page}&channel=${channel}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
}
//==========================================================

//==========================================================
//로컬 도매 데이터 업데이트
interface localAddressUpdateProp {
  addressBookNo: number;
  filter: {
    url?: string;
    is_use?: boolean;
  };
}

export async function localAddressUpdate(data: localAddressUpdateProp) {
  const response = await fetch(`${server}/api/seller/local/address/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return response;
}
//==========================================================

//==========================================================
//실제 도매 데이터 생성 및 업데이트
interface apiSellerAddressUpdateProp {
  channelNo: string;
}

export async function apiSellerAddressUpdate(channelNo: apiSellerAddressUpdateProp) {
  const response = await fetch(`${server}/api/seller/address/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(channelNo),
  });

  return response;
}
//==========================================================

//==========================================================
//상품 리스트 - 도매업 선택 업데이트

interface productAddressUpdateProp {
  originProductNo: number;
  addressBookNo: string;
  status?: string;
}

export async function productAddressUpdate(data: productAddressUpdateProp) {
  const response = await fetch(`${server}/api/seller/product/address/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return response;
}
//==========================================================

//==========================================================
//재고수 자동화
export async function stockAutoProcess(data: LoaderData) {
  const response = await fetch(`${server}/auto/stock/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return response;
}
//==========================================================

//==========================================================
//재고수 자동화 사용중 여부
export async function status_stockAutoProcess(data: LoaderData) {
  const response = await fetch(`${server}/auto/stock/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return response;
}
//==========================================================
