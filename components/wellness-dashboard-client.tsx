'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface WellnessDashboardClientProps {
  profile: any
  email: string
}

export function WellnessDashboardClient({ profile, email }: WellnessDashboardClientProps) {
  const router = useRouter()
  const pathname = usePathname()

  const userEmail = email?.toLowerCase()
  const isAdmin = userEmail === 'pupmadmin@gmail.com' || profile?.role === 'admin'
  const isTeacher = userEmail === 'teacherupm@gmail.com' || profile?.role === 'teacher'

  useEffect(() => {
    // CRITICAL: Only redirect if the user is EXACTLY on '/dashboard'
    // If the pathname is '/dashboard/students', this IF block is ignored.
    if (pathname === '/dashboard') {
      if (isAdmin) {
        router.replace('/dashboard/admin')
      } else if (isTeacher) {
        router.replace('/dashboard/overview')
      }
    }
  }, [isAdmin, isTeacher, router, pathname])

  // If a teacher is at the root /dashboard, hide the Student UI 
  // to prevent a "flash" before the redirect happens.
  if (pathname === '/dashboard' && (isAdmin || isTeacher)) {
    return null
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Student Wellness</h1>
        <p className="text-slate-500 text-sm mt-1 text-maroon">
          Monitoring System active for: {profile?.full_name || email}
        </p>
      </header>

      <div className="mt-6 p-10 border-2 border-dashed border-slate-200 rounded-2xl text-center">
        <p className="text-slate-400">Student wellness modules and check-ins load here.</p>
      </div>
    </div>
  )
}