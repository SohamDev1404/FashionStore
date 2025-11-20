"use client"

import { useSelector, useDispatch } from "react-redux"
import { updateQuantity, removeFromCart } from "@/lib/redux/slices/cartSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"
import { Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function ShoppingCart() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, total } = useSelector((state: RootState) => state.cart)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-muted mb-4" />
        <h1 className="mb-2 text-3xl font-bold text-foreground">Your Cart is Empty</h1>
        <p className="mb-8 text-muted-foreground">Start shopping to add items to your cart</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex gap-4 p-6 ${index !== items.length - 1 ? "border-b border-border" : ""}`}
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-28 w-28 object-cover rounded-lg bg-secondary"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Rs. {item.price.toFixed(0)} each</p>

                  <div className="flex items-center gap-3">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(updateQuantity({ id: item.id, quantity: Number.parseInt(e.target.value) }))
                      }
                      className="border border-border rounded-lg px-2.5 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="ml-auto p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-foreground text-lg">Rs. {(item.price * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>Rs. {total.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="text-accent font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (Est.)</span>
                <span>Rs. {(total * 0.1).toFixed(0)}</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>Rs. {(total * 1.1).toFixed(0)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-accent text-white rounded-lg px-6 py-3 font-semibold text-center hover:opacity-90 transition-opacity mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="block w-full border border-border rounded-lg px-6 py-3 font-semibold text-center text-foreground hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
