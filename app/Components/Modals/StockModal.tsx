import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ProductAddress } from "../Product/product.type";

interface StockModalProps {
  get_open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: ProductAddress[];
  toggle_id: (addressBookNo: number) => void;
  input_url: (addressBookNo: number, url: string) => void;
}

export default function StockModal({ get_open, setOpen, address, toggle_id, input_url }: StockModalProps) {
  const initialUrlState = useMemo(
    () =>
      address.map((item) => ({
        id: item.addressBookNo,
        url: item.url,
        check: true,
      })),
    [address]
  );

  const [open, setOpenState] = useState(get_open || false);
  const [isCheckUrl, setIsCheckUrl] = useState(initialUrlState);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpenState(get_open);
    setIsCheckUrl(initialUrlState);
  }, [get_open, initialUrlState]);

  //토글 이벤트
  const toggleChange = (get_item: ProductAddress) => {
    toggle_id(get_item.addressBookNo);
  };

  //url 입력 이벤트
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number, addressBookNo: number) => {
    const inputValue = e.target.value;
    addressUpdate(addressBookNo, "url", inputValue);
  };

  //url 입력 검사
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, index: number, addressBookNo: number) => {
    const isUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value);
    addressUpdate(addressBookNo, "check", isUrl);
    if (isUrl) {
      input_url(addressBookNo, e.target.value);
    }
  };

  //address 데이터 변경
  const addressUpdate = (addressBookNo: number, name: string, value: string | number | boolean) => {
    setIsCheckUrl((prevIsCheckUrl) => {
      return prevIsCheckUrl.map((item) => (item.id === addressBookNo ? { ...item, [name]: value } : item));
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        설정
                      </Dialog.Title>
                      <hr className="w-full my-4" />
                      <div className="mt-2">
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
                            </svg>
                            도매사이트의 url을 입력해주세요.
                          </p>

                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              {Array.isArray(address) &&
                                address.map((who: ProductAddress, i: number) => (
                                  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value={who.addressBookNo} checked={who.is_use} className="sr-only peer" onChange={() => toggleChange(who)} />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        {/* Additional content */}
                                      </label>
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{who.name}</td>
                                    <td className="px-6 py-4">
                                      <input
                                        type="text"
                                        value={(isCheckUrl.find((u) => u.id == who.addressBookNo) || {}).url || ""}
                                        className={`bg-gray-50 border border-gray-300 sm:text-xs text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                          !(isCheckUrl.find((u) => u.id == who.addressBookNo) || {}).check &&
                                          "border-red-500 placeholder-red-500 text-red-500 dark:border-red-500 dark:placeholder-red-500 dark:text-red-500"
                                        }`}
                                        placeholder={`${who.name} URL`}
                                        aria-required={true}
                                        onChange={(e) => handleInput(e as React.ChangeEvent<HTMLInputElement>, i, who.addressBookNo)}
                                        onBlur={(e) => handleBlur(e, i, who.addressBookNo)}
                                      />
                                      {!(isCheckUrl.find((u) => u.id == who.addressBookNo) || {}).check && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                          <span className="font-medium">앗!</span> 잘못된 주소를 입력하셨어요!
                                        </p>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    닫기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
