"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const backgroundImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=600&fit=crop&q=80",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-accent-teal">
      {/* Background Slider */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-pretty leading-tight">
              Discover Premium Fashion
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 font-light">
              Explore our curated collection of fashion-forward styles from top brands. Elevate your wardrobe.
            </p>

            <div className="flex gap-4 flex-col sm:flex-row">
              <Link href="/#products">
                <button className="button-primary w-full sm:w-auto flex items-center justify-center gap-2">
                  Shop Now
                  <ChevronRight size={20} />
                </button>
              </Link>
              <button className="button-secondary w-full sm:w-auto">Explore Collection</button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
