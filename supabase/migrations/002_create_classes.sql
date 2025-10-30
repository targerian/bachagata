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
CREATE INDEX idx_classes_date_time ON classes(date_time DESC);
CREATE INDEX idx_classes_is_recurring ON classes(is_recurring);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

