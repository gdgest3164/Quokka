import { Product } from "../Product/product.type";

export default function Navigation({ products, handleNavigation }: { products: Product; handleNavigation: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <nav className="flex justify-center m-3">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            disabled={products.first}
            onClick={(e) => handleNavigation(e)}
            data-nav-operation="first"
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              products.first ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            처음으로
          </button>
        </li>
        <li>
          <button
            disabled={products.first}
            onClick={(e) => handleNavigation(e)}
            data-nav-operation="previous"
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
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
            onClick={(e) => handleNavigation(e)}
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
  );
}
