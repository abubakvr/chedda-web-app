import React from "react";
import InfoIcon from "@/assets/icon/info-gradient-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
export const RouteCard = () => {
  const { poolId } = useParams();

  return (
    <div className="pool-card rounded-lg w-full mt-6 px-10 pb-6 pt-8">
      <div className="relative flex gap-x-20 items-center text-white text-xl font-bold border-b border-[#51D5FA30]">
        <Link
          href={`/markets/${poolId.toString()}/pool`}
          className="card-gradient-text font-bold"
          style={{ fontWeight: 600 }}
        >
          Pool
          <div className="w-full h-1 rounded route-active-bar mt-3"></div>
        </Link>
        <Link href={`/markets/${poolId.toString()}/stake`} className="pb-3">
          Stake
        </Link>
        <Link href={`/markets/${poolId.toString()}/lock`} className="pb-3">
          Lock
        </Link>
      </div>
      <div className="flex gap-x-4 mt-6">
        <Image src={InfoIcon} alt="info icon" />
        <p className="text-[#B5B5B5] text-lg">
          Stake your LP tokens to earn CHEDDA token rewards. CHEDDA token
          emissions are directed by how much CHEDDA is locked in a pools' gauge.
        </p>
      </div>
    </div>
  );
};
