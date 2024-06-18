import { Card, PageTitle, PageContainer } from "@/components/common";
import linkOut from "@/assets/icon/link-out-white.svg";
import Image from "next/image";
import React from "react";
import { PositionInfo } from "./components/PositionInfo";
import { MyPositions } from "./components/MyPositions";
import { BridgeAssets } from "./components/BridgeAssetInfo";

const Page = () => {
  return (
    <PageContainer>
      <PageTitle title="DASHBOARD">
        Track all your positions in one place.
      </PageTitle>
      <div className="mt-6 flex justify-between w-full space-x-6">
        <div className="w-[58%]">
          <Card title="CHEDDA INFO">
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
          </Card>
        </div>
        <div className="w-[42%]">
          <Card title="CHEDDA INFO">
            <div className="hazy-bg flex justif-between gap-x-2">
              <div className="flex flex-col items-center p-4 w-full space-y-1">
                <p className="text-sm text-[#FFFFFF70] font-semibold">
                  Lock Rewards
                </p>
                <p className="text-3xl font-bold card-gradient-text">0.758</p>
                <p className="text-sm font-bold card-gradient-text">CHEDDA</p>
                <p className="text-sm text-[#FFFFFF70]">$14.23</p>
              </div>
              <div className="border-0.5 border-l border-[#7F56D9] h-10/12 my-3 opacity-70"></div>
              <div className="flex flex-col items-center p-4 w-full space-y-1">
                <p className="text-sm text-[#FFFFFF70] font-semibold">
                  Stake Rewards
                </p>
                <p className="text-3xl font-bold card-gradient-text">1.282</p>
                <p className="text-sm font-bold card-gradient-text">CHEDDA</p>
                <p className="text-sm text-[#FFFFFF70]">$26.35</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-[#FFFFFF70]">
                Claim all your rewards on the protocol in one place
              </div>
              <button className="modal-button text-white rounded-lg p-2.5 px-6 text-sm font-bold">
                Claim all
              </button>
            </div>
          </Card>
        </div>
      </div>
      <div className="">
        <PositionInfo />
      </div>
      <div className="mt-6">
        <MyPositions />
      </div>
      <div className="mt-6">
        <BridgeAssets />
      </div>
    </PageContainer>
  );
};

export default Page;
