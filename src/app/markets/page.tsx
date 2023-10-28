import React from "react";

import { VaultCard, MarketInfoCard } from "@/components/cards";

const page = () => {
  return (
    <div className="w-11/12 lg:w-[95%] xl:w-11/12 2xl:w-5/6 3xl:w-9/12 mx-auto">
      <div className="text-white mt-5 font-open-sans text-2xl xl:text-3xl font-semibold tracking-normal uppercase">
        MARKETS
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 lg:flex lg:gap-x-0 mt-5 lg:space-x-3 xl:space-x-5 flex-wrap lg:flex-nowrap">
        <MarketInfoCard title="Total Supplied" value={"$122.56 M"} />
        <MarketInfoCard title="Total Borrowed" value={"$100.56 M"} />
        <MarketInfoCard title="Total Available" value={"$800.56 M"} />
        <MarketInfoCard title="No. Of Vaults" value={"4"} />
        <MarketInfoCard title="Total Earned" value={"$12,680.28"} />
        <MarketInfoCard title="TVL" value={"$1.2 M"} />
      </div>
      <div className="mt-8">
        <VaultCard />
      </div>
    </div>
  );
};

export default page;
