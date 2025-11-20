"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchProductById } from "@/lib/api/client"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { AppDispatch } from "@/lib/redux/store"
import { ArrowLeft, Star, Truck, Shield } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating?: { rate: number; count: number }
}

export default function ProductDetail({ productId }: { productId: number }) {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Black")
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId)
        setProduct(data)
      } catch (err) {
        console.error("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }))
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent"></div>
      </div>
    )
  }

  if (!product) {
    return <div className="py-12 text-center text-foreground">Product not found</div>
  }

  const discount = 30

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
      >
        <ArrowLeft size={18} />
        Back to Shopping
      </Link>

      <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-contain p-6"
            />
            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-lg font-semibold text-sm">
              -{discount}%
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{product.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-pretty">{product.title}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating!.rate) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  Rs. {(product.price * 0.7).toFixed(0)}
                </span>
                <span className="text-xl text-muted-foreground line-through">Rs. {product.price.toFixed(0)}</span>
                <span className="text-lg font-bold text-accent">Save {discount}%</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-foreground mb-8 leading-relaxed text-pretty">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-white text-foreground hover:border-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">Color</label>
              <div className="flex gap-3">
                {["Black", "Navy", "Gray", "Beige"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedColor === color ? "border-accent ring-2 ring-accent" : "border-border hover:border-accent"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                className="w-32 border border-border rounded-lg px-4 py-2.5 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    Qty: {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                addedToCart ? "bg-green-500 text-white" : "bg-accent text-white hover:opacity-90"
              }`}
            >
              {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Truck size={18} className="text-accent" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Shield size={18} className="text-accent" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
