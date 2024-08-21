"use client";

import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ProductContextProvider } from "@/context/ProductContext";
import { UserContextProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <UserContextProvider>
            <ProductContextProvider>{children}</ProductContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
