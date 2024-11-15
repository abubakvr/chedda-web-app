import "@/styles/globals.scss";
import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders/AppProviders";
import { AppHeader } from "@/layout";
import { headers } from "next/headers";
import { WelcomeModal } from "@/components/modals";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_TRACKING_ID } from "@/utils/constants";
import { Footer } from "@/layout/AppFooter";

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
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
        <AppProviders nonce={nonce}>
          <AppHeader />
          <WelcomeModal />
          <div className="py-20 xl:pt-24 pb-10 ">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
