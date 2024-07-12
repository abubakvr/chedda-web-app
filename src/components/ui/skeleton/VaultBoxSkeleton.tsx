import React from "react";

interface VaultBoxSkeletonProps {
  itemCount: number;
}

export const VaultBoxSkeleton: React.FC<VaultBoxSkeletonProps> = ({
  itemCount,
}) => (
  <div
    role="status"
    data-testid="vault-skeleton"
    className="grid grid-cols-3 w-full gap-x-6"
  >
    {[...Array(itemCount)].map((_, index) => (
      <div
        key={index}
        data-testid={`skeleton-item-container`}
        className="pool-card rounded-lg w-full px-7 py-5 text-white hover:opacity-90 cursor-pointer p-6"
      >
        <div className="animate-pulse flex flex-col justify-center text-sm md:col-span-1 space-y-8 ">
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-10 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-5 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-10 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-5 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-10 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-5 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
          <div className="flex flex-col">
            <div
              data-testid={`skeleton-item-element-1`}
              className="h-10 bg-gray-300 rounded-md dark:bg-blue-200 opacity-20 w-full mb-2.5"
            ></div>
            <div
              data-testid={`skeleton-item-element-2`}
              className="h-5 bg-gray-300 rounded-md dark:bg-blue-200 opacity-10 w-2/3"
            ></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
