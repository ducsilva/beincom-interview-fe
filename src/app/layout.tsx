"use client";
import { Inter } from "next/font/google";
import "../styles/index.css";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, TabsProvider } from "@/contexts";
import { ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`${inter.className} bg-white`}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <AuthProvider>
            <TabsProvider>
              {children}
            </TabsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
