import "@/styles/globals.scss";

import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders/AppProviders";
import { AppHeader } from "@/layout";

export const metadata: Metadata = {
  title: "Chedda Markets",
  description: "Chedda Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <AppProviders>
          <AppHeader />
          <div className="py-20 xl:pt-24 pb-10 ">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
