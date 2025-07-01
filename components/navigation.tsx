"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Bell, Menu, X, Home, Film, Tv, Star, Download } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StreamFlix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-1 text-white hover:text-purple-400 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/movies"
              className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Film className="w-4 h-4" />
              <span>Movies</span>
            </Link>
            <Link
              href="/series"
              className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Tv className="w-4 h-4" />
              <span>Series</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Favorites</span>
            </Link>
            <Link
              href="/downloads"
              className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </Link>
          </div>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search movies, series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-gray-800 rounded-md">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/movies"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              >
                <Film className="w-4 h-4" />
                <span>Movies</span>
              </Link>
              <Link
                href="/series"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              >
                <Tv className="w-4 h-4" />
                <span>Series</span>
              </Link>
              <Link
                href="/favorites"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              >
                <Star className="w-4 h-4" />
                <span>Favorites</span>
              </Link>
              <Link
                href="/downloads"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
              >
                <Download className="w-4 h-4" />
                <span>Downloads</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
