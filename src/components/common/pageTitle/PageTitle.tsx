import Image from "next/image";
import InfoIcon from "@/assets/icon/info-gradient-icon.svg";

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pool-card rounded-lg w-full mt-2 md:mt-2 lg:mt-4 xl:mt-4 p-4 md:p-6 md:px-8 xl:px-10 xl:py-8">
      <div className="flex gap-x-2 xl:gap-x-4 items-center">
        <Image
          style={{ color: "" }}
          src={InfoIcon}
          alt="info icon"
          className="w-4 h-4 md:w-[18px] md:h-[18px] xl:w-6 xl:h-6"
        />
        <p className="text-[#B5B5B5] text-[11px] md:text-xs lg:text-lg">
          {children}
        </p>
      </div>
    </div>
  );
};
