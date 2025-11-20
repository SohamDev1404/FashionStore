import type React from "react"
import type { Metadata } from "next"
import { Providers } from "./providers"
import Header from "@/components/Header"
import "./globals.css"

export const metadata: Metadata = {
  title: "ShopHub - Your Online Store",
  description: "Discover amazing products at ShopHub",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
