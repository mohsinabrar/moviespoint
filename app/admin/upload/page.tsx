"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Film, Tv, ImageIcon, Video, X } from "lucide-react"
import { uploadFile, formatFileSize } from "@/lib/upload"

interface UploadedFile {
  file: File
  url?: string
  type: "video" | "image" | "other"
  uploading: boolean
}

export default function UploadPage() {
  const [contentType, setContentType] = useState<"movie" | "series">("movie")
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    director: "",
    creator: "",
    cast: "",
    releaseYear: new Date().getFullYear(),
    duration: "",
    language: "English",
    country: "",
    quality: "HD",
    isFeatured: false,
    totalSeasons: 1,
  })

  const handleFileUpload = async (uploadedFiles: FileList) => {
    const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file) => ({
      file,
      type: file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : "other",
      uploading: true,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Upload files
    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = files.length + i
      const result = await uploadFile(newFiles[i].file, contentType === "movie" ? "movies" : "series")

      setFiles((prev) =>
        prev.map((f, index) => (index === fileIndex ? { ...f, url: result.url, uploading: false } : f)),
      )
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const videoFile = files.find((f) => f.type === "video")
    const posterFile = files.find((f) => f.type === "image" && f.file.name.includes("poster"))
    const backdropFile = files.find((f) => f.type === "image" && f.file.name.includes("backdrop"))

    const payload = {
      ...formData,
      contentType,
      videoUrl: videoFile?.url,
      posterUrl: posterFile?.url,
      backdropUrl: backdropFile?.url,
      cast: formData.cast
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      fileSize: videoFile?.file.size || 0,
    }

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        alert("Content uploaded successfully!")
        // Reset form
        setFiles([])
        setFormData({
          title: "",
          description: "",
          genre: "",
          director: "",
          creator: "",
          cast: "",
          releaseYear: new Date().getFullYear(),
          duration: "",
          language: "English",
          country: "",
          quality: "HD",
          isFeatured: false,
          totalSeasons: 1,
        })
      } else {
        alert("Failed to upload content")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload content")
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Content</h1>
        <p className="text-gray-600 dark:text-gray-400">Add new movies and series to your platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Content Type */}
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select value={contentType} onValueChange={(value: "movie" | "series") => setContentType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movie">
                        <div className="flex items-center space-x-2">
                          <Film className="w-4 h-4" />
                          <span>Movie</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="series">
                        <div className="flex items-center space-x-2">
                          <Tv className="w-4 h-4" />
                          <span>Series</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      value={formData.genre}
                      onChange={(e) => setFormData((prev) => ({ ...prev, genre: e.target.value }))}
                      placeholder="Action, Drama, Sci-Fi"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Director/Creator and Cast */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={contentType === "movie" ? "director" : "creator"}>
                      {contentType === "movie" ? "Director" : "Creator"}
                    </Label>
                    <Input
                      id={contentType === "movie" ? "director" : "creator"}
                      value={contentType === "movie" ? formData.director : formData.creator}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [contentType === "movie" ? "director" : "creator"]: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cast">Cast (comma separated)</Label>
                    <Input
                      id="cast"
                      value={formData.cast}
                      onChange={(e) => setFormData((prev) => ({ ...prev, cast: e.target.value }))}
                      placeholder="Actor 1, Actor 2, Actor 3"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="releaseYear">Release Year</Label>
                    <Input
                      id="releaseYear"
                      type="number"
                      value={formData.releaseYear}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, releaseYear: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                  {contentType === "movie" && (
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  )}
                  {contentType === "series" && (
                    <div className="space-y-2">
                      <Label htmlFor="totalSeasons">Total Seasons</Label>
                      <Input
                        id="totalSeasons"
                        type="number"
                        value={formData.totalSeasons}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, totalSeasons: Number.parseInt(e.target.value) }))
                        }
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality</Label>
                    <Select
                      value={formData.quality}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, quality: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="HD">HD</SelectItem>
                        <SelectItem value="4K">4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFeatured: checked as boolean }))}
                  />
                  <Label htmlFor="featured">Mark as Featured</Label>
                </div>

                <Button type="submit" className="w-full" disabled={files.some((f) => f.uploading)}>
                  {files.some((f) => f.uploading) ? "Uploading..." : "Upload Content"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* File Upload */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Video files, images (poster, backdrop)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="video/*,image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        {file.type === "video" ? (
                          <Video className="w-4 h-4 text-blue-500" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-green-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium truncate max-w-32">{file.file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.uploading ? (
                          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Button size="sm" variant="ghost" onClick={() => removeFile(index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
