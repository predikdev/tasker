import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/getSession';

const publicRoutes = ['/login', '/register'];

const authRoutes = {
  public: ['/api/auth/login', '/api/auth/register'],
  protected: ['/api/auth/logout', '/api/auth/user'],
};

export const onRequest = defineMiddleware(
  async ({ request, redirect }, next) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Allow public pages
    if (publicRoutes.includes(pathname)) {
      return next();
    }

    // Allow public auth endpoints
    if (authRoutes.public.includes(pathname)) {
      return next();
    }

    // Check session for everything else
    const session = await getSession();
    if (!session) {
      return redirect('/login');
    }
    console.log('From middleware');
    return next();
  }
);
