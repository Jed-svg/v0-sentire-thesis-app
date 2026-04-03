'use client'

import { useState, useEffect } from 'react'
import { Bell, Search, BarChart3, Users, AlertCircle, TrendingDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmotionPerformanceHeatmap } from '@/components/emotion-performance-heatmap'
import { ClassroomVibeRings } from '@/components/classroom-vibe-rings'
import { CommonStruggleWordCloud } from '@/components/common-struggle-wordcloud'
import { AtRiskAlertsList } from '@/components/at-risk-alerts-list'
import { UserManagementTable } from '@/components/user-management-table'

interface AdminDashboardClientProps {
  userId: string
  initialStats?: any[]
  initialAlerts?: any[]
  initialUsers?: any[]
  initialStruggles?: any[]
}

export function AdminDashboardClient({
  userId,
  initialStats = [],
  initialAlerts = [],
  initialUsers = [],
  initialStruggles = []
}: AdminDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [alertsCount, setAlertsCount] = useState<number>(initialAlerts.length)

  // Update alerts count if initialAlerts changes
  useEffect(() => {
    setAlertsCount(initialAlerts.length)
  }, [initialAlerts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search students or teachers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-100 dark:bg-slate-900 border-0"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {alertsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Monitor student wellness and academic performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <TabsTrigger value="overview" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center justify-center gap-2 text-xs sm:text-sm">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Metric Card: Total Students */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Students</p>
                    <p className="text-2xl font-bold mt-2">{initialUsers.filter(u => u.role === 'student').length || '0'}</p>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              {/* Metric Card: Avg Mood */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Avg. Mood Score</p>
                    <p className="text-2xl font-bold mt-2">—</p>
                  </div>
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                    <span className="text-xl font-bold">☺</span>
                  </div>
                </div>
              </Card>

              {/* Metric Card: At-Risk */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">At-Risk Students</p>
                    <p className="text-2xl font-bold text-red-600 mt-2">{alertsCount}</p>
                  </div>
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </Card>

              {/* Metric Card: Active Teachers */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Teachers</p>
                    <p className="text-2xl font-bold mt-2">{initialUsers.filter(u => u.role === 'teacher').length || '0'}</p>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EmotionPerformanceHeatmap data={initialStats} />
              </div>
              <div>
                <ClassroomVibeRings data={initialStats} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CommonStruggleWordCloud data={initialStruggles} />
              <AtRiskAlertsList data={initialAlerts} onAlertsChange={setAlertsCount} />
            </div>
          </TabsContent>

          {/* Other Tabs follow the same pattern */}
          <TabsContent value="analytics">
            <EmotionPerformanceHeatmap data={initialStats} />
          </TabsContent>

          <TabsContent value="alerts">
            <AtRiskAlertsList data={initialAlerts} onAlertsChange={setAlertsCount} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagementTable users={initialUsers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}