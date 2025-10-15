import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Created by Mudit kalra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className="mx-auto p-2 sm:p-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
            <Navbar />
            {children}
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
