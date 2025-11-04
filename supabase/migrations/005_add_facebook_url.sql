-- Add facebook_url field to contact_info table
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- Update initial data to include placeholder
UPDATE contact_info SET facebook_url = '#' WHERE facebook_url IS NULL;

