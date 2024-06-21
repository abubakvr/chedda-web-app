import { Card } from "@/components/common";
import Image from "next/image";
import linkOut from "@/assets/icon/link-out-white.svg";
import { ConnectWalletBox } from "./ConnectWalletBox";

interface CheddaInfoProps {
  isWalletConnected: boolean;
}

export const CheddaInfo = ({ isWalletConnected }: CheddaInfoProps) => {
  return (
    <Card title="CHEDDA INFO">
      {isWalletConnected ? (
        <>
          <div className="flex justif-between gap-x-2">
            <div className="hazy-bg p-6 w-full space-y-2">
              <p className="text-sm text-[#FFFFFF70] font-semibold">
                WALLET BALANCE
              </p>
              <p className="text-2xl text-white font-bold">56.56 CHEDDA</p>
              <p className="text-sm text-[#FFFFFF70]">$1,163.66</p>
            </div>
            <div className="hazy-bg p-6 w-full space-y-2">
              <p className="text-sm text-[#FFFFFF70] font-semibold">
                CHEDDA PRICE
              </p>
              <p className="text-2xl text-white font-bold">$20.56</p>
              <p className="text-sm text-[#FFFFFF70] underline card-gradient-text bor">
                See market trend
              </p>
            </div>
            <div className="hazy-bg p-6 w-full space-y-2">
              <p className="text-sm text-[#FFFFFF70] font-semibold">
                MARKET CAP
              </p>
              <p className="text-2xl text-white font-bold">$800.56 M</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-[#FFFFFF70]">
              Overview of CHEDDA Info
            </div>
            <button className="modal-button text-white rounded-lg p-3 px-4 text-xs font-bold flex gap-x-2">
              <p>Buy CHEDDA</p>
              <Image src={linkOut} alt="link out" className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <ConnectWalletBox title="CHEDDA info" />
      )}
    </Card>
  );
};
