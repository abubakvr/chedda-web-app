import React from "react";

export const MyInformationSkeleton = () => {
  return (
    <div
      className="flex flex-col justify-between"
      data-testid="myinformation-loading-element"
    >
      <div className="placeholder-header card-header-bg rounded-t-lg px-8 h-[50px] flex justify-between items-center">
        <div className="text-white text-opacity-50 font-bold text-lg">
          My Information
        </div>
        <div className="flex gap-x-1 bg-blue-100 opacity-10 animate-pulse rounded w-32 h-7"></div>
      </div>

      <div className="placeholder-content flex justify-between items-center animate-pulse p-8 border-b border-gray-500">
        <div className="h-fit mb-4">
          <div className="flex">
            {/* Collateral logo placeholders */}
            <div
              className="logo-cascade round-image"
              data-testid="collateral-logo"
            >
              <div className="placeholder-logo h-10 w-10 rounded-full bg-blue-200 opacity-10 "></div>
            </div>
            <div
              className="logo-cascade round-image ml-2"
              data-testid="collateral-logo"
            >
              <div className="placeholder-logo h-10 w-10 rounded-full bg-blue-200 opacity-10"></div>
            </div>
            <div
              className="logo-cascade round-image ml-2"
              data-testid="collateral-logo"
            >
              <div className="placeholder-logo h-10 w-10 rounded-full bg-blue-200 opacity-10"></div>
            </div>
          </div>
          {/* Collateral names placeholder */}
          <div className="w-fit font-bold flex rounded flex-wrap text-ellipsis overflow-hidden">
            <div className="mt-2 rounded flex justify-start items-start text-ellipsis text-white text-[10px] font-semibold">
              <div className="placeholder-text bg-blue-200 opacity-10 w-20 h-5 rounded"></div>
            </div>
          </div>
        </div>
        {/* Manage Collateral button placeholder */}
        <div className="flex justify-between items-center">
          <div className="placeholder-text bg-blue-200 opacity-10 w-32 h-8 rounded"></div>
        </div>
      </div>

      <div className="placeholder-footer p-8 pb-0">
        {/* Placeholder values for loading state */}
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Available to Supply</div>
          <div className="placeholder-text bg-blue-200 opacity-10 rounded w-20 h-5"></div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Total Supplied</div>
          <div className="placeholder-text bg-blue-200 opacity-10 rounded w-20 h-5"></div>
        </div>
        <div className="flex justify-between pb-4">
          <div className="opacity-50 text-sm">Total Borrowed</div>
          <div className="placeholder-text bg-blue-200 opacity-10 rounded w-20 h-5"></div>
        </div>
        <div className="flex justify-between">
          <div className="opacity-50 text-sm">Health Factor</div>
          <div className="placeholder-text bg-blue-200 opacity-10 rounded w-20 h-5"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 space-y-5 w-full">
        {/* Supply and Borrow button placeholders */}
        <div className="placeholder-button bg-blue-200 opacity-10 rounded w-full h-11"></div>
        <div className="placeholder-button bg-blue-200 opacity-10 rounded w-full h-11"></div>
      </div>
    </div>
  );
};
