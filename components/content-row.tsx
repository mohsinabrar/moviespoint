"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "./movie-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string
  duration?: string
}

interface ContentRowProps {
  title: string
  movies: Movie[]
}

export function ContentRow({ title, movies }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-72">
            <MovieCard
              {...movie}
              onPlay={() => console.log(`Playing ${movie.title}`)}
              onDownload={() => console.log(`Downloading ${movie.title}`)}
              onLike={() => console.log(`Liked ${movie.title}`)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
