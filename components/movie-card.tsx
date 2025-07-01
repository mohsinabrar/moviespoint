"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Download, Star, Heart, Share, MoreHorizontal } from "lucide-react"

interface MovieCardProps {
  id: string
  title: string
  poster: string
  rating: number
  year: number
  genre: string
  duration?: string
  isLiked?: boolean
  onPlay?: () => void
  onDownload?: () => void
  onLike?: () => void
}

export function MovieCard({
  id,
  title,
  poster,
  rating,
  year,
  genre,
  duration,
  isLiked = false,
  onPlay,
  onDownload,
  onLike,
}: MovieCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike?.()
  }

  return (
    <div
      className="group relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={poster || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-yellow-500/90 text-black font-semibold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {rating}
          </Badge>
        </div>

        {/* Action Buttons - Instagram Style */}
        <div
          className={`absolute top-3 right-3 flex flex-col space-y-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white border-none"
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white border-none"
          >
            <Share className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white border-none"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm"
            onClick={onPlay}
          >
            <Play className="w-6 h-6 mr-2 fill-current" />
            Play
          </Button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <span>{year}</span>
          <span>{genre}</span>
          {duration && <span>{duration}</span>}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={onPlay}>
            <Play className="w-4 h-4 mr-1 fill-current" />
            Watch
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={onDownload}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
