"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setProducts,
  setCategories,
  setLoading,
  setError,
  setSearchTerm,
  setSelectedCategory,
} from "@/lib/redux/slices/productsSlice"
import { fetchProducts, fetchCategories } from "@/lib/api/client"
import type { RootState, AppDispatch } from "@/lib/redux/store"
import ProductCard from "./ProductCard"
import HeroBanner from "./HeroBanner"
import CartSidebar from "./CartSidebar"

export default function ProductListing() {
  const dispatch = useDispatch<AppDispatch>()
  const { filteredItems, categories, loading, error, searchTerm, selectedCategory } = useSelector(
    (state: RootState) => state.products,
  )
  const [sortBy, setSortBy] = useState("featured")
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch(setLoading(true))
        const [productsData, categoriesData] = await Promise.all([fetchProducts(), fetchCategories()])
        dispatch(setProducts(productsData))
        dispatch(setCategories(categoriesData))
      } catch (err) {
        dispatch(setError("Failed to load products. Please try again later."))
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadData()
  }, [dispatch])

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroBanner />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Main Content */}
      <div id="products" className="mx-auto max-w-7xl px-4 py-12">
        {/* Filters Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="input-premium w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <select
                value={selectedCategory}
                onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                className="input-premium"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-premium">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">{sortedItems.length}</span> products
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-destructive text-sm font-medium">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent" />
              <p className="text-muted-foreground font-medium">Loading premium collection...</p>
            </div>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedItems.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => setIsCartOpen(true)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
