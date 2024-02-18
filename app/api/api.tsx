import { ProductsResponse } from "../Components/Product/product.type";

//API 통신
const server = "https://quokka.run:8000";
//const server = "https://quokka.run"; //kjh 수정

//==========================================================
//로그인

export async function loginCheckApi(e: FormData) {
  const response = await fetch(`${server}/api/loginCheck`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(e)),
  });
  return response.json();
}
//==========================================================

//==========================================================
//셀러 브랜드 정보

export async function apiSellerBrand() {
  const response = await fetch(`${server}/api/seller/brand`, {
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
// 상품 리스트
// 서버사이드 전용 함수
export async function sellerProducts(data: { size: number; page: number; search?: string; searchType?: string }, cookies: string) {
  try {
    const response = await fetch(`${server}/api/seller/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("서버에서 오류가 발생했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("상품 리스트 요청 중 에러가 발생했습니다.", error);
    throw error;
  }
}

//==========================================================

//==========================================================
//카테고리 가져오기
export async function categorySearch() {
  const response = await fetch(`${server}/api/category/search`, {
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

export async function apiSellerAddressUpdate(cookies: string) {
  const response = await fetch(`${server}/api/seller/address/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cookies }),
    credentials: "include",
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
export async function stockAutoProcess(cookies: string) {
  const response = await fetch(`${server}/api/auto/stock/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ cookies }),
  });

  return response;
}
//==========================================================

//==========================================================
//재고수 자동화 사용중 여부
export async function status_stockAutoProcess(cookies: string) {
  const response = await fetch(`${server}/api/auto/stock/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ cookies }),
  });

  return response;
}
//==========================================================

//==========================================================
//상품 등록 자동화
export async function productAutoAddProcess(datas: { who: string; code: string; cate: string }, items: ProductsResponse) {
  const response = await fetch(`${server}/api/product/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ datas, items }),
  });

  return response.json();
}
//==========================================================
