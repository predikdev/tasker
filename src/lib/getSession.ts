import { supabase } from './supabase';

export async function getSession() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError) {
    console.log('Session error:', sessionError);
  }
  return session;
}
