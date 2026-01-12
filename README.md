# Novba Waiting Page

A beautiful landing page for Novba - AI-powered invoicing for freelancers.

## Features

- Modern, responsive design
- Email waitlist signup with Supabase backend
- Real-time waitlist counter
- Smooth animations and transitions
- Mobile-friendly layout

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Vercel CLI (if not already installed):**
   ```bash
   npm install -g vercel
   ```

3. **Create `.env` file:**
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   - Usually at `http://localhost:3000`
   - Vercel will show you the exact URL

### Important Notes

- **Don't use Live Server** - It can't run Vercel serverless functions
- **Use `vercel dev`** - This properly runs the API endpoints
- See `LOCAL_DEVELOPMENT.md` for troubleshooting

## Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Deploy automatically on push

See `SETUP.md` for detailed Supabase setup instructions.
