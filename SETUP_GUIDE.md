# Bachagate Admin Setup Guide

This guide will help you set up the Supabase backend and configure your admin access.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Your project already has the required dependencies installed

## Step 1: Set Up Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project or select your existing one
3. Wait for the project to finish setting up

## Step 2: Run Database Migrations

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Run each migration file in the `supabase/migrations/` folder in order:

### Migration 1: Gallery Images Table
- Open `supabase/migrations/001_create_gallery_images.sql`
- Copy the entire content
- Paste into the SQL Editor
- Click **Run**

### Migration 2: Classes Table
- Open `supabase/migrations/002_create_classes.sql`
- Copy the entire content
- Paste into the SQL Editor
- Click **Run**

### Migration 3: Contact Info Table
- Open `supabase/migrations/003_create_contact_info.sql`
- Copy the entire content
- Paste into the SQL Editor
- Click **Run**

### Migration 4: Storage Buckets
- Open `supabase/migrations/004_create_storage_buckets.sql`
- Copy the entire content
- Paste into the SQL Editor
- Click **Run**

**Note:** If migration 4 doesn't work via SQL, create the buckets manually:
1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Create two public buckets:
   - Name: `gallery-images`, Public: Yes
   - Name: `class-images`, Public: Yes

## Step 3: Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL**
   - **anon public** key

3. Create a `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Replace the placeholders with your actual values from step 2

## Step 4: Create Your Admin Account

You've already registered with your email `moh.ali.1593@gmail.com` in Supabase.

To set a password or reset it:
1. Go to **Authentication** > **Users** in your Supabase dashboard
2. Find your email
3. Click the three dots menu and select **Send password recovery**
4. Check your email and set a password

## Step 5: Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Step 6: Log In as Admin

1. Go to `/admin/login`
2. Enter your email: `moh.ali.1593@gmail.com`
3. Enter your password
4. Click **Sign In**

## Step 7: Test Admin Features

After logging in, you should see:

### Gallery Page (`/gallery`)
- A floating "Edit Mode" button in the bottom right
- Click it to enable edit mode
- When in edit mode:
  - **Add Image** button appears
  - Each image shows edit/delete buttons on hover
  - You can upload images with crop functionality
  - Edit titles, descriptions, and categories
  - Delete images

### Classes Page (`/classes`)
- Same "Edit Mode" button
- When in edit mode:
  - **Add Class** button appears
  - Each class shows edit/delete buttons
  - You can create new classes with all details
  - Upload optional class images
  - Mark classes as recurring
  - Edit or delete existing classes

### Contact Page (`/contact`)
- Same "Edit Mode" button
- When in edit mode:
  - **Edit Contact Info** button appears
  - You can update email, phone, address, and social media links

## Adding Looci as an Admin

When you're ready to add Looci:

1. Get her email address
2. In Supabase dashboard, go to **Authentication** > **Users**
3. Click **Invite user**
4. Enter her email
5. She'll receive an email to set her password
6. She can then log in at `/admin/login` with her credentials

## Features

### Image Upload with Cropping
- Select an image from your device
- Crop it to desired size
- Image is optimized and uploaded to Supabase Storage
- Image URL is stored in the database

### Recurring Classes
- When creating/editing a class, check "This class repeats weekly"
- Useful for regular weekly classes you don't want to recreate

### Row Level Security (RLS)
- All data is publicly readable (for website visitors)
- Only authenticated admin users (you and Looci) can create, update, or delete content
- This ensures your content is protected

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure you copied the correct values
- Restart your development server after changing `.env.local`

### Can't log in
- Verify your email is registered in Supabase Authentication
- Reset your password through Supabase dashboard
- Check browser console for error messages

### Images not uploading
- Verify storage buckets are created and public
- Check browser console for upload errors
- Verify RLS policies are set correctly on storage buckets

### Database errors
- Ensure all migrations ran successfully
- Check Supabase logs in dashboard under **Logs** > **Postgres Logs**

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Check Supabase dashboard logs
3. Verify all environment variables are set correctly
4. Ensure all database migrations completed successfully

## Next Steps

- Upload some gallery images to test the system
- Create your first class
- Update contact information with real details
- Add Looci as an admin user once you have her email

