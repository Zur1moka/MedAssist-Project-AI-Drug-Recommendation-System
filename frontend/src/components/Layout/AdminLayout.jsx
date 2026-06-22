import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-slate-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} glass-card border-r border-slate-800/50 transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-slate-800/50">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">🏥 MedAssist</span>
            <span className="text-teal-400 text-sm font-semibold">AI</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem icon="📊" label="Dashboard" path="/admin" active />
          <NavItem icon="👥" label="Người dùng" path="/admin/users" />
          <NavItem icon="💊" label="Thuốc" path="/admin/drugs" />
          <NavItem icon="🩺" label="Triệu chứng" path="/admin/symptoms" />
          <NavItem icon="📋" label="Báo cáo" path="/admin/reports" />
          <NavItem icon="⚙️" label="Cài đặt" path="/admin/settings" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="glass-card border-b border-slate-800/50 px-6 py-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white">
            ☰
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Xin chào, Admin</span>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">
              Đăng xuất
            </button>
          </div>
        </header>
        
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, path, active }) => (
  <Link to={path} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${active ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:bg-slate-800/30 hover:text-white'}`}>
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default AdminLayout;