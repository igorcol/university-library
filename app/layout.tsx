import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

import localFont from "next/font/local";

const ibmPlexSans = localFont({
  src: [
    { path: "../public/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "../public/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "Book borrowing university managment solution.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
