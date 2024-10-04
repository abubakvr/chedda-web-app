"use client";

import Image from "next/image";
import SubtractIcon from "@/assets/icon/subtract-icon.svg";
import { Button } from "@/components/common";
import { CHEDDA_TERMS_LINK, HOMEPAGE_LINK } from "@/utils/constants";

export const RestrictedModal = () => {
  const handlePageRedirect = () => {
    window.open(HOMEPAGE_LINK, "_blank");
  };

  return (
    <div
      data-testid="restrictedModal"
      className={`fixed inset-0 transition-all duration-500 opacity-100 visible bg-[#00000024] bg-opacity-75 overflow-y-auto backdrop-filter backdrop-blur-sm z-20`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="app-modal p-6 md:p-8 flex flex-col items-center rounded shadow-lg w-11/12 max-w-[350px] sm:max-w-[330px] md:max-w-[480px] lg:max-w-[580px] text-white">
          <Image
            style={{ color: "" }}
            src={SubtractIcon}
            alt="success"
            className="flex self-center w-[56px] h-[56px] md:w-[72px] md:h-[72px] lg:w-[96px] lg:h-[96px]"
          />
          <h1 className="flex justify-center text-lg md:text-2xl lg:text-3xl font-bold mt-4 md:mt-6 lg:mt-8">
            Access Restricted
          </h1>
          <p className="text-[10px] md:text-sm lg:text-[18px] mt-4 md:mt-6 lg:mt-8 terms-text text-center text-[#FFFFFF70]">
            Access to residents that are located or incorporated in, or have a
            registered agent in a blocked country or a restricted territory is
            prohibited. More details can be found in our
            <a
              href={CHEDDA_TERMS_LINK}
              target="_blank"
              rel="noreferrer"
              className="relative text-[#C142F0] hover:opacity-80 pl-1"
            >
              Terms of Service.
            </a>
          </p>
          <Button
            type="primary"
            size="large"
            className="mt-6 md:mt-8 lg:mt-12"
            onClick={handlePageRedirect}
            ignoreChecks={true}
          >
            GO TO HOMEPAGE
          </Button>
        </div>
      </div>
    </div>
  );
};
