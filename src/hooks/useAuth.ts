import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const { user, login, logout } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Fetch user data and role from your users table
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              login({
                id: data.id,
                email: data.email,
                name: data.name,
                role: data.role,
              });
            }
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        logout();
      }
    });

    return () => subscription.unsubscribe();
  }, [login, logout]);

  return { user, isAuthenticated: !!user };
}