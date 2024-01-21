type TableTitle = {
  title: string;
  width: string;
};

export default function Table({ table_title, state, loading, data }: { table_title: TableTitle[]; state: string; loading: React.ReactNode; data: React.ReactNode }) {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {table_title.map((t, i) => (
              <th key={i} scope="col" className="px-4 py-3 whitespace-nowrap" style={{ width: t.width }}>
                {t.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{state === "loading" ? loading : data}</tbody>
      </table>
    </>
  );
}
