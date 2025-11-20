"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { ShoppingCart, Search, Heart, Menu, X, User } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items.length)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items.length)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div
              className="text-4xl font-extrabold tracking-tight flex items-baseline"
              style={{
                color: "#E50010",
                fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
                letterSpacing: "-0.03em",
                lineHeight: "1",
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
                  fontWeight: 900,
                  transform: "scaleX(1.15)",
                  display: "inline-block",
                  transformOrigin: "left center",
                }}
              >
                H
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "0.95em",
                  marginLeft: "0.05em",
                  marginRight: "0.05em",
                }}
              >
                &
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', 'Helvetica Neue', sans-serif",
                  fontWeight: 900,
                }}
              >
                M
              </span>
            </div>
            <div className="text-xs text-gray-600 font-normal mt-0.5">fashion store</div>
          </Link>

          {/* Right Actions - Icons */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:flex p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-foreground" strokeWidth={1.5} />
            </button>

            <button
              className="hidden md:flex p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Account"
            >
              <User size={20} className="text-foreground" strokeWidth={1.5} />
            </button>

            <Link
              href="/wishlist"
              className="relative hidden md:flex p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-foreground" strokeWidth={1.5} />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} className="text-foreground" strokeWidth={1.5} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-3">
              <Link href="/wishlist" className="text-sm font-medium py-2 text-gray-500 flex items-center gap-2">
                Wishlist
                {wishlistItems > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlistItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
