import React from "react";

interface SwitchTabSkeletonProps {
  title: string;
  itemCount?: number;
}

export const SwitchTabSkeleton = ({}) => {
  return (
    <div
      className="w-full lg:w-[470px] text-white px-6 py-5 xl:px-8 xl:py-6 animate-pulse"
      data-testid="info-loading-element"
    >
      <div className="flex bg-[#ffffff50] h-8 md:h-10 lg:h-11 w-full rounded-lg justify-between p-2 opacity-40"></div>
      <div className="flex flex-col mt-4 md:mt-6">
        <div
          data-testid={`skeleton-item-element-1`}
          className="h-5 md:h-6 lg:h-7 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-20 w-2/3 mb-2"
        ></div>
        <div
          data-testid={`skeleton-item-element-2`}
          className="h-3 lg:h-4 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-10 w-2/4 mb-4"
        ></div>

        <div
          data-testid={`skeleton-item-element-2`}
          className="h-3 lg:h-4 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-10 w-1/4 mb-2"
        ></div>
        <div className="flex bg-[#ffffff50]  h-8 md:h-10 lg:h-11 w-full rounded-lg justify-between p-2 opacity-40 mb-5"></div>
        <div className="flex bg-[#ffffff50]  h-8 md:h-10 lg:h-11 w-full rounded-lg justify-between p-2 opacity-40 mb-5"></div>
        <div
          data-testid={`skeleton-item-element-1`}
          className="h-5 md:h-6 lg:h-7 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-20 w-2/3 mb-2.5"
        ></div>
        <div
          data-testid={`skeleton-item-element-2`}
          className="h-3 lg:h-4 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-10 w-2/4 mb-5"
        ></div>
        <div
          data-testid={`skeleton-item-element-1`}
          className="h-5 md:h-6 lg:h-7 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-20 w-2/3 mb-2.5"
        ></div>
        <div
          data-testid={`skeleton-item-element-2`}
          className="h-3 lg:h-4 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-10 w-2/4"
        ></div>
      </div>
    </div>
  );
};
