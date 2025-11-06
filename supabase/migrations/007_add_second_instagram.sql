-- Add second Instagram URL column to contact_info
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS instagram_url_2 TEXT;

-- Update the initial data if needed (you can set this to a default value or leave it null)
COMMENT ON COLUMN contact_info.instagram_url_2 IS 'Second Instagram account URL';

