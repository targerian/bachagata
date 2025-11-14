-- Add video support to gallery_images table
-- Add media_type column with default 'image'
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video'));

-- Add youtube_video_id column for storing YouTube video IDs
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS youtube_video_id TEXT;

-- Add thumbnail_url column for custom video thumbnails
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Create index for media_type for faster filtering
CREATE INDEX IF NOT EXISTS idx_gallery_images_media_type ON gallery_images(media_type);

-- Add constraint: if media_type is 'video', youtube_video_id must not be null
ALTER TABLE gallery_images ADD CONSTRAINT check_video_has_youtube_id 
  CHECK (media_type != 'video' OR youtube_video_id IS NOT NULL);

