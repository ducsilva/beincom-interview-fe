"use client";
import { Inter } from "next/font/google";

import "../../styles/index.css";
import { AuthProvider } from "@/contexts";
import { Header, ScrollToTop } from "@/components";


const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body className={`${inter.className}`}>
                <AuthProvider>
                    <Header />
                    {children}
                    <ScrollToTop />
                </AuthProvider>
            </body>
        </html>
    );
}
