import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto py-8"
      data-testid="page-container"
    >
      {children}
    </div>
  );
};

export default PageContainer;
