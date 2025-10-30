-- =====================================================
-- FIX RLS POLICIES FOR INSERT
-- Run this in Supabase SQL Editor if you get 403 errors
-- =====================================================

-- Fix classes table policies
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON classes;
CREATE POLICY "Allow authenticated users to insert" ON classes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Fix gallery_images table policies  
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON gallery_images;
CREATE POLICY "Allow authenticated users to insert" ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Fix contact_info table policies
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON contact_info;
CREATE POLICY "Allow authenticated users to insert" ON contact_info
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Update policies also need to allow authenticated users
DROP POLICY IF EXISTS "Allow users to update own classes" ON classes;
CREATE POLICY "Allow users to update own classes" ON classes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow users to delete own classes" ON classes;
CREATE POLICY "Allow users to delete own classes" ON classes
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow users to update own images" ON gallery_images;
CREATE POLICY "Allow users to update own images" ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow users to delete own images" ON gallery_images;
CREATE POLICY "Allow users to delete own images" ON gallery_images
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Allow authenticated users to update" ON contact_info;
CREATE POLICY "Allow authenticated users to update" ON contact_info
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Done! Now any authenticated user can insert/update/delete

