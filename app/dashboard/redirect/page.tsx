import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardRootPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const userRole = profile?.role || user.user_metadata?.role || 'student'

  // Route based on role
  if (userRole === 'teacher') {
    redirect('/dashboard/students')
  } else {
    redirect('/dashboard') // This will show the wellness dashboard (handled by layout)
  }
}
