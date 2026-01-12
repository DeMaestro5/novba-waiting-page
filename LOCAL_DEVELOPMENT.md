# Local Development Setup

## The Problem

If you're seeing `405 Method Not Allowed` errors, it's because:
- **Live Server** (port 5500) can't run Vercel serverless functions
- The API endpoints need a proper server to work
- You need to use `vercel dev` instead

## Solution: Use Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

Or if you prefer not to install globally:

```bash
npx vercel dev
```

### Step 2: Make sure you have a `.env` file

Create `.env` in your project root:

```env
SUPABASE_URL=https://kbxzzrrxkrcnxuvnwrht.supabase.co
SUPABASE_ANON_KEY=your-full-anon-key-here
```

### Step 3: Run the development server

```bash
npm run dev
```

This will:
- Start a local server (usually on port 3000)
- Load your `.env` file automatically
- Run your API endpoints properly
- Simulate the Vercel environment

### Step 4: Test your forms

- Open `http://localhost:3000` (or whatever port Vercel shows)
- Try submitting an email
- Check the console - no more 405 errors!

## Alternative: Quick Test Without Local Server

If you just want to test the frontend without the API:

1. Deploy to Vercel first (even without env vars)
2. Add environment variables in Vercel dashboard
3. Test on the live URL

## Troubleshooting

**"vercel: command not found"**
- Install Vercel CLI: `npm install -g vercel`
- Or use: `npx vercel dev`

**"Port already in use"**
- Vercel will ask to use a different port
- Or kill the process using that port

**Still getting 405 errors**
- Make sure you're using `vercel dev`, not Live Server
- Check that your `.env` file exists
- Restart the dev server after creating `.env`

## Quick Commands

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Start development server
npm run dev

# Or without global install
npx vercel dev
```

## What Port Does It Use?

- Vercel dev usually uses port **3000**
- It will show you the URL when it starts
- Look for: `Ready! Available at http://localhost:3000`
