import { supabase } from '../lib/supabase';

export async function getSessionHandler() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error('Session fetch failed:', sessionError);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('No session found');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (userError) {
    console.error('User data fetch failed in dashboard:', userError);
    throw new Error('Failed to fetch user data');
  }

  return {
    session,
    userData,
  };
}
