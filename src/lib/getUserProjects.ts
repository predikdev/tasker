import { supabase } from './supabase';
import { getSession } from './getSession';

export async function getUserProjects() {
  const session = await getSession();
  if (!session) return null;

  const { data: userProject, error: userError } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', session?.user.id);

  if (userError) {
    console.error('User projects fetch failed:', userError);
    return null;
  }

  return {
    session,
    userProject,
  };
}
