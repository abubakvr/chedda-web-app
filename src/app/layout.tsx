import "@/styles/globals.scss";

import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders/AppProviders";

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
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
