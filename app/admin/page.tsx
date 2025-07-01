import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMovies, getSeries } from "@/lib/database"
import { Film, Tv, Users, Download, TrendingUp, Eye } from "lucide-react"

export default async function AdminDashboard() {
  const movies = await getMovies({ limit: 5 })
  const series = await getSeries({ limit: 5 })

  // Mock stats - in real app, these would come from database queries
  const stats = {
    totalMovies: 150,
    totalSeries: 45,
    totalUsers: 1250,
    totalDownloads: 5680,
    monthlyViews: 125000,
    revenue: 45000,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMovies}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Series</CardTitle>
            <Tv className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSeries}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+25% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movies.slice(0, 5).map((movie: any) => (
                <div key={movie.id} className="flex items-center space-x-4">
                  <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                    <img
                      src={movie.poster_url || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{movie.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {movie.genre} • {movie.release_year}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">⭐ {movie.rating}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Series</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {series.slice(0, 5).map((show: any) => (
                <div key={show.id} className="flex items-center space-x-4">
                  <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                    <img
                      src={show.poster_url || "/placeholder.svg"}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{show.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {show.genre} • {show.total_seasons} Season{show.total_seasons !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">⭐ {show.rating}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
