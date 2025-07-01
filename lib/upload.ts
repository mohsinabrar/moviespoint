import { put, del } from "@vercel/blob"

export async function uploadFile(file: File, folder = "uploads") {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    })

    return {
      success: true,
      url: blob.url,
      filename: blob.pathname,
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: "Failed to upload file",
    }
  }
}

export async function deleteFile(url: string) {
  try {
    await del(url)
    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { success: false, error: "Failed to delete file" }
  }
}

export function getFileType(filename: string): "video" | "image" | "other" {
  const ext = filename.toLowerCase().split(".").pop()

  if (["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm"].includes(ext || "")) {
    return "video"
  }

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) {
    return "image"
  }

  return "other"
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
