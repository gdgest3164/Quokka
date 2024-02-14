import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ProductAddress } from "../Product/product.type";
import { categorySearch } from "../../api/api";

interface ProductAddModalProps {
  get_open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: ProductAddress[];
  input_datas: ({ who, code }: { who: string; code: string; cate: string }) => void;
}

export default function ProductAddModal({ get_open, setOpen, address, input_datas }: ProductAddModalProps) {
  const [open, setOpenState] = useState(get_open || false);
  const [select, setSelect] = useState("");
  const [cateSelect, setCateSelect] = useState("");
  const [categorys, setCategorys] = useState<Array<[number, string, string, string]>>();
  const [code, setCode] = useState("");
  const [filteredAddress, setFilteredAddress] = useState<Array<[number, string, string, string]>>();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpenState(get_open);
    const fetchCategorys = async () => {
      const all_categorys = await categorySearch();
      setCategorys(all_categorys);
    };
    fetchCategorys();
  }, [get_open]);

  useEffect(() => {
    address[0] && setSelect(address[0]["addressBookNo"].toString());
  }, [address]);

  const addButtonEvent = () => {
    if (!code || !select || !cateSelect) return;

    //url 검증 함수
    const isValidUrl = (urlString: string) => {
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!urlPattern.test(urlString);
    };

    if (!isValidUrl(code)) {
      alert("유효하지 않은 URL입니다. 다시 확인해주세요.");
      return;
    }

    input_datas({ who: select, code: code, cate: cateSelect });
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
                        상품등록
                      </Dialog.Title>
                      <hr className="w-full my-4" />
                      <div className="mt-2">
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
                            </svg>
                            도매업을 선택 후, 상품의 url을 입력해주세요.
                          </p>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setSelect(e.target.value.toString())}
                                  >
                                    {Array.isArray(address) &&
                                      address.map(
                                        (who: ProductAddress, i: number) =>
                                          who.is_use && (
                                            <option key={i} value={who.addressBookNo}>
                                              {who.name}
                                            </option>
                                          )
                                      )}
                                  </select>
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className={`bg-gray-50 border border-gray-300 sm:text-xs text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 `}
                                    aria-required={true}
                                    placeholder={`상품의 URL OR 상품코드`}
                                    value={code && code}
                                    onInput={(e) => setCode((e.target as HTMLInputElement).value)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  <div className="relative">
                                    <input
                                      id="search"
                                      className={`bg-gray-50 border border-gray-300 sm:text-xs text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-3`}
                                      type="text"
                                      placeholder="카테고리 검색..."
                                      onChange={(e) => {
                                        const value = e.target.value.toLowerCase();
                                        const filteredAddress = categorys ? categorys.filter((cate) => cate[2].includes(value)) : [];
                                        setFilteredAddress(filteredAddress);
                                      }}
                                    />
                                    <select
                                      className={`bg-gray-50 border border-gray-300 sm:text-xs text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 `}
                                      size={5}
                                      onChange={(e) => setCateSelect(e.target.value)}
                                    >
                                      {filteredAddress &&
                                        filteredAddress.map((cate, index) => (
                                          <option key={index} value={cate[0]}>
                                            {cate[1]}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  <button
                                    onClick={() => addButtonEvent()}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-nowrap w-full my-3"
                                  >
                                    상품추가
                                  </button>
                                </td>
                              </tr>
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
