"use client"

import { useSelector, useDispatch } from "react-redux"
import { removeFromWishlist } from "@/lib/redux/slices/wishlistSlice"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { RootState, AppDispatch } from "@/lib/redux/store"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.wishlist.items)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Heart size={64} className="mx-auto text-muted mb-4" />
        <h1 className="mb-2 text-3xl font-bold text-foreground">Your Wishlist is Empty</h1>
        <p className="mb-8 text-muted-foreground">Start adding items to your wishlist to save them for later</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleAddToCart = (item: typeof items[0]) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      }),
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-foreground">My Wishlist</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="card-premium group">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-secondary aspect-square rounded-t-xl">
              <Link href={`/product/${item.id}`}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              {/* Remove from Wishlist Button */}
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-3 left-3 p-2.5 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-all duration-300 shadow-lg z-10"
                aria-label="Remove from wishlist"
              >
                <Heart size={18} className="fill-accent text-accent" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 rounded-b-xl">
              <Link href={`/product/${item.id}`}>
                <h3 className="line-clamp-2 text-sm font-semibold text-foreground mb-2.5 group-hover:text-accent transition-colors cursor-pointer">
                  {item.title}
                </h3>
              </Link>

              {/* Price Section */}
              <div className="mb-4">
                <span className="text-lg font-bold text-foreground">Rs. {(item.price * 0.7).toFixed(0)}</span>
                <span className="text-sm line-through text-muted-foreground ml-2">Rs. {item.price.toFixed(0)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="p-2.5 border border-border rounded-lg hover:bg-destructive/10 hover:border-destructive transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={18} className="text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

