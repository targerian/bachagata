# Supabase Database Setup

This directory contains SQL migrations for setting up the Bachagate database in Supabase.

## Setup Instructions

1. **Log in to your Supabase Dashboard** at https://supabase.com/dashboard

2. **Navigate to the SQL Editor**:
   - Click on your project
   - Go to "SQL Editor" in the left sidebar

3. **Run the migrations in order**:
   - Copy the contents of each migration file
   - Paste into the SQL Editor
   - Click "Run" to execute
   
   Run them in this order:
   1. `001_create_gallery_images.sql`
   2. `002_create_classes.sql`
   3. `003_create_contact_info.sql`
   4. `004_create_storage_buckets.sql`

4. **Create Storage Buckets** (if migration 004 doesn't work via SQL):
   - Go to "Storage" in the left sidebar
   - Create two public buckets:
     - `gallery-images`
     - `class-images`
   - Make both buckets public

5. **Get your environment variables**:
   - Go to "Settings" > "API" in your Supabase dashboard
   - Copy your project URL and anon/public key
   - Add them to `.env.local` in the project root:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

## Tables Created

- **gallery_images**: Stores gallery photos with category, title, description
- **classes**: Stores class information with date, time, recurring flag
- **contact_info**: Stores contact information (single row)

## Storage Buckets

- **gallery-images**: Public bucket for gallery photos
- **class-images**: Public bucket for class photos

## Row Level Security (RLS)

All tables have RLS enabled:
- Public can read all data
- Only authenticated admin users (you and Looci) can insert/update/delete

