import Image from "next/image";
import Link from "next/link";
import arrowForward from "@/assets/icon/arrow-forward.svg";

export const EmptyPositionCard = () => {
  return (
    <div
      className="hazy-bg w-full flex flex-col items-center justify-center h-48 text-white relative"
      data-testid="empty-position-card"
    >
      <p data-testid="connect-wallet-message">
        You do not have any open position. Supply to earn rewards.
      </p>
      <Link
        className="modal-button text-white rounded-lg p-2.5 px-3 text-sm font-bold mt-4 hover:opacity-80 flex items-center gap-x-1.5"
        href={"/markets"}
        data-testid="markets-button"
      >
        <span>Go to Markets</span>
        <Image src={arrowForward} alt="arrow forward" />
      </Link>
    </div>
  );
};
