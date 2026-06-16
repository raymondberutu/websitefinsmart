import { useState, useEffect } from 'react';
import { Shield, Bell, Moon, Smartphone } from 'lucide-react';
import Modal from '../../components/Modal';

const Pengaturan = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old: '', new: '', confirm: '' });

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    
    // Simulate dark mode toggle
    if (key === 'darkMode') {
      if (newSettings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert('Password baru dan konfirmasi tidak cocok!');
      return;
    }
    // Simulate API Call
    alert('Password berhasil diperbarui!');
    setIsPasswordModalOpen(false);
    setPasswordForm({ old: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 text-sm mt-1">Konfigurasi preferensi akun dan aplikasi Anda.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
        <div className="divide-y divide-gray-100">
          
          <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-lg"><Bell size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900">Notifikasi Push</h3>
                <p className="text-sm text-gray-500 mt-1">Terima notifikasi untuk simulasi dan laporan baru.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-lg"><Moon size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900">Tema Gelap (Dark Mode)</h3>
                <p className="text-sm text-gray-500 mt-1">Ganti tema antarmuka menjadi gelap.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-lg"><Shield size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900">Ganti Password</h3>
                <p className="text-sm text-gray-500 mt-1">Perbarui kata sandi Anda secara berkala.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Ubah
            </button>
          </div>

          <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-lg"><Smartphone size={24} /></div>
              <div>
                <h3 className="font-bold text-gray-900">Sesi Aktif</h3>
                <p className="text-sm text-gray-500 mt-1">Kelola perangkat yang masuk ke akun Anda.</p>
              </div>
            </div>
            <button 
              onClick={() => alert('Sesi saat ini:\n1. Windows - Chrome (Aktif sekarang)\n2. Android - Safari (2 jam yang lalu)')}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Lihat Sesi
            </button>
          </div>

        </div>
      </div>

      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Ganti Password">
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
            <input 
              type="password" required 
              value={passwordForm.old} onChange={e => setPasswordForm({...passwordForm, old: e.target.value})}
              className="w-full border p-2 rounded-lg focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
            <input 
              type="password" required 
              value={passwordForm.new} onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
              className="w-full border p-2 rounded-lg focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
            <input 
              type="password" required 
              value={passwordForm.confirm} onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
              className="w-full border p-2 rounded-lg focus:ring-primary focus:border-primary" 
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-blue-800 text-white py-2 rounded-lg font-medium transition-colors">
            Simpan Password
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Pengaturan;
