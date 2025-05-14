export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg w-full md:mt-2 lg:mt-6 xl:mt-6">
      <div className="relative flex items-center text-white text-xl md:text-2xl xl:text-[32px] font-bold">
        {children}
      </div>
    </div>
  );
};
