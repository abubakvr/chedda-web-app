import React from "react";

interface LoadingSkeletonProps {
  itemCount: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  itemCount,
}) => (
  <div
    role="status"
    className="w-full space-y-4 mt-3 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700"
  >
    {[...Array(itemCount)].map((_, index) => (
      <div
        key={index}
        className="h-auto w-full py-5 hidden md:grid grid-cols-1 grid-row-bg justify-between text-white hover:opacity-80 cursor-pointer"
      >
        <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-8">
          <div className="flex flex-col">
            <div className="h-10 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"></div>
            <div className="h-5 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
