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
      className="pool-card rounded-lg w-full mt-6 px-10 pb-6 pt-8"
      data-testid="route-card-container"
    >
      <div className="relative flex items-center text-white text-[32px] pb-4 font-bold border-b border-[#51D5FA30]">
        {title}
      </div>
      <div className="flex gap-x-4 mt-6 items-center">
        <Image src={InfoIcon} alt="info icon" className="w-4 h-4" />
        <p className="text-[#B5B5B5] text-lg">{children}</p>
      </div>
    </div>
  );
};
