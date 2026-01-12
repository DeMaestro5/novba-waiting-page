// Vercel serverless function for waitlist API
import { createClient } from '@supabase/supabase-js';

// Note: Vercel automatically loads .env files when using `vercel dev`
// For production, environment variables are set in Vercel dashboard
// No dotenv needed - Vercel handles it automatically!

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        return res
          .status(400)
          .json({ error: 'This email is already on the waitlist!' });
      }

      // Insert new email
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email.toLowerCase(),
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error.code === '42P01') {
        return res.status(500).json({
          error: 'Database table not configured. Contact support.',
        });
      }

      if (error) {
        console.error('Supabase error:', error);
        return res
          .status(500)
          .json({ error: 'Failed to add email to waitlist' });
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully added to waitlist',
        data,
      });
    } catch (error) {
      console.error('Error in waitlist API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    try {
      // Get count of waitlist entries
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Failed to get waitlist count' });
      }

      return res.status(200).json({
        count: count || 0,
      });
    } catch (error) {
      console.error('Error in waitlist count API:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
