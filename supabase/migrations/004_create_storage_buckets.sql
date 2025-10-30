-- Create storage buckets for images
-- Note: These commands should be run in the Supabase Storage UI or via the Supabase CLI

-- Create gallery-images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create class-images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('class-images', 'class-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for gallery-images
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow authenticated users to upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update own images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'gallery-images' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to delete own images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'gallery-images' AND auth.uid() = owner);

-- Set up storage policies for class-images
CREATE POLICY "Allow public read access to class images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'class-images');

CREATE POLICY "Allow authenticated users to upload class images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'class-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update own class images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'class-images' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to delete own class images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'class-images' AND auth.uid() = owner);

