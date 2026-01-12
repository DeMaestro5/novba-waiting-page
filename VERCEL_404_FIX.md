# Fix: 404 Error on Vercel

## The Problem

After deployment, you're getting a 404 error. This happens because Vercel can't find your files.

## Solution: Let Vercel Auto-Detect

**I've removed `vercel.json`** - Vercel will now auto-detect:
- ✅ Static files (HTML, CSS, JS) - served automatically
- ✅ API routes in `/api` folder - detected automatically

## Steps to Fix

### Option 1: Remove vercel.json (Recommended)

1. **Delete `vercel.json`** (I already did this)
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Remove vercel.json - let Vercel auto-detect"
   git push
   ```
3. **Vercel will auto-redeploy**
4. **Check your site** - should work now!

### Option 2: If Option 1 Doesn't Work

Create a minimal `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Why This Happened

The `vercel.json` configuration was too complex and was interfering with Vercel's automatic static file serving. Vercel is smart enough to:
- Serve static files automatically
- Detect API routes in `/api` folder
- Handle routing automatically

## Verify Your Project Structure

Make sure your files are in the root:
```
/
├── index.html
├── styles.css
├── script.js
├── api/
│   └── waitlist.js
└── package.json
```

## After Fixing

1. ✅ Push the changes (removed vercel.json)
2. ✅ Wait for Vercel to redeploy
3. ✅ Visit your site
4. ✅ Should see your landing page!

## If Still Getting 404

1. Check Vercel deployment logs
2. Verify all files are committed to Git
3. Make sure `index.html` is in the root directory
4. Check that Vercel is connected to the correct GitHub branch
