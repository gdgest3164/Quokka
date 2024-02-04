//API 통신
const server = "https://quokka.run";

//==========================================================
//셀러 브랜드 정보

export async function apiSellerBrand(channelNo: string) {
  const response = await fetch(`${server}/api/seller/brand?channelNo=${channelNo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
//==========================================================

//==========================================================
//상품 리스트

export async function sellerProducts(size: number, page: number) {
  const response = await fetch(`${server}/api/seller/products?size=${size}&page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
    body: JSON.stringify(data),
  });

  return response;
}
//==========================================================

//==========================================================
//상품 리스트 - 도매업 선택 업데이트

interface productAddressUpdateProp {
  originProductNo: number;
  addressBookNo: string;
}

export async function productAddressUpdate(data: productAddressUpdateProp) {
  const response = await fetch(`${server}/api/seller/product/address/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}
//==========================================================
