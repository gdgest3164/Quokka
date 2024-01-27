export default function Component({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 sm:ml-52">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">{children}</div>
    </div>
  );
}
