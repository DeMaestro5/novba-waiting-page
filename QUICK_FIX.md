# Quick Fix Guide - Production Issues

## Issue 1: UI Broken in Production ✅ FIXED

**Problem:** CSS and JS files not loading  
**Solution:** Changed paths to absolute paths (`/styles.css`, `/script.js`)

**Status:** Fixed in code - push to deploy

---

## Issue 2: Emails Not Saving to Database 🔧 NEEDS ACTION

**Problem:** Success message shows but emails don't appear in Supabase  
**Root Cause:** Row Level Security (RLS) is blocking inserts

### Quick Fix (Choose One):

#### Option A: Disable RLS (Fastest - 30 seconds)

1. Go to Supabase Dashboard
2. **Table Editor** → Click `waitlist` table
3. Click **"RLS policies"** button (top right, shows "2" badge)
4. Click **"Disable RLS"** or delete all policies
5. Test again

#### Option B: Create INSERT Policy (Recommended - 1 minute)

1. Go to Supabase Dashboard
2. **Table Editor** → `waitlist` table → **"RLS policies"**
3. Click **"New Policy"**
4. Choose **"For full customization"**
5. Fill in:
   - **Policy name**: `Allow public inserts`
   - **Allowed operation**: `INSERT`
   - **Target roles**: Check `anon` and `authenticated`
   - **USING expression**: Leave empty or `true`
   - **WITH CHECK expression**: `true`
6. Click **"Review"** then **"Save policy"**

#### Option C: Use SQL Editor (Fastest if you know SQL)

1. Go to **SQL Editor** in Supabase
2. Run this SQL:

```sql
-- Allow public inserts
CREATE POLICY "Allow public inserts" ON waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow public reads (for counter)
CREATE POLICY "Allow public reads" ON waitlist
FOR SELECT
TO anon, authenticated
USING (true);
```

3. Click **"Run"**

---

## Verify Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify both are set:
   - `SUPABASE_URL` = `https://kbxzzrrxkrcnxuvnwrht.supabase.co`
   - `SUPABASE_ANON_KEY` = [Your full anon key]
3. Make sure they're applied to **Production**
4. **Redeploy** if you just added them

---

## Test After Fix

1. Go to your live site: `https://novba-waiting-page.vercel.app`
2. Submit an email
3. Check Supabase **Table Editor** → `waitlist` table
4. Email should appear immediately

---

## Why This Happened

- **UI Broken:** Relative paths don't work well on Vercel - needed absolute paths
- **Emails Not Saving:** Supabase has RLS enabled by default, which blocks all operations unless you create policies

---

## Next Steps

1. ✅ Push the code changes (UI fix)
2. 🔧 Fix RLS in Supabase (choose Option A, B, or C above)
3. ✅ Verify environment variables in Vercel
4. ✅ Test on production
5. ✅ Celebrate! 🎉
