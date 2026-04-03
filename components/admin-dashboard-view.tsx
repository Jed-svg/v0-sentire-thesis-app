export function AdminDashboardView({ profile, email }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Maroon as seen in your screenshot */}
      <aside className="w-64 bg-[#800000] text-white flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8">
          <img src="/OIP-removebg-preview.png" className="h-8 w-8 bg-white rounded-full p-0.5" />
          <span className="font-bold">Sentire Admin</span>
        </div>
        <nav className="flex-1">
          <div className="bg-white/10 p-2 rounded-md flex items-center gap-2">
            <span>Dashboard</span>
          </div>
        </nav>
        <div className="border-t border-white/20 pt-4 mt-auto">
          <p className="text-xs opacity-70 truncate">{email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#FDFCFB] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Hello, {profile?.full_name || 'Admin'}
          </h1>
          {/* NO CHECK-IN BUTTON HERE */}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Student Population Overview</h2>
            <p className="text-slate-500">Welcome to the Faculty Portal. Here you can monitor overall student trends.</p>
          </div>

          {/* Add your Admin-only tables/charts here */}
        </div>
      </main>
    </div>
  )
}