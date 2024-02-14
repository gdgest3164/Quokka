import { json, redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import Navigation from "../Components/Table/nav";
import { Product, ProductAddress, ProductsResponse } from "../Components/Product/product.type";
import Table from "../Components/Table/table";
import Component from "../Components/Layouts/component";
import StockModal from "../Components/Modals/StockModal";
import { useEffect, useState } from "react";
import { localAddressUpdate, productAddressUpdate, productAutoAddProcess, sellerProducts } from "../api/api";
import { getSession } from "../utils/cookies";
import ProductAddModal from "../Components/Modals/ProductAddModal";

export const meta: MetaFunction = ({ error }) => {
  return [{ title: error ? "oops!" : "상품목록 | 쿼카" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  // 기본값 설정
  const size: number = parseInt(searchParams.get("size") as string) || 10;
  const page: number = parseInt(searchParams.get("page") as string) || 1;
  const session = await getSession(request.headers.get("Cookie"));
  const Qk_channel = await session.get("Qk_channel");
  if (!Qk_channel) return redirect("/");

  //상품 리스트 가져오기
  const qk_channel = encodeURIComponent(JSON.stringify(Qk_channel.data));
  const products: ProductsResponse = await sellerProducts({ size: size, page: page }, `Qk_channel=${qk_channel}`);

  // Qk_channel 데이터도 포함해서 반환
  return json({ products, Qk_channel });
};

export default function ProductList() {
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [productAddModalOpen, setProductAddModalOpen] = useState(false);
  const { products, Qk_channel } = useLoaderData<typeof loader>();
  const [items, setItems] = useState<ProductsResponse | undefined>();
  const [address, setAddress] = useState<ProductAddress[]>([]);
  const { state } = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    setAddress(products.address);
    setItems(products);
  }, [products]);

  const table_title = [
    { title: "상품번호", width: "5%" },
    { title: "상품코드", width: "5%" },
    { title: "대표이미지", width: "5%" },
    { title: "상품명", width: "30%" },
    { title: "재고 수", width: "3%" },
    { title: "판매 가격", width: "5%" },
    { title: "상태", width: "5%" },
    { title: "등록일", width: "5%" },
    { title: "도매업", width: "8%" },
  ];

  //페이네이션 이벤트
  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    let page = 1;

    if (target.getAttribute("data-nav-operation") !== "first") {
      const isForwardRequest = target.getAttribute("data-nav-operation") === "next";
      const offset = isForwardRequest ? 1 : -1;
      page = products.page + offset;
    }

    navigate(`?size=${products.size}&page=${page}`);
  };

  //상품 리스트 - 도매업 선택 이벤트
  const handleWholesaleAddress = async (e: React.ChangeEvent<HTMLSelectElement>, originProductNo: number) => {
    const target = e.target as HTMLSelectElement;
    const addressBookNo = target.value;

    const data = {
      originProductNo: originProductNo,
      addressBookNo: addressBookNo,
    };
    const response = await productAddressUpdate(data);

    if (!response.ok) {
      throw new Error("서버에서 응답이 없습니다.");
    }
  };

  //스톡 모달 오픈 이벤트
  const stockHandleOpenModal = () => {
    setStockModalOpen(true);
  };

  //상품등록 모달 오픈 이벤트
  const productAddOpenModal = () => {
    setProductAddModalOpen(true);
  };

  //스톡 모달 url 입력 이벤트
  const stockModalUrl = async (datas: { addressBookNo: number; url: string }) => {
    const data = {
      addressBookNo: datas.addressBookNo,
      filter: {
        url: datas.url,
      },
    };

    const response = await localAddressUpdate(data);

    if (response.ok) {
      const updatedAddresses = address.map((v: ProductAddress) => (v.addressBookNo === datas.addressBookNo ? { ...v, url: datas.url } : v));
      setAddress(updatedAddresses);
    } else {
      throw new Error("서버에서 응답이 없습니다.");
    }
  };

  //스톡 설정 이벤트
  const stockDataEvent = async (e: number) => {
    const updatedAddresses = address.map((v: ProductAddress) => (v.addressBookNo === e ? { ...v, is_use: !v.is_use } : v));
    await setAddress(updatedAddresses);
    products.address = address;

    const data = {
      addressBookNo: e,
      filter: {
        is_use: !address.filter((v) => v.addressBookNo === e)[0].is_use,
      },
    };

    //데이터 저장
    const response = await localAddressUpdate(data);

    if (!response.ok) {
      throw new Error("서버에서 응답이 없습니다.");
    }
  };

  //상품 등록 이벤트
  const productAddevent = async (datas: { who: string; code: string; cate: string }) => {
    const result = await productAutoAddProcess(datas, Qk_channel);
    console.log(result);
  };

  return (
    <>
      <Component>
        <div className="flex justify-between items-center">
          <div>총 {products.totalElements || 0}개</div>
          <div>
            <button
              onClick={productAddOpenModal}
              type="button"
              className="text-black dark:text-white text-sm bg-[#e0e0e0] dark:bg-[#343a42] hover:bg-[#b8b8b8]/90 hover:dark:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#aaaaaa]/50 font-medium rounded-lg px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5ZM18 14a1 1 0 1 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2Z"
                  clipRule="evenodd"
                />
              </svg>
              상품등록
            </button>
            <button
              onClick={stockHandleOpenModal}
              type="button"
              className="text-black dark:text-white text-sm bg-[#e0e0e0] dark:bg-[#343a42] hover:bg-[#b8b8b8]/90 hover:dark:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#aaaaaa]/50 font-medium rounded-lg px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <svg className="w-6 h-6 me-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13v-2a1 1 0 0 0-1-1h-.8l-.7-1.7.6-.5a1 1 0 0 0 0-1.5L17.7 5a1 1 0 0 0-1.5 0l-.5.6-1.7-.7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.8l-1.7.7-.5-.6a1 1 0 0 0-1.5 0L5 6.3a1 1 0 0 0 0 1.5l.6.5-.7 1.7H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.8l.7 1.7-.6.5a1 1 0 0 0 0 1.5L6.3 19a1 1 0 0 0 1.5 0l.5-.6 1.7.7v.8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.8l1.7-.7.5.6a1 1 0 0 0 1.5 0l1.4-1.4a1 1 0 0 0 0-1.5l-.6-.5.7-1.7h.8a1 1 0 0 0 1-1Z"
                />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
              설정
            </button>
          </div>
        </div>
        <StockModal get_open={stockModalOpen} setOpen={setStockModalOpen} address={address} toggle_id={(e) => stockDataEvent(e)} input_url={(i, e) => stockModalUrl({ addressBookNo: i, url: e })} />
        <ProductAddModal get_open={productAddModalOpen} setOpen={setProductAddModalOpen} address={address} input_datas={(e) => productAddevent(e)} />

        <Table
          table_title={table_title}
          state={state}
          loading={
            <>
              {Array.from({ length: products.size }, (_, i) => (
                <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
                  {table_title.map((t, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="space-y-3">
                            {t.title == "대표이미지" ? (
                              <div className="flex items-center justify-center bg-slate-200 dark:bg-slate-500 col-span-2 w-24 h-20 rounded">
                                <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                              </div>
                            ) : t.title == "도매업" ? (
                              <div className="bg-slate-200 dark:bg-slate-500 rounded col-span-2 w-24 h-9"></div>
                            ) : t.title == "상품명" ? (
                              <>
                                <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2 "></div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2"></div>
                                  <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-1"></div>
                                </div>
                              </>
                            ) : (
                              <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2 "></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </>
          }
          data={
            <>
              {items &&
                items.contents.map((product: Product) => (
                  <tr
                    key={product.channelProducts[0].originProductNo}
                    className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${
                      product.channelProducts[0].statusType !== `SALE` && `text-red-500`
                    } ${!product.channelProducts[0].sellerManagementCode && `text-yellow-500`} hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300 ease-in-out`}
                  >
                    <th scope="row" className="px-4 py-3 text-xs whitespace-nowrap ">
                      {product.channelProducts[0].channelProductNo}
                    </th>
                    <td className="px-4 py-3">{product.channelProducts[0].sellerManagementCode || "! 기재 필요 !"}</td>
                    <td className="px-4 py-3">
                      <img
                        src={product.channelProducts[0].representativeImage.url.replace("http://", "https://")}
                        alt={product.channelProducts[0].name}
                        className={"w-28 rounded-md shadow-xl min-w-24"}
                        loading="lazy"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap min-w-20 max-w-32 overflow-auto sm:whitespace-nowrap  md:whitespace-nowrap  lg:whitespace-nowrap xl:whitespace-normal">
                      {product.channelProducts[0].sellerManagementCode &&
                      product.channelProducts[0].details &&
                      product.channelProducts[0].details.length > 0 &&
                      address.find((e) => e.addressBookNo == product.channelProducts[0].details[0].addressBookNo)?.url &&
                      product.channelProducts[0].details &&
                      product.channelProducts[0].details.length > 0 ? (
                        <a
                          href={
                            product.channelProducts[0].details && product.channelProducts[0].details.length > 0
                              ? address
                                  .find((e) => e.addressBookNo == product.channelProducts[0].details[0].addressBookNo)
                                  ?.url.replace("{product_code}", product.channelProducts[0].sellerManagementCode)
                              : "/"
                          }
                          target="_blank"
                          className="hover:text-orange-500"
                          rel="noopener noreferrer"
                        >
                          {product.channelProducts[0].name}
                        </a>
                      ) : (
                        product.channelProducts[0].name
                      )}
                    </td>
                    <td className="px-4 py-3">{product.channelProducts[0].stockQuantity}</td>
                    <td className="px-4 py-3">{product.channelProducts[0].mobileDiscountedPrice}</td>
                    {/* <td className="px-4 py-3">{product.channelProducts[0].brandName}</td> */}
                    <td className={`px-4 py-3 whitespace-nowrap`}>
                      {product.channelProducts[0].statusType === "WAIT" && "판매 대기"}
                      {product.channelProducts[0].statusType === "SALE" && "판매 중"}
                      {product.channelProducts[0].statusType === "OUTOFSTOCK" && "품절"}
                      {product.channelProducts[0].statusType === "UNADMISSION" && "승인 대기"}
                      {product.channelProducts[0].statusType === "REJECTION" && "승인 거부"}
                      {product.channelProducts[0].statusType === "SUSPENSION" && "판매 중지"}
                      {product.channelProducts[0].statusType === "CLOSE" && "판매 종료"}
                      {product.channelProducts[0].statusType === "PROHIBITION" && "판매 금지"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(product.channelProducts[0].regDate).toISOString().split("T")[0]}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-w-24"
                        onChange={(e) => handleWholesaleAddress(e, product.originProductNo)}
                        defaultValue={product.channelProducts[0].details && product.channelProducts[0].details.length > 0 ? product.channelProducts[0].details[0].addressBookNo : "없음"}
                      >
                        <option value={0}>없음</option>
                        {address.map((prd_addr: ProductAddress) => {
                          if (prd_addr.is_use)
                            return (
                              <option key={prd_addr.addressBookNo} value={prd_addr.addressBookNo}>
                                {prd_addr.name}
                              </option>
                            );
                        })}
                      </select>
                    </td>
                  </tr>
                ))}
            </>
          }
        />
        <Navigation products={products} handleNavigation={handleNavigation} />
      </Component>
    </>
  );
}
