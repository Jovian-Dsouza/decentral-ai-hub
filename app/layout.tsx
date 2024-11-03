import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RecoilProvider } from "@/components/providers/RecoilProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DecentralAI Hub",
  description: "A marketplace where AI developers store and monetize training datasets using 0G's storage. Features include dataset versioning, quality verification, and usage tracking. Developers earn revenue when their datasets are used for model training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized`}
      >
          <RecoilProvider>
            {children}
          </RecoilProvider>
      </body>
    </html>
  );
}
