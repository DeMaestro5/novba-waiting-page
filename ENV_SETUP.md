# Environment Variables Setup Guide

## Quick Answer

**For Vercel (Production):**
- ✅ Add variables in Vercel dashboard (Settings → Environment Variables)
- ❌ No `.env` file needed
- ❌ No `dotenv` package needed
- Vercel automatically injects environment variables

**For Local Development:**
- ✅ Create `.env` file in project root
- ✅ Install `dotenv` package (already added to devDependencies)
- ✅ The API will automatically load it

---

## Setup Steps

### 1. Create `.env` File (Local Development Only)

Create a file named `.env` in your project root with:

```env
SUPABASE_URL=https://kbxzzrrxkrcnxuvnwrht.supabase.co
SUPABASE_ANON_KEY=your-full-anon-key-here
```

**Important:** 
- The `.env` file is already in `.gitignore` (won't be committed to Git)
- Never commit your `.env` file to GitHub!

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `@supabase/supabase-js` (for Supabase client)
- `dotenv` (for loading .env file locally)

### 3. Test Locally

```bash
npm run dev
```

This runs `vercel dev` which:
- Automatically loads `.env` file
- Simulates Vercel environment
- Lets you test API endpoints locally

### 4. Deploy to Vercel

**Add Environment Variables in Vercel:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `SUPABASE_URL` = `https://kbxzzrrxkrcnxuvnwrht.supabase.co`
   - `SUPABASE_ANON_KEY` = [Your full anon key]
3. Select all environments (Production, Preview, Development)
4. Save and redeploy

**No `.env` file needed on Vercel!** Vercel uses the variables you set in the dashboard.

---

## How It Works

### Local Development:
```
.env file → dotenv loads it → process.env → API uses it
```

### Vercel Production:
```
Vercel Dashboard → Automatically injected → process.env → API uses it
```

The code automatically handles both scenarios - no changes needed!

---

## Security Notes

✅ **DO:**
- Keep `.env` in `.gitignore` (already done)
- Use `.env.example` as a template (already created)
- Add real values to Vercel dashboard
- Never commit actual keys to Git

❌ **DON'T:**
- Commit `.env` file to Git
- Share your keys publicly
- Use production keys in local `.env` (use same values, but be careful)

---

## Troubleshooting

**"Server configuration error" in production:**
- Check Vercel environment variables are set
- Make sure you selected all environments
- Redeploy after adding variables

**"Cannot find module 'dotenv'" locally:**
- Run `npm install` to install dependencies

**Variables not loading locally:**
- Make sure `.env` file is in project root (same level as `package.json`)
- Check `.env` file has no syntax errors
- Restart your dev server after creating `.env`

---

## Your Current Setup

✅ `.env` file created (for local dev)
✅ `.gitignore` configured (won't commit .env)
✅ `dotenv` added to devDependencies
✅ API code handles both local and Vercel
✅ `.env.example` template created

You're all set! 🎉
