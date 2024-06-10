"use client";
import { Inter } from "next/font/google";

import "../../styles/index.css";
import { AuthProvider } from "@/contexts";
import { Header } from "@/components";


const inter = Inter({ subsets: ["latin"] });

export default function PostDetailLayout({
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
                </AuthProvider>
            </body>
        </html>
    );
}
