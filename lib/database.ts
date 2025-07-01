import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database helper functions
export async function getMovies(filters?: {
  status?: string
  featured?: boolean
  genre?: string
  limit?: number
  offset?: number
}) {
  const { status = "published", featured, genre, limit = 20, offset = 0 } = filters || {}

  let query = `
    SELECT m.*, 
           COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') as categories
    FROM movies m
    LEFT JOIN movie_categories mc ON m.id = mc.movie_id
    LEFT JOIN categories c ON mc.category_id = c.id
    WHERE m.status = $1
  `

  const params: any[] = [status]
  let paramIndex = 2

  if (featured !== undefined) {
    query += ` AND m.is_featured = $${paramIndex}`
    params.push(featured)
    paramIndex++
  }

  if (genre) {
    query += ` AND m.genre ILIKE $${paramIndex}`
    params.push(`%${genre}%`)
    paramIndex++
  }

  query += `
    GROUP BY m.id
    ORDER BY m.created_at DESC
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `
  params.push(limit, offset)

  return await sql(query, params)
}

export async function getSeries(filters?: {
  status?: string
  featured?: boolean
  genre?: string
  limit?: number
  offset?: number
}) {
  const { status = "published", featured, genre, limit = 20, offset = 0 } = filters || {}

  let query = `
    SELECT s.*, 
           COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') as categories
    FROM series s
    LEFT JOIN series_categories sc ON s.id = sc.series_id
    LEFT JOIN categories c ON sc.category_id = c.id
    WHERE s.status = $1
  `

  const params: any[] = [status]
  let paramIndex = 2

  if (featured !== undefined) {
    query += ` AND s.is_featured = $${paramIndex}`
    params.push(featured)
    paramIndex++
  }

  if (genre) {
    query += ` AND s.genre ILIKE $${paramIndex}`
    params.push(`%${genre}%`)
    paramIndex++
  }

  query += `
    GROUP BY s.id
    ORDER BY s.created_at DESC
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `
  params.push(limit, offset)

  return await sql(query, params)
}

export async function getMovieById(id: string) {
  const result = await sql`
    SELECT m.*, 
           COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') as categories
    FROM movies m
    LEFT JOIN movie_categories mc ON m.id = mc.movie_id
    LEFT JOIN categories c ON mc.category_id = c.id
    WHERE m.id = ${id}
    GROUP BY m.id
  `
  return result[0] || null
}

export async function getSeriesById(id: string) {
  const result = await sql`
    SELECT s.*, 
           COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') as categories
    FROM series s
    LEFT JOIN series_categories sc ON s.id = sc.series_id
    LEFT JOIN categories c ON sc.category_id = c.id
    WHERE s.id = ${id}
    GROUP BY s.id
  `
  return result[0] || null
}

export async function getEpisodesBySeriesId(seriesId: string) {
  return await sql`
    SELECT * FROM episodes 
    WHERE series_id = ${seriesId}
    ORDER BY season_number, episode_number
  `
}

export async function getCategories() {
  return await sql`
    SELECT * FROM categories 
    ORDER BY name
  `
}

export async function searchContent(query: string, type?: "movie" | "series") {
  if (type === "movie") {
    return await sql`
      SELECT * FROM movies 
      WHERE status = 'published' 
      AND (title ILIKE ${`%${query}%`} OR description ILIKE ${`%${query}%`} OR genre ILIKE ${`%${query}%`})
      ORDER BY rating DESC
      LIMIT 20
    `
  } else if (type === "series") {
    return await sql`
      SELECT * FROM series 
      WHERE status = 'published' 
      AND (title ILIKE ${`%${query}%`} OR description ILIKE ${`%${query}%`} OR genre ILIKE ${`%${query}%`})
      ORDER BY rating DESC
      LIMIT 20
    `
  } else {
    const movies = await sql`
      SELECT *, 'movie' as content_type FROM movies 
      WHERE status = 'published' 
      AND (title ILIKE ${`%${query}%`} OR description ILIKE ${`%${query}%`} OR genre ILIKE ${`%${query}%`})
      ORDER BY rating DESC
      LIMIT 10
    `
    const series = await sql`
      SELECT *, 'series' as content_type FROM series 
      WHERE status = 'published' 
      AND (title ILIKE ${`%${query}%`} OR description ILIKE ${`%${query}%`} OR genre ILIKE ${`%${query}%`})
      ORDER BY rating DESC
      LIMIT 10
    `
    return [...movies, ...series]
  }
}
