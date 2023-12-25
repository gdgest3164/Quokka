import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProduct, Inven } from "../models/inventory.service";
import Switcher from "../Components/Switcher";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export interface Invens {
  inventorys: Inven[];
}

export const loader: LoaderFunction = async () => {
  const inventorys = await getProduct();
  return json<Invens>({
    inventorys: (inventorys.data as unknown as Array<Inven>) ?? [],
  });
};

export default function Index() {
  const { inventorys } = useLoaderData<typeof loader>();
  return (
    <>
      <Switcher />
      <input type="text" id="url" placeholder="URL을 입력하세요" />
      <button
        onClick={async () => {
          // const url = (document.getElementById("url") as HTMLInputElement).value;
        }}
      >
        크롤링시작
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                생성일
              </th>
              <th scope="col" className="px-6 py-3">
                제품명
              </th>
              <th scope="col" className="px-6 py-3">
                도매 도메인
              </th>
              <th scope="col" className="px-6 py-3">
                제품 코드
              </th>
              <th scope="col" className="px-6 py-3">
                재고 옵션
              </th>
            </tr>
          </thead>
          <tbody>
            {inventorys.map((inventory: Inven) => (
              <tr key={inventory.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {inventory.id}
                </th>
                <td className="px-6 py-4">{new Date(inventory.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">{inventory.pd_name}</td>
                <td className="px-6 py-4">{inventory.wholesale_domain}</td>
                <td className="px-6 py-4">{inventory.pd_code}</td>
                <td className="px-6 py-4">
                  {inventory.inventory_optinos.map((option) => (
                    <div key={option.id}>
                      <span>{option.name}</span>
                      <span>{option.price}</span>
                      <span>{option.stock}</span>
                      <span>{new Date(option.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
