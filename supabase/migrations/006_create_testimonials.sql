-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public to insert testimonials (for user submissions)
CREATE POLICY "Allow public to insert testimonials" ON testimonials
  FOR INSERT
  WITH CHECK (true);

-- Allow public to read only approved testimonials
CREATE POLICY "Allow public to read approved testimonials" ON testimonials
  FOR SELECT
  USING (is_approved = true);

-- Allow authenticated admin users to update testimonials
CREATE POLICY "Allow authenticated users to update testimonials" ON testimonials
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated admin users to delete testimonials
CREATE POLICY "Allow authenticated users to delete testimonials" ON testimonials
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create index for faster queries on approved testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
