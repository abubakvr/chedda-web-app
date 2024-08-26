import "@/styles/globals.scss";
import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders/AppProviders";
import { AppHeader } from "@/layout";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Chedda Markets",
  description: "Chedda Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = headers().get("x-nonce") as string;

  return (
    <html lang="en" className="bg-black" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <AppProviders nonce={nonce}>
          <AppHeader />
          <div className="py-20 xl:pt-24 pb-10 ">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
