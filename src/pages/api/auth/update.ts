// With `output: 'static'` configured:
export const prerender = false;
import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const first_name = formData.get('first_name')?.toString();
  const last_name = formData.get('last_name')?.toString();
  const username = formData.get('username')?.toString();
  const email = formData.get('email')?.toString();

  // Get current user ID from auth.users
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check for user
  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single();

  let error;

  if (!existingUser) {
    const { error: insertError } = await supabase.from('users').insert({
      id: user.id,
      first_name,
      last_name,
      username,
      email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    error = insertError;
  } else {
    const { error: updateError } = await supabase
      .from('users')
      .update({
        first_name,
        last_name,
        username,
        email,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    error = updateError;
  }

  if (error) {
    return new Response(error.message, { status: 500 });
  }
  return redirect('/profile');
};
