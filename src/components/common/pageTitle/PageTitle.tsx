import Image from "next/image";
import InfoIcon from "@/assets/icon/info-gradient-icon.svg";

export const PageTitle = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="pool-card rounded-lg w-full md:mt-2 lg:mt-6 xl:mt-6 p-4 md:p-6 md:px-8 xl:px-10 xl:py-8"
      data-testid="route-card-container"
    >
      <div className="relative flex items-center text-white text-lg md:text-2xl xl:text-[32px] pb-2 md:pb-4 font-bold border-b border-[#51D5FA30]">
        {title}
      </div>
      <div className="flex gap-x-2 xl:gap-x-4 mt-[10px] md:mt-4 xl:mt-6 items-center">
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
