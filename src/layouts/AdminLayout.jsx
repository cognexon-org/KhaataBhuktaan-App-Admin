import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, BookOpen, Boxes, ClipboardList, DatabaseBackup, FileSpreadsheet, FolderOpen, Gauge, HandCoins, Landmark, LogOut, Menu, PackagePlus, Search, Settings, Upload, Users } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Dashboard', icon: Gauge, end: true },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/parties', label: 'Parties', icon: Landmark },
  { to: '/ledger', label: 'Ledger', icon: BookOpen },
  { to: '/settlements', label: 'Settlements', icon: HandCoins },
  { to: '/dalali', label: 'Dalali', icon: ClipboardList },
  { to: '/outstanding', label: 'Outstanding', icon: Search },
  { to: '/documents', label: 'Documents', icon: FolderOpen },
  { to: '/catalogue', label: 'Catalogue', icon: Boxes },
  { to: '/reminders', label: 'Reminders', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileSpreadsheet },
  { to: '/bulk-import', label: 'Bulk Import', icon: Upload },
  { to: '/backups', label: 'Backups', icon: DatabaseBackup },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const doLogout = () => { logout(); navigate('/login'); };
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-100 bg-white p-4 shadow-soft transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="rounded-2xl bg-orange-600 p-3 text-white"><PackagePlus size={24} /></div>
          <div><h2 className="font-black text-slate-950">VyaparSettle</h2><p className="text-xs text-slate-500">Admin Panel</p></div>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button className="rounded-xl p-2 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
            <div className="hidden md:block"><p className="text-sm font-semibold text-slate-950">Admin workspace</p><p className="text-xs text-slate-500">Monitor ledgers, settlements, backups and data imports.</p></div>
            <div className="flex items-center gap-3">
              <div className="text-right"><p className="text-sm font-bold text-slate-950">{user?.fullName || user?.name || 'Admin'}</p><p className="text-xs text-slate-500">{user?.mobile || user?.email || 'Authenticated'}</p></div>
              <button className="btn-secondary" onClick={doLogout}><LogOut size={16} /> Logout</button>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
