"use client";
import checkLogo from "@/assets/icon/check-gradient.svg";
import Image from "next/image";
import networksImg from "@/assets/images/networks-img.png";
import bridgeVector from "@/assets/images/bridge-vector.png";

export const BridgeAssets = () => {
  return (
    <div className="pool-card text-white rounded-lg shadow-lg flex justify-between items-center">
      <div className="flex relative w-3/5">
        <div className="absolute px-8 py-10">
          <h2 className="text-3xl font-bold mb-4">
            Bridge assets from other
            <br /> networks to use on CHEDDA
          </h2>
          <div className="list-disc list-inside text-sm text-[#FFFFFF50] mb-6">
            <div className="flex space-x-3 items-center">
              <Image src={checkLogo} alt="check" />
              <span>
                Bridged assets can be supplied or as collateral in CHEDDA
                lending pools
              </span>
            </div>
            <div className="flex space-x-3 items-center">
              <Image src={checkLogo} alt="check" />
              <span>Bridged assets can be bridged back at any time</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="modal-button w-32 text-white rounded-lg p-2.5 text-sm font-bold">
              Go to Bridge
            </button>
            <button className="secondary-button button-gradient-text w-32 text-white rounded-lg p-2.5  text-sm font-bold">
              Learn more
            </button>
          </div>
        </div>
        <div className="flex items-right ml-60">
          <Image src={bridgeVector} alt="bridge vector" className="h-full" />
        </div>
      </div>
      <div className="flex w-max">
        <Image src={networksImg} alt="networks" />
      </div>
    </div>
  );
};
