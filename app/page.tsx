import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ContentRow } from "@/components/content-row"

const trendingMovies = [
  {
    id: "1",
    title: "Quantum Realm",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.9,
    year: 2024,
    genre: "Sci-Fi",
    duration: "2h 15m",
  },
  {
    id: "2",
    title: "Shadow Hunter",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.7,
    year: 2024,
    genre: "Action",
    duration: "1h 58m",
  },
  {
    id: "3",
    title: "Digital Dreams",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.5,
    year: 2024,
    genre: "Drama",
    duration: "2h 5m",
  },
  {
    id: "4",
    title: "Neon Nights",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.3,
    year: 2024,
    genre: "Thriller",
    duration: "1h 45m",
  },
  {
    id: "5",
    title: "Cosmic Journey",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 9.1,
    year: 2024,
    genre: "Adventure",
    duration: "2h 30m",
  },
]

const newReleases = [
  {
    id: "6",
    title: "Urban Legend",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 7.8,
    year: 2024,
    genre: "Horror",
    duration: "1h 35m",
  },
  {
    id: "7",
    title: "Time Paradox",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.2,
    year: 2024,
    genre: "Sci-Fi",
    duration: "2h 10m",
  },
  {
    id: "8",
    title: "Love in Tokyo",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 7.9,
    year: 2024,
    genre: "Romance",
    duration: "1h 52m",
  },
  {
    id: "9",
    title: "Desert Storm",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.4,
    year: 2024,
    genre: "War",
    duration: "2h 20m",
  },
  {
    id: "10",
    title: "Magic Kingdom",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.6,
    year: 2024,
    genre: "Fantasy",
    duration: "2h 45m",
  },
]

const actionMovies = [
  {
    id: "11",
    title: "Speed Demon",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.1,
    year: 2024,
    genre: "Action",
    duration: "1h 48m",
  },
  {
    id: "12",
    title: "Iron Fist",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 7.9,
    year: 2024,
    genre: "Action",
    duration: "2h 5m",
  },
  {
    id: "13",
    title: "Night Rider",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.3,
    year: 2024,
    genre: "Action",
    duration: "1h 55m",
  },
  {
    id: "14",
    title: "Storm Breaker",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 8.0,
    year: 2024,
    genre: "Action",
    duration: "2h 12m",
  },
  {
    id: "15",
    title: "Fire Storm",
    poster: "/placeholder.svg?height=450&width=300",
    rating: 7.8,
    year: 2024,
    genre: "Action",
    duration: "1h 42m",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContentRow title="Trending Now" movies={trendingMovies} />
        <ContentRow title="New Releases" movies={newReleases} />
        <ContentRow title="Action Movies" movies={actionMovies} />
      </div>
    </div>
  )
}
