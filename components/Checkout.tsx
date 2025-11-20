"use client"

import type React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "@/lib/redux/slices/cartSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"
import Link from "next/link"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  address: string
  phone: string
}

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, total } = useSelector((state: RootState) => state.cart)
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", address: "", phone: "" })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setOrderPlaced(true)
      dispatch(clearCart())
    }
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold text-foreground">Your Cart is Empty</h1>
        <p className="mb-8 text-muted-foreground">Add items to proceed with checkout</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent text-white px-8 py-3 font-semibold hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="bg-white rounded-lg border border-border p-12 mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle2 size={64} className="text-green-500" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mb-6 text-muted-foreground text-lg">Thank you for your purchase</p>

          <div className="bg-secondary rounded-lg p-6 mb-8 text-left">
            <p className="text-sm text-muted-foreground mb-1">Order Confirmation Email</p>
            <p className="font-semibold text-foreground">{formData.email}</p>
          </div>

          <div className="text-left mb-8">
            <p className="text-sm font-semibold text-foreground mb-3">Order Summary</p>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-foreground">
                  <span className="line-clamp-2">{item.title}</span>
                  <span className="font-semibold">Rs. {(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="inline-block rounded-lg bg-accent text-white px-8 py-3 font-semibold hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border p-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Shipping Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={16} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={16} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={16} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Shipping Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Street address, city, state, zip"
                  rows={4}
                />
                {errors.address && (
                  <p className="mt-1.5 text-sm text-destructive flex items-center gap-1">
                    <AlertCircle size={16} /> {errors.address}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-accent text-white px-8 py-4 font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-border p-8 sticky top-24">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1">{item.title.substring(0, 25)}...</span>
                  <span className="font-semibold text-foreground whitespace-nowrap ml-2">
                    Rs. {(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>Rs. {total.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (Est.)</span>
                <span>Rs. {(total * 0.1).toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-accent font-semibold">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-foreground">
              <span>Total</span>
              <span>Rs. {(total * 1.1).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
