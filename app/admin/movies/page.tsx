import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getMovies } from "@/lib/database"
import { Edit, Trash2, Eye, Download } from "lucide-react"
import Link from "next/link"

export default async function MoviesPage() {
  const movies = await getMovies({ limit: 50 })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Movies</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your movie collection</p>
        </div>
        <Link href="/admin/upload">
          <Button>Add New Movie</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Movies ({movies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Movie</th>
                  <th className="text-left p-4">Genre</th>
                  <th className="text-left p-4">Year</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Views</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie: any) => (
                  <tr key={movie.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                          <img
                            src={movie.poster_url || "/placeholder.svg"}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{movie.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {movie.duration} min • {movie.director}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{movie.genre}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{movie.release_year}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-900 dark:text-white">{movie.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={movie.status === "published" ? "default" : "secondary"}>{movie.status}</Badge>
                      {movie.is_featured && (
                        <Badge variant="outline" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{movie.view_count || 0}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
