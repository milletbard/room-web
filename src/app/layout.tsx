import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room Web",
  description:
    "Room Web is a web application that allows users to create and join rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <div className="flex flex-col container mx-auto  justify-center items-center min-h-[100vh] min-w-[100vw] gap-4">
          {children}
        </div>
      </body>
    </html>
  );
}
