"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { removeFromCart, updateQuantity } from "@/lib/redux/slices/cartSlice"
import { X, Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state: RootState) => state.cart)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <button onClick={onClose} className="text-accent font-medium hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                {/* Image */}
                <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">{item.title}</h3>
                  <p className="text-sm font-bold text-accent mb-3">Rs. {(item.price * item.quantity).toFixed(0)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-secondary rounded-lg w-fit">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          }),
                        )
                      }
                      className="p-1 hover:bg-white rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.min(10, item.quantity + 1),
                          }),
                        )
                      }
                      className="p-1 hover:bg-white rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground font-semibold">Subtotal</span>
              <span className="text-lg font-bold text-foreground">Rs. {total.toFixed(0)}</span>
            </div>
            <Link href="/checkout" className="w-full">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Proceed to Checkout
              </button>
            </Link>
            <button
              onClick={onClose}
              className="w-full border-2 border-accent text-accent font-semibold py-3 rounded-lg hover:bg-accent/5 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
