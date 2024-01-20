import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";

import Switcher from "../Components/Switcher";

interface RepresentativeImage {
  url: string;
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
}

interface Product {
  originProductNo: number;
  channelProducts: ChannelProduct[];
}

// interface ProductsResponse {
//   contents: Product[];
//   page: number;
//   size: number;
//   totalElements: number;
//   totalPages: number;
//   sort: {
//     sorted: boolean;
//     fields: {
//       name: string;
//       direction: string;
//     }[];
//   };
//   first: boolean;
//   last: boolean;
// }

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch("http://3.38.116.254:8000/brand-info/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { size: "10", page: "1" },
    }),
  });
  const products = await response.json();
  return json({ products });
};

export default function Index() {
  const { products } = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <>
      {state === "loading" ? (
        "로딩중..."
      ) : (
        <>
          <Switcher />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/12 m-auto">
            <div>총 {products.totalElements}개</div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    상품번호
                  </th>
                  <th scope="col" className="px-6 py-3">
                    대표이미지
                  </th>
                  <th scope="col" className="px-6 py-3">
                    상품명
                  </th>
                  <th scope="col" className="px-6 py-3">
                    판매 가격
                  </th>
                  <th scope="col" className="px-6 py-3">
                    재고 수
                  </th>
                  <th scope="col" className="px-6 py-3">
                    브랜드
                  </th>
                  <th scope="col" className="px-6 py-3">
                    등록일
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.contents.map((product: Product) => (
                  <tr key={product.channelProducts[0].originProductNo} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.channelProducts[0].originProductNo}
                    </th>
                    <td className="px-6 py-4">
                      <img src={product.channelProducts[0].representativeImage.url} alt={product.channelProducts[0].name} className={"h-48 w-96"} loading="lazy" />
                    </td>
                    <td className="px-6 py-4">{product.channelProducts[0].name}</td>
                    <td className="px-6 py-4">{product.channelProducts[0].salePrice}</td>
                    <td className="px-6 py-4">{product.channelProducts[0].stockQuantity}</td>
                    <td className="px-6 py-4">{product.channelProducts[0].brandName}</td>
                    <td className="px-6 py-4">{new Date(product.channelProducts[0].regDate).toISOString().split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
