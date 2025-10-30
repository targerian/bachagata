-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('Performances', 'Workshops', 'Socials')),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  upload_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public to read all images
CREATE POLICY "Allow public read access" ON gallery_images
  FOR SELECT
  USING (true);

-- Allow authenticated admin users to insert images
CREATE POLICY "Allow authenticated users to insert" ON gallery_images
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own images
CREATE POLICY "Allow users to update own images" ON gallery_images
  FOR UPDATE
  USING (auth.uid() = created_by);

-- Allow users to delete their own images
CREATE POLICY "Allow users to delete own images" ON gallery_images
  FOR DELETE
  USING (auth.uid() = created_by);

-- Create index for faster queries
CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_gallery_images_upload_date ON gallery_images(upload_date DESC);

