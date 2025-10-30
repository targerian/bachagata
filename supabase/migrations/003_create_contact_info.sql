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

-- Insert initial contact info
INSERT INTO contact_info (email, phone, address, instagram_url, twitter_url)
VALUES (
  'looci@email.com',
  '+1 (234) 567-890',
  '123 Dance Avenue, New York, NY',
  '#',
  '#'
)
ON CONFLICT DO NOTHING;

-- Function to update updated_at timestamp
CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON contact_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

