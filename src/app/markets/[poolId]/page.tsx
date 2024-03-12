"use client";
import { redirect, useParams } from "next/navigation";

const Page = () => {
  const { poolId } = useParams();

  return redirect(`/markets/${poolId.toString()}/pool`);
};

export default Page;
