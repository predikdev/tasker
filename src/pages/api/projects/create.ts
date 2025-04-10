// With `output: 'static'` configured:
export const prerender = false;
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
import { createSlug } from '@/lib/createSlug';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const projectName = formData.get('project-name')?.toString();
  const projectDesc = formData.get('project-desc')?.toString();

  // Get current user ID from auth.users
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const slug = createSlug(projectName || '');
  console.log(slug);

  // Check for user
  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single();

  let error;

  const { error: projectError } = await supabase.from('projects').insert({
    user_id: user.id,
    name: projectName,
    description: projectDesc,
    slug: slug,
    created_at: new Date().toISOString(),
  });
  error = projectError;

  if (error) {
    return new Response(error.message, { status: 500 });
  }
  return redirect(`/projects/${slug}`);
};
