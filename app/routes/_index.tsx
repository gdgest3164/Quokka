import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProduct, Inven } from "../models/inventory.service";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export interface Invens {
  inventorys: Inven[];
}

export const loader: LoaderFunction = async () => {
  const inventorys = await getProduct();
  console.log(inventorys);
  return json<Invens>({
    inventorys: (inventorys.data as unknown as Array<Inven>) ?? [],
  });
};

export default function Index() {
  const { inventorys } = useLoaderData<typeof loader>();
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>생성일</th>
          <th>제품명</th>
          <th>도매 도메인</th>
          <th>제품 코드</th>
          <th>재고 옵션</th>
        </tr>
      </thead>
      <tbody>
        {inventorys.map((inventory: Inven) => (
          <tr key={inventory.id}>
            <td>{inventory.id}</td>
            <td>{new Date(inventory.created_at).toLocaleDateString()}</td>
            <td>{inventory.pd_name}</td>
            <td>{inventory.wholesale_domain}</td>
            <td>{inventory.pd_code}</td>
            <td>
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
  );
}
