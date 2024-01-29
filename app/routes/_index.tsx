import { type MetaFunction } from "@remix-run/node";
import Component from "../Components/Layouts/component";

export const meta: MetaFunction = ({ error }) => {
  return [{ title: error ? "oops!" : "대시보드 | 쿼카" }];
};

export default function Index() {
  return (
    <>
      <Component>
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
              TEST 업데이트
              <button className="ml-2">
                <svg className="w-6 h-6 hover:animate-spin text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4" />
                </svg>
              </button>
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">2024-01-29 11:28:31</p>
          </div>

          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
          <div className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-28">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </p>
          </div>
        </div>
      </Component>
    </>
  );
}
