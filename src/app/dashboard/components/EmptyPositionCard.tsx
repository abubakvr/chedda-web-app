import Image from "next/image";
import Link from "next/link";
import arrowForward from "@/assets/icon/arrow-forward.svg";

export const EmptyPositionCard = () => {
  return (
    <div
      className="lg:border rounded-lg lg:border-[#ffffff19] lg:bg-[#ffffff02] w-full flex flex-col items-center justify-center h-48 text-white text-xs md:text-sm lg:text-lg relative"
      data-testid="empty-position-card"
    >
      <p data-testid="connect-wallet-message">
        You do not have any open position. Supply to earn rewards.
      </p>
      <Link
        className="modal-button text-white rounded-md lg:rounded-lg p-1.5 md:p-2 lg:p-2.5 px-3 text-[8px] md:text-xs lg:text-sm font-bold mt-4 hover:opacity-80 flex items-center gap-x-1.5"
        href={"/markets"}
        data-testid="markets-button"
      >
        <span>Go to Markets</span>
        <Image
          style={{ color: "" }}
          src={arrowForward}
          alt="arrow forward"
          className="w-2 h-2 lg:w-3 lg:h-3"
        />
      </Link>
    </div>
  );
};
