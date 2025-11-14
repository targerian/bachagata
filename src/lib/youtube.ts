/**
 * Utility functions for handling YouTube videos
 */

/**
 * Extracts the video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Handle youtu.be short links
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }
    
    // Handle youtube.com URLs
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com" ||
      urlObj.hostname === "m.youtube.com"
    ) {
      // Handle /watch?v=VIDEO_ID
      if (urlObj.pathname === "/watch") {
        return urlObj.searchParams.get("v");
      }
      
      // Handle /embed/VIDEO_ID or /v/VIDEO_ID
      const match = urlObj.pathname.match(/\/(embed|v)\/([^/?]+)/);
      if (match) {
        return match[2];
      }
    }
    
    return null;
  } catch {
    // If URL parsing fails, try regex as fallback
    const regexMatch = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return regexMatch ? regexMatch[1] : null;
  }
}

/**
 * Returns the high-quality thumbnail URL for a YouTube video
 * @param videoId The YouTube video ID
 * @returns The URL for the video thumbnail
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  // Use maxresdefault for highest quality, falls back to hqdefault if not available
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Validates if a string is a valid YouTube URL
 * @param url The URL to validate
 * @returns true if the URL is a valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  const videoId = extractYouTubeVideoId(url);
  return videoId !== null && videoId.length === 11;
}

/**
 * Gets the embed URL for a YouTube video
 * @param videoId The YouTube video ID
 * @returns The embed URL for the video
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

