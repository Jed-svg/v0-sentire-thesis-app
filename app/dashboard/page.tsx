import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { WellnessDashboardClient } from '@/components/wellness-dashboard-client'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth/login')
  }

  // Fetch only what we need to determine the route
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const role = profile?.role || user.user_metadata?.role

  // ---------------------------------------------------------
  // THE FIX: Server-Side Routing for the base /dashboard path
  // ---------------------------------------------------------
  if (role === 'teacher') {
    redirect('/dashboard/overview')
  }

  if (role === 'admin') {
    redirect('/dashboard/admin')
  }

  // If the user is a Student (or has no role yet), they stay here 
  // and render the Wellness Dashboard.
  return (
    <WellnessDashboardClient
      profile={profile}
      email={user.email!}
      logs={[]}
    />
  )
}