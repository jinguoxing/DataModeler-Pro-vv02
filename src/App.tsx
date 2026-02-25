
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Settings, TableProperties } from 'lucide-react';

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0">
        <div className="h-16 flex items-center px-6 font-bold text-white tracking-wider border-b border-slate-800">
          BizSemantic
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}>
            <LayoutDashboard className="w-5 h-5" /> 仪表盘
          </Link>
          <Link to="/semantic-modeling/logical-views" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors ${location.pathname.includes('semantic-modeling') ? 'bg-indigo-600 text-white' : ''}`}>
            <TableProperties className="w-5 h-5" /> 语义建模
          </Link>
          <div className="px-4 py-3 text-xs font-bold text-slate-500 uppercase mt-4">Settings</div>
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
            <Settings className="w-5 h-5" /> 配置中心
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
