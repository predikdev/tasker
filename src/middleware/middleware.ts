import { defineMiddleware } from 'astro/middleware';
import { supabase } from '@/lib/supabase';

const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/api/auth', // Add this to allow auth endpoints
];

export const onRequest = defineMiddleware(
  async ({ request, cookies, redirect, locals }, next) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Allow public routes and API routes to bypass authentication
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
      return next();
    }

    // Get the session directly from Supabase
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      console.error('Auth error:', error);
      // Clear any existing cookies
      cookies.delete('sb-access-token', { path: '/' });
      cookies.delete('sb-refresh-token', { path: '/' });
      return redirect('/login');
    }

    return next();
  }
);
