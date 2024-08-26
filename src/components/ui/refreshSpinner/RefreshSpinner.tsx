import React from "react";
import LoadingIcon from "@/assets/icon/loading-icon.svg";
import Image from "next/image";

export const RefreshSpinner = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <div className={`${isOpen ? "flex" : "hidden"}  animate-spin-slow`}>
      <Image
        style={{ color: "" }}
        src={LoadingIcon}
        alt="loading spinner"
        className="flex self-center w-3 h-3"
        data-testid="loading-icon"
      />
    </div>
  ) : null;
};
