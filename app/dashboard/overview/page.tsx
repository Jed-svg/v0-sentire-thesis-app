import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TeacherDashboardView } from '@/components/teacher-dashboard-view'

export const metadata = {
  title: 'Teacher Dashboard - Sentire',
  description: 'Teacher portal for monitoring student wellness',
}

export default async function TeacherOverviewPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  let profile = null
  try {
    const { data } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .maybeSingle()
    profile = data
  } catch (error) {
    console.error('[v0] Teacher profile fetch error:', error)
  }

  const role = profile?.role ?? user.user_metadata?.role ?? 'student'

  if (role !== 'teacher') {
    redirect('/dashboard')
  }

  return (
    <TeacherDashboardView 
      profile={profile} 
      email={user.email || ''} 
    />
  )
}
