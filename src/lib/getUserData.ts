import { supabase } from './supabase';
import { getSession } from './getSession';
import type { UserData } from '@/types/userData';

export async function getUserData() {
  const session = await getSession();
  if (!session) return null;

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session?.user.id)
    .single();

  if (userError) {
    console.error('User data fetch failed:', userError);
    return null;
  }

  return {
    session,
    userData: userData as UserData,
  };
}
