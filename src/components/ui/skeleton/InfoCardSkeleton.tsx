import React from "react";

interface InfoCardSkeleton {
  title: string;
}

export const InfoCardSkeleton = ({ title }: InfoCardSkeleton) => {
  return (
    <div
      className="flex flex-col justify-between"
      data-testid="info-loading-element"
    >
      <div className="placeholder-header card-header-bg rounded-t-lg px-8 h-[50px] flex justify-between items-center">
        <div
          className="text-white text-opacity-50 font-bold text-lg"
          data-testid="info-card-title"
        >
          {title}
        </div>
      </div>

      <div className="placeholder-footer p-8">
        {/* Placeholder values for loading state */}
        <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-8 mb-5">
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-6 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-4 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-8 mb-5">
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-6 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-4 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-center text-sm md:col-span-1 space-y-8">
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-6 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-4 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
