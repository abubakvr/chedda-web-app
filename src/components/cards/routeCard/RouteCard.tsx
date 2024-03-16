import InfoIcon from "@/assets/icon/info-gradient-icon.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const RouteCard = ({
  setActiveTab,
  activeTab,
  routeInfo,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
  routeInfo: string;
}) => {
  const routhPaths = ["Pool", "Stake", "Lock"];

  const handleTabButton = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("savedPoolTab", tab);
  };

  return (
    <div
      className="pool-card rounded-lg w-full mt-6 px-10 pb-6 pt-8"
      data-testid="route-card-container"
    >
      <div className="relative flex gap-x-20 items-center text-white text-xl font-bold border-b border-[#51D5FA30]">
        {routhPaths.map((item, index) => {
          const isActive = item === activeTab;

          return (
            <button
              key={index}
              onClick={() => handleTabButton(item)}
              className={`${isActive && "card-gradient-text"} font-bold`}
              style={{ fontWeight: isActive ? 600 : "" }}
            >
              {item}
              {isActive ? (
                <div className="w-full h-1 rounded route-active-bar mt-3"></div>
              ) : (
                <div className="mt-4"></div>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex gap-x-4 mt-6">
        <Image src={InfoIcon} alt="info icon" />
        <p className="text-[#B5B5B5] text-lg">{routeInfo}</p>
      </div>
    </div>
  );
};
