"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Info, Volume2, VolumeX } from "lucide-react"

const featuredMovies = [
  {
    id: "1",
    title: "Cyberpunk Chronicles",
    description:
      "In a dystopian future where technology and humanity collide, a group of rebels fights against corporate control in this thrilling sci-fi adventure.",
    backdrop: "/placeholder.svg?height=600&width=1200",
    genre: "Sci-Fi Action",
    rating: "8.9",
    year: "2024",
  },
  {
    id: "2",
    title: "Ocean's Mystery",
    description:
      "Deep beneath the waves lies a secret that could change everything. Join marine biologist Dr. Sarah Chen as she uncovers the truth.",
    backdrop: "/placeholder.svg?height=600&width=1200",
    genre: "Mystery Thriller",
    rating: "8.7",
    year: "2024",
  },
  {
    id: "3",
    title: "The Last Kingdom",
    description:
      "An epic tale of honor, betrayal, and redemption set in a medieval world where magic still exists and heroes are forged in battle.",
    backdrop: "/placeholder.svg?height=600&width=1200",
    genre: "Fantasy Drama",
    rating: "9.1",
    year: "2024",
  },
]

export function HeroSection() {
  const [currentMovie, setCurrentMovie] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % featuredMovies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const movie = featuredMovies[currentMovie]

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdrop || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Movie Info */}
            <div className="mb-4 flex items-center space-x-4">
              <Badge className="bg-red-600 text-white font-semibold">Featured</Badge>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.genre}</span>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">★</span>
                <span className="text-white font-semibold">{movie.rating}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">{movie.title}</h1>

            {/* Description */}
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">{movie.description}</p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold px-8">
                <Play className="w-6 h-6 mr-2 fill-current" />
                Play Now
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white/10 px-8">
                <Plus className="w-6 h-6 mr-2" />
                My List
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white/10 px-8">
                <Info className="w-6 h-6 mr-2" />
                More Info
              </Button>
            </div>

            {/* Movie Indicators */}
            <div className="flex items-center space-x-2">
              {featuredMovies.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentMovie ? "bg-white w-8" : "bg-gray-500"
                  }`}
                  onClick={() => setCurrentMovie(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="absolute bottom-8 right-8">
          <Button
            size="icon"
            variant="outline"
            className="border-gray-400 text-white hover:bg-white/10"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
