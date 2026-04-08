import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { WellnessDashboardClient } from '@/components/wellness-dashboard-client'

export const metadata = {
  title: 'Student Dashboard - Sentire',
  description: 'Student wellness and academic monitoring dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth/login')
  }

  // Try to fetch profile - use admin client to bypass RLS for now
  let profile = null
  try {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
    profile = data
  } catch (error) {
    console.error('[v0] Profile fetch error:', error)
  }

  const role = profile?.role || user.user_metadata?.role || 'student'

  if (role === 'teacher') {
    redirect('/dashboard/overview')
  }

  if (role === 'admin') {
    redirect('/dashboard/admin')
  }

  return (
    <WellnessDashboardClient
      profile={profile}
      email={user.email!}
      logs={[]}
    />
  )
}
