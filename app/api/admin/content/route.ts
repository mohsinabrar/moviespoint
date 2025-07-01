import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      title,
      description,
      genre,
      director,
      creator,
      cast,
      releaseYear,
      duration,
      language,
      country,
      quality,
      isFeatured,
      totalSeasons,
      contentType,
      videoUrl,
      posterUrl,
      backdropUrl,
      fileSize,
    } = data

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    if (contentType === "movie") {
      const result = await sql`
        INSERT INTO movies (
          title, slug, description, poster_url, backdrop_url, video_url,
          duration, release_year, genre, director, cast, language, country,
          quality, file_size, is_featured, status
        ) VALUES (
          ${title}, ${slug}, ${description}, ${posterUrl}, ${backdropUrl}, ${videoUrl},
          ${duration ? Number.parseInt(duration) : null}, ${releaseYear}, ${genre}, ${director}, 
          ${cast}, ${language}, ${country}, ${quality}, ${fileSize}, ${isFeatured}, 'published'
        ) RETURNING id
      `

      return NextResponse.json({ success: true, id: result[0].id, type: "movie" })
    } else {
      const result = await sql`
        INSERT INTO series (
          title, slug, description, poster_url, backdrop_url, trailer_url,
          release_year, genre, creator, cast, language, country,
          is_featured, total_seasons, status
        ) VALUES (
          ${title}, ${slug}, ${description}, ${posterUrl}, ${backdropUrl}, ${videoUrl},
          ${releaseYear}, ${genre}, ${creator}, ${cast}, ${language}, ${country},
          ${isFeatured}, ${totalSeasons}, 'published'
        ) RETURNING id
      `

      return NextResponse.json({ success: true, id: result[0].id, type: "series" })
    }
  } catch (error) {
    console.error("Content upload error:", error)
    return NextResponse.json({ success: false, error: "Failed to upload content" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    if (type === "movies") {
      const movies = await sql`
        SELECT * FROM movies 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      return NextResponse.json({ success: true, data: movies })
    } else if (type === "series") {
      const series = await sql`
        SELECT * FROM series 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      return NextResponse.json({ success: true, data: series })
    } else {
      return NextResponse.json({ success: false, error: "Invalid content type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Content fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 })
  }
}
