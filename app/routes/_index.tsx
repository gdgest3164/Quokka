import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";

import Switcher from "../Components/Switcher";

interface RepresentativeImage {
  url: string;
}
interface ProductDetails {
  originProductNo: number;
  addressBookNo: number;
  name: string;
  wholesale_url: string;
}

interface ChannelProduct {
  originProductNo: number;
  channelProductNo: number;
  channelServiceType: string;
  categoryId: string;
  name: string;
  sellerManagementCode: string;
  statusType: string;
  channelProductDisplayStatusType: string;
  salePrice: number;
  discountedPrice: number;
  mobileDiscountedPrice: number;
  stockQuantity: number;
  knowledgeShoppingProductRegistration: boolean;
  deliveryAttributeType: string;
  deliveryFee: number;
  returnFee: number;
  exchangeFee: number;
  managerPurchasePoint: number;
  wholeCategoryName: string;
  wholeCategoryId: string;
  representativeImage: RepresentativeImage;
  modelId: number;
  modelName: string;
  brandName: string;
  manufacturerName: string;
  sellerTags: string[];
  regDate: string;
  modifiedDate: string;
  channelNo: number;
  details: ProductDetails[];
}

interface Product {
  originProductNo: number;
  channelProducts: ChannelProduct[];
}

interface ProductAddress {
  addressBookNo: number;
  name: string;
  addressType: string;
  postalCode: string;
  baseAddress: string;
  detailAddress: string;
  address: string;
  phoneNumber1: string;
  phoneNumber2: string;
  hasLocation: boolean;
  roadNameAddress: boolean;
  overseasAddress: boolean;
}
interface ProductsResponse {
  products: Product[];
  totalElements: number;
  size: number;
  address: ProductAddress[];
}

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  // 기본값 설정
  const size: number = parseInt(searchParams.get("size") as string) || 10;
  const page: number = parseInt(searchParams.get("page") as string) || 1;

  const response = await fetch(`http://3.38.116.254:8000/api/seller/products?size=${size}&page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products: ProductsResponse = await response.json();
  return json({ products });
};

export default function Index() {
  const { products } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const navigate = useNavigate();
  const table_title = ["상품번호", "대표이미지", "상품명", "판매 가격", "재고 수", "브랜드", "등록일", "도매업"];

  console.log(products);

  //페이네이션 이벤트
  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const isForwardRequest = target.getAttribute("data-nav-operation") === "next";
    const offset = isForwardRequest ? 1 : -1;
    navigate(`?size=${products.size}&page=${products.page + offset}`);
  };

  //도매업 주소 선택 이벤트
  const handleWholesaleAddress = async (e: React.ChangeEvent<HTMLSelectElement>, originProductNo: number) => {
    const target = e.target as HTMLSelectElement;
    const addressBookNo = target.value;
    const response = await fetch(`http://3.38.116.254:8000/api/seller/product/address/update?originProductNo=${originProductNo}&addressBookNo=${addressBookNo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    console.log(response);
    // if (response.ok) {
    //   const products = await response.json();
    //   return json({ products });
    // } else {
    //   throw new Error("서버에서 응답이 없습니다.");
    // }
  };

  return (
    <>
      <>
        <Switcher />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-auto">
          <div>총 {products.totalElements}개</div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {table_title.map((t, i) => (
                  <th key={i} scope="col" className="px-6 py-3 whitespace-nowrap text-center">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state === "loading" ? (
                <tr>
                  <th colSpan={table_title.length}>
                    <div className="flex justify-center items-center m-4">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </th>
                </tr>
              ) : (
                <>
                  {products.contents.map((product: Product) => (
                    <tr key={product.channelProducts[0].originProductNo} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap dark:text-white">
                        {product.channelProducts[0].originProductNo}
                      </th>
                      <td className="px-4 py-3">
                        <img src={product.channelProducts[0].representativeImage.url} alt={product.channelProducts[0].name} className={"w-24"} loading="lazy" />
                      </td>
                      <td className="px-4 py-3 text-sm">{product.channelProducts[0].name}</td>
                      <td className="px-4 py-3">{product.channelProducts[0].salePrice}</td>
                      <td className="px-4 py-3">{product.channelProducts[0].stockQuantity}</td>
                      <td className="px-4 py-3">{product.channelProducts[0].brandName}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{new Date(product.channelProducts[0].regDate).toISOString().split("T")[0]}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => handleWholesaleAddress(e, product.originProductNo)}
                          defaultValue={product.channelProducts[0].details && product.channelProducts[0].details.length > 0 ? product.channelProducts[0].details[0].addressBookNo : "없음"}
                        >
                          <option value={""}>없음</option>
                          {products.address["addressBooks"].map((prd_addr: ProductAddress) => (
                            <>
                              <option key={prd_addr.addressBookNo} value={prd_addr.addressBookNo}>
                                {prd_addr.name}
                              </option>
                            </>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

          <nav className="flex justify-center m-3">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  disabled={products.first}
                  onClick={handleNavigation}
                  data-nav-operation="previous"
                  className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    products.first ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  이전
                </button>
              </li>
              <li>
                <button className="flex items-center cursor-default justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ">
                  {products.page} / {Math.ceil(products.totalElements / products.size)}
                </button>
              </li>
              <li>
                <button
                  disabled={products.last}
                  onClick={handleNavigation}
                  data-nav-operation="next"
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    products.last ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  다음
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </>
    </>
  );
}
