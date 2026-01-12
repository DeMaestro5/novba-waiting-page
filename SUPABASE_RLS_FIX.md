# Fix: Emails Not Saving to Database

## The Problem

Your emails show a success message but don't appear in Supabase. This is almost certainly a **Row Level Security (RLS)** issue.

## Quick Fix: Disable RLS or Create Policies

### Option 1: Disable RLS (Easiest for MVP)

1. Go to Supabase Dashboard
2. Navigate to **Table Editor** → **waitlist** table
3. Click on **"RLS policies"** (you'll see it has 2 policies)
4. Click **"Disable RLS"** or remove all policies
5. Test again

### Option 2: Create INSERT Policy (Recommended)

1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **Policies** (or Table Editor → waitlist → RLS policies)
3. Click **"New Policy"**
4. Select **"For full customization"**
5. Configure:
   - **Policy name**: `Allow public inserts`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `anon`, `authenticated`
   - **USING expression**: `true`
   - **WITH CHECK expression**: `true`
6. Save the policy

### Option 3: Use SQL (Fastest)

Go to **SQL Editor** in Supabase and run:

```sql
-- Allow anyone to insert into waitlist
CREATE POLICY "Allow public inserts" ON waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to read waitlist count
CREATE POLICY "Allow public reads" ON waitlist
FOR SELECT
TO anon, authenticated
USING (true);
```

## Verify Your Table Structure

Your table should have:

- `id` (uuid, primary key, default: `gen_random_uuid()`)
- `email` (text, unique, not null)
- `created_at` (timestamptz, default: `now()`)
- `updated_at` (timestamptz, default: `now()`)

If your `id` is `BIGSERIAL` instead of `uuid`, that's fine - the API will work either way.

## Check Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify:
   - `SUPABASE_URL` is set
   - `SUPABASE_ANON_KEY` is set
3. Make sure they're applied to **Production** environment
4. **Redeploy** after adding/updating variables

## Test the API Directly

After fixing RLS, test the API:

```bash
curl -X POST https://your-site.vercel.app/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

You should get a success response, and the email should appear in Supabase.

## Common Issues

**"policy violation" error:**

- RLS is enabled but no INSERT policy exists
- Fix: Create INSERT policy (Option 2 or 3 above)

**"table does not exist" error:**

- Table name mismatch
- Fix: Check table name is exactly `waitlist` (lowercase)

**"permission denied" error:**

- RLS blocking the operation
- Fix: Disable RLS or create policies

**Success message but no data:**

- RLS is silently blocking inserts
- Fix: Check RLS policies in Supabase dashboard
