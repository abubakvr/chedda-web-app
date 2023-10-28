import "@/styles/globals.scss";
import { Open_Sans } from "next/font/google";

import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders/AppProviders";
import { AppHeader } from "@/layout";

export const metadata: Metadata = {
  title: "Chedda Markets",
  description: "Chedda Marketplace",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={openSans.className}>
        <AppProviders>
          <AppHeader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
