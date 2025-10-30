-- =====================================================
-- BACHAGATE - ALL DATABASE MIGRATIONS
-- Run this entire file in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- MIGRATION 1: Gallery Images Table
-- =====================================================

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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON gallery_images;
DROP POLICY IF EXISTS "Allow users to update own images" ON gallery_images;
DROP POLICY IF EXISTS "Allow users to delete own images" ON gallery_images;

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
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_upload_date ON gallery_images(upload_date DESC);

-- =====================================================
-- MIGRATION 2: Classes Table
-- =====================================================

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  place TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  description TEXT,
  price NUMERIC(10, 2), -- optional price
  image_url TEXT, -- optional image
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON classes;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON classes;
DROP POLICY IF EXISTS "Allow users to update own classes" ON classes;
DROP POLICY IF EXISTS "Allow users to delete own classes" ON classes;

-- Allow public to read all classes
CREATE POLICY "Allow public read access" ON classes
  FOR SELECT
  USING (true);

-- Allow authenticated admin users to insert classes
CREATE POLICY "Allow authenticated users to insert" ON classes
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own classes
CREATE POLICY "Allow users to update own classes" ON classes
  FOR UPDATE
  USING (auth.uid() = created_by);

-- Allow users to delete their own classes
CREATE POLICY "Allow users to delete own classes" ON classes
  FOR DELETE
  USING (auth.uid() = created_by);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_classes_date_time ON classes(date_time DESC);
CREATE INDEX IF NOT EXISTS idx_classes_is_recurring ON classes(is_recurring);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_classes_updated_at ON classes;
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MIGRATION 3: Contact Info Table
-- =====================================================

-- Create contact_info table (single row)
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  instagram_url TEXT,
  twitter_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON contact_info;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON contact_info;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON contact_info;

-- Allow public to read contact info
CREATE POLICY "Allow public read access" ON contact_info
  FOR SELECT
  USING (true);

-- Allow authenticated admin users to update contact info
CREATE POLICY "Allow authenticated users to update" ON contact_info
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated admin users to insert initial contact info (only if empty)
CREATE POLICY "Allow authenticated users to insert" ON contact_info
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Insert initial contact info (only if table is empty)
INSERT INTO contact_info (email, phone, address, instagram_url, twitter_url)
SELECT 
  'looci@email.com',
  '+1 (234) 567-890',
  '123 Dance Avenue, New York, NY',
  '#',
  '#'
WHERE NOT EXISTS (SELECT 1 FROM contact_info);

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_contact_info_updated_at ON contact_info;
CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON contact_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONE! All tables and policies created
-- =====================================================

