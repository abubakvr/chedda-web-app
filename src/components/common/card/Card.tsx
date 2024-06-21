import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: Props) => {
  return (
    <div
      className="pool-card rounded-lg flex flex-col flex-grow"
      data-testid="custom-card"
    >
      <div className="card-header-bg flex justify-between rounded-t-lg px-8 h-[50px] items-center">
        <div className="text-white text-opacity-50 font-bold text-sm uppercase ">
          {title}
        </div>
      </div>
      <div className="px-8 p-4">{children}</div>
    </div>
  );
};
