import React from "react";

interface InfoCardSkeleton {
  title: string;
  itemCount?: number;
}

export const InfoCardSkeleton = ({
  title,
  itemCount = 3,
}: InfoCardSkeleton) => {
  return (
    <div
      className="flex flex-col justify-between"
      data-testid="info-loading-element"
    >
      <div className="placeholder-header card-header-bg flex justify-between w-full rounded-t-lg px-4 md:px-6 lg:px-8 h-10 lg:h-[50px] items-center">
        <div
          className="text-white text-opacity-50 font-bold text-2xs lg:text-sm uppercase"
          data-testid="info-card-title"
        >
          {title}
        </div>
      </div>
      <div className="placeholder-footer p-4 md:p-6 lg:p-8">
        {[...Array(itemCount)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-center text-sm md:col-span-1 space-y-8 mb-5 animate-pulse"
          >
            <div className="flex flex-col">
              <div
                data-testid={`skeleton-item-element-1`}
                className="h-5 file:md:h-6 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
              ></div>
              <div
                data-testid={`skeleton-item-element-2`}
                className="h-3 md:h-4 bg-gray-300 rounded md:rounded-md dark:bg-blue-200 opacity-10 w-2/3"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
