"use client";
import InfoIcon from "@/assets/icon/info-gradient-icon.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const RouteCard = ({
  setActiveTab,
  activeTab,
  routeInfo,
  routhPaths,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
  routeInfo: string | undefined;
  routhPaths: string[];
}) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleActiveScreen(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("tab", term);
    } else {
      params.delete("tab");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleTabButton = (tab: string) => {
    setActiveTab(tab);
    handleActiveScreen(tab);
  };

  return (
    <div
      className={`pool-card rounded-lg w-full mt-6 px-4 pt-4 md:px-6 md:pt-6 xl:px-10 ${routeInfo && "pb-4 md:pb-6"} xl:pt-8`}
      data-testid="route-card-container"
    >
      <div className="relative flex md:gap-x-16 xl:gap-x-20 items-center justify-between md:justify-start text-white text-sm md:text-lg lg:text-xl font-bold border-b border-[#51D5FA30]">
        {routhPaths.map((item, index) => {
          const isActive = item === activeTab;

          return (
            <button
              key={index}
              onClick={() => handleTabButton(item)}
              className={`${isActive && "card-gradient-text"} font-bold w-full md:w-fit hover:text-[#FFFFFF99] transition-all`}
              style={{ fontWeight: isActive ? 600 : "" }}
            >
              {item}
              {isActive ? (
                <div className="w-full h-1 rounded route-active-bar mt-2 xl:mt-3"></div>
              ) : (
                <div className="mt-3 xl:mt-4"></div>
              )}
            </button>
          );
        })}
      </div>
      {routeInfo && (
        <div
          className={`flex items-center xl:items-start gap-x-4 mt-2 md:mt-4 mt-xl:mt-6`}
        >
          <Image
            src={InfoIcon}
            alt="info icon"
            className="w-[18px] h-[18px] xl:w-6 xl:h-6"
          />
          <p className="text-[#FFFFFF80] text-[10px] text-xs lg:text-sm xl:text-lg">
            {routeInfo}
          </p>
        </div>
      )}
    </div>
  );
};
