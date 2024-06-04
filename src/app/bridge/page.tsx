"use client";
import PageContainer from "@/components/common/container/PageContainer";
import dynamic from "next/dynamic";

const BridgeCard = dynamic(
  () => import("@/components/cards/bridgeCard/BridgeCard"),
  { ssr: false }
);
const page = () => {
  return (
    <PageContainer>
      <BridgeCard />
    </PageContainer>
  );
};

export default page;
