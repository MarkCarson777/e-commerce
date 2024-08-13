"use client";

import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ProductContextProvider } from "@/context/ProductContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <ProductContextProvider>
          <body>{children}</body>
        </ProductContextProvider>
      </AuthContextProvider>
    </html>
  );
}
