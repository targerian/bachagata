-- =====================================================
-- FIX STORAGE BUCKET POLICIES
-- Run this in Supabase SQL Editor to allow image uploads
-- =====================================================

-- Drop all existing storage policies first
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to class images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload class images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update own class images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete own class images" ON storage.objects;

-- =====================================================
-- GALLERY-IMAGES BUCKET POLICIES
-- =====================================================

-- Allow anyone to view images in gallery-images bucket
CREATE POLICY "Public read access for gallery images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery-images');

-- Allow authenticated users to upload to gallery-images bucket
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

-- Allow authenticated users to update files in gallery-images bucket
CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-images');

-- Allow authenticated users to delete files in gallery-images bucket
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');

-- =====================================================
-- CLASS-IMAGES BUCKET POLICIES
-- =====================================================

-- Allow anyone to view images in class-images bucket
CREATE POLICY "Public read access for class images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'class-images');

-- Allow authenticated users to upload to class-images bucket
CREATE POLICY "Authenticated users can upload class images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'class-images');

-- Allow authenticated users to update files in class-images bucket
CREATE POLICY "Authenticated users can update class images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'class-images');

-- Allow authenticated users to delete files in class-images bucket
CREATE POLICY "Authenticated users can delete class images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'class-images');

-- =====================================================
-- DONE! Storage policies are now configured
-- =====================================================



