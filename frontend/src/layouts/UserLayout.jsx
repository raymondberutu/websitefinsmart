import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, Calculator, CreditCard, TrendingUp, Map, 
  DollarSign, BookOpen, FileText, Bell, User, Settings, LogOut, Menu, X
} from 'lucide-react';

const UserSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: <Home size={20} /> },
    { name: 'Simulasi Kredit', path: '/user/simulasi', icon: <Calculator size={20} /> },
    { name: 'Data Transaksi QRIS', path: '/user/transaksi', icon: <CreditCard size={20} /> },
    { name: 'Analisis Kelayakan', path: '/user/analisis', icon: <TrendingUp size={20} /> },
    { name: 'Peta Sebaran UMKM', path: '/user/peta', icon: <Map size={20} /> },
    { name: 'Rekomendasi Pendanaan', path: '/user/rekomendasi', icon: <DollarSign size={20} /> },
    { name: 'Edukasi Keuangan', path: '/user/edukasi', icon: <BookOpen size={20} /> },
    { name: 'Riwayat Analisis', path: '/user/riwayat', icon: <FileText size={20} /> },
    { name: 'Buku Panduan', path: '/user/panduan', icon: <BookOpen size={20} /> },
    { name: 'Notifikasi', path: '/user/notifikasi', icon: <Bell size={20} /> },
    { name: 'Profil Saya', path: '/user/profil', icon: <User size={20} /> },
    { name: 'Pengaturan', path: '/user/pengaturan', icon: <Settings size={20} /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-surface border-r border-gray-200 w-72 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
            <span className="text-2xl font-bold text-primary tracking-tight">FinSmart</span>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-white shadow-md shadow-blue-200' 
                      : 'text-text-muted hover:bg-blue-50 hover:text-primary'
                  }`
                }
              >
                <div className={`transition-transform duration-200 group-hover:scale-110`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Footer */}
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium text-sm group"
            >
              <LogOut size={20} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        {/* Topbar */}
        <header className="h-16 bg-surface border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1" /> {/* Spacer */}
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold shadow-sm uppercase">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-text-main">{user?.name || 'User UMKM'}</p>
                <p className="text-xs text-text-muted">{user?.umkm?.nama_usaha || 'Belum ada UMKM'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
