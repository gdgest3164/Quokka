import { LoaderFunction, redirect, type MetaFunction } from "@remix-run/node";
import Component from "../Components/Layouts/component";
import { useEffect, useState } from "react";
import { apiSellerAddressUpdate, status_stockAutoProcess, stockAutoProcess } from "../api/api";
import { useLoaderData } from "@remix-run/react";
import { LoaderData } from "../root";
// import moment from "moment";
import { getSession } from "../utils/cookies";

export const meta: MetaFunction = ({ error }) => {
  return [{ title: error ? "oops!" : "대시보드 | 쿼카" }];
};
export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
  //셀러 브랜드 정보
  const session = await getSession(request.headers.get("Cookie"));
  const channelNo = session.get("Qk_channel");

  if (!channelNo) return redirect("/");

  // const responseData = await apiSellerBrand();
  const data = {
    cookie: channelNo,
    brand: channelNo.data,
    channelNo: channelNo.data.channelNo,
  };

  return data;
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  // const [updateDate, setUpdateDate] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    // const formattedDate = moment.utc(data.brand!.update_at).format("YYYY-MM-DD HH:mm:ss");
    // setUpdateDate(formattedDate);
    setUpdating(data.brand!.stock_auto ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //재고수 업데이트 이벤트
  const stockUpdate = async () => {
    const status = await (await status_stockAutoProcess(JSON.stringify(data.cookie!))).json();
    setUpdating(true);

    if (!status.status) {
      const stock_start = await stockAutoProcess(JSON.stringify(data.cookie!));
      if (stock_start.ok) {
        // setUpdateDate(moment().format("YYYY-MM-DD HH:mm:ss"));
      }
    }
    setUpdating(false);
  };

  //도매업 업데이트
  const wholesale_update = async () => {
    const response = await apiSellerAddressUpdate(JSON.stringify(data.cookie!));
    if (response.ok) {
      const data = await response.json();
      if (data.result) return alert("도매업 업데이트 완료!");
      else return alert("업데이트할 내역이 없습니다.");
    } else {
      throw new Error("도매업 업데이트 실패");
    }
  };

  return (
    <>
      <Component>
        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              재고 업데이트{updating && "중..."}
              <button className="ml-2" onClick={() => !updating && stockUpdate()} disabled={updating}>
                <svg className={`${updating && "animate-spin"} w-6 h-6 text-gray-800 dark:text-white`} aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4" />
                </svg>
              </button>
            </h5>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{updateDate}</p> */}
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              도매업 업데이트
              <button className="ml-2" onClick={() => wholesale_update()}>
                <svg className={`w-6 h-6 text-gray-800 dark:text-white`} aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4" />
                </svg>
              </button>
            </h5>
          </div>
          {/* 
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>*/}
        </div>
      </Component>
    </>
  );
}
