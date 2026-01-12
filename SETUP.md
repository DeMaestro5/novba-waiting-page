# Novba Waitlist Setup Guide

This guide will help you set up the waitlist functionality for your landing page.

## Prerequisites

- A Supabase account (free tier works perfectly)
- A Vercel account (for deployment)

## Step 1: Set Up Supabase Database

1. **Create a Supabase account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create a new project**
   - Click "New Project"
   - Choose a name (e.g., "novba-waitlist")
   - Set a database password (save this securely)
   - Select a region close to you
   - Click "Create new project"

3. **Create the waitlist table**
   - Once your project is ready, go to the SQL Editor
   - Run this SQL to create the table:

```sql
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
```

4. **Get your Supabase credentials**
   - Go to **Settings** → **API** (in the left sidebar under "Data API")
   - **For SUPABASE_URL:**
     - Look for "Project URL" in the API settings page
     - It looks like: `https://xxxxxxxxxxxxx.supabase.co`
     - Copy this entire URL
   - **For SUPABASE_ANON_KEY:**
     - On the "Publishable and secret API keys" tab
     - Find the "Publishable key" section
     - Copy the key that starts with `sb_publishable_...` or `eyJ...`
     - Click the copy icon next to the key
     - **OR** if you see a "Legacy" tab, use the "anon public" key from there

## Step 2: Configure Vercel Environment Variables

1. **Go to your Vercel project**
   - Navigate to your project dashboard on Vercel
   - Go to Settings → Environment Variables

2. **Add the following environment variables:**
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anon/public key

3. **Apply to all environments** (Production, Preview, Development)

## Step 3: Install Dependencies

If deploying via Git, Vercel will automatically install dependencies. For local testing:

```bash
npm install
```

## Step 4: Deploy to Vercel

1. **Push your code to GitHub** (if not already done)
2. **Connect to Vercel** (if not already connected)
3. **Deploy** - Vercel will automatically deploy on push

## Step 5: Test the Waitlist

1. Visit your deployed site
2. Enter an email address in the form
3. Check your Supabase dashboard → Table Editor → `waitlist` table
4. You should see the email appear in the table

## Viewing Waitlist Subscribers

To view all subscribers:

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Select the `waitlist` table
4. You'll see all emails with timestamps

## Troubleshooting

### API returns 500 error
- Check that environment variables are set correctly in Vercel
- Verify the Supabase table name is exactly `waitlist`
- Check Vercel function logs for detailed error messages

### Emails not saving
- Verify the Supabase table was created correctly
- Check that the `email` column allows unique values
- Ensure your Supabase project is active (not paused)

### Counter not updating
- Check browser console for JavaScript errors
- Verify the API endpoint is accessible: `https://your-domain.vercel.app/api/waitlist`
- Test the GET endpoint directly in your browser

## Next Steps

- Set up email notifications when someone joins (using Supabase triggers or a service like Resend)
- Export waitlist data as CSV from Supabase dashboard
- Add analytics to track conversion rates

## Support

If you encounter issues, check:
- Vercel function logs (in Vercel dashboard)
- Supabase logs (in Supabase dashboard)
- Browser console for frontend errors
