"use client"

import type React from "react"

import Link from "next/link"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { toggleWishlist } from "@/lib/redux/slices/wishlistSlice"
import type { RootState } from "@/lib/redux/store"

interface Product {
  id: number
  title: string
  price: number
  image: string
  rating?: { rate: number; count: number }
}

// Deterministic helpers so discount / stock don't change on each render
const getDiscountForProduct = (id: number) => {
  // Stable value between 10% and 30% based on product id
  return 10 + ((id * 7) % 21)
}

const getIsLowStockForProduct = (id: number) => {
  // Roughly 1 in 4 products show "Only Few Left!" but stays fixed per id
  return id % 4 === 0
}

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((item) => item.id === product.id)

  const discount = getDiscountForProduct(product.id)
  const isLowStock = getIsLowStockForProduct(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    )

    onAddToCart?.()
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      toggleWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    )
  }

  return (
    <div className="group h-full flex flex-col">
      <div className="card-premium h-full flex flex-col" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Image Container */}
        <div className="relative overflow-hidden bg-secondary aspect-square rounded-t-xl flex-shrink-0">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 left-3 p-2.5 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-all duration-300 shadow-lg z-10"
          >
            <Heart
              size={18}
              className={`transition-all ${isWishlisted ? "fill-accent text-accent" : "text-gray-400"}`}
            />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? "w-6 bg-accent" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 rounded-b-xl flex-1 flex flex-col">
          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="line-clamp-2 text-sm font-semibold text-foreground mb-2.5 group-hover:text-accent transition-colors cursor-pointer">
              {product.title}
            </h3>
          </Link>

          {/* Rating and Reviews */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-foreground">{product.rating.rate}</span>
              </div>
              <span className="text-xs text-muted-foreground">| {product.rating.count}</span>
            </div>
          )}

          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-lg font-bold text-foreground">Rs. {(product.price * 0.7).toFixed(0)}</span>
              <span className="text-sm line-through text-muted-foreground">Rs. {product.price.toFixed(0)}</span>
            </div>
            <div className="text-xs font-bold text-red-500">({discount}% OFF)</div>
          </div>

          {isLowStock && <div className="text-xs font-semibold text-orange-600 mb-3">Only Few Left!</div>}

          <button
            onClick={handleAddToCart}
            className="w-full mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
