import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ProductAddress } from "../Product/product.type";
import { categorySearch } from "../../api/api";
import Loading from "../Loading";

interface ProductAddModalProps {
  get_open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: ProductAddress[];
  input_datas: ({ who, code, cate }: { who: string; code: string; cate: string }) => Promise<boolean>;
}

export default function ProductAddModal({ get_open, setOpen, address, input_datas }: ProductAddModalProps) {
  const [open, setOpenState] = useState(get_open || false);
  const [loading, setLoading] = useState<boolean>();
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
    setLoading(false);
  }, [get_open]);

  useEffect(() => {
    address[0] && setSelect(address[0]["addressBookNo"].toString());
  }, [address]);

  const addButtonEvent = async () => {
    if (!code || !select || !cateSelect) return;
    //url 검증 함수
    // const isValidUrl = (urlString: string) => {
    //   const urlPattern = new RegExp(
    //     "^(https?:\\/\\/)?" + // protocol
    //       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    //       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    //       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    //       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    //       "(\\#[-a-z\\d_]*)?$",
    //     "i"
    //   ); // fragment locator
    //   return !!urlPattern.test(urlString);
    // };

    // if (!isValidUrl(code)) {
    //   alert("유효하지 않은 URL입니다. 다시 확인해주세요.");
    //   return;
    // }

    setLoading(true);

    const result = await input_datas({ who: select, code: code, cate: cateSelect });
    console.log(result);
    if (!result) setLoading(false);
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
                <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
                  {/* 로딩 */}
                  <Loading show={loading} />

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      {/* <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex justify-center items-center w-full h-full z-10">
                        <div className="inset-0 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-xs transition-opacity absolute w-full h-full" />
                        <div role="status">
                          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none">
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
                      </div> */}

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
                            도매업을 선택 후, 상품의 코드를 입력해주세요.
                          </p>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-xs"
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
                                    placeholder={`ex) 1003010/1003011`}
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
                                        if (e.target.value.length >= 2) {
                                          const value = e.target.value.toLowerCase();
                                          const filteredAddress = categorys ? categorys.filter((cate) => cate[2].includes(value)) : [];
                                          setFilteredAddress(filteredAddress);
                                        }
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
                                    className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800 text-nowrap w-full my-3"
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
                    onClick={() => {
                      setLoading(false);
                      setOpen(false);
                    }}
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
