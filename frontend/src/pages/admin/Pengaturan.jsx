import { useState } from 'react';
import { Settings, Shield, Bell, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Pengaturan = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    siteName: 'FinSmart UMKM',
    maintenanceMode: false,
    emailNotifications: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Pengaturan sistem berhasil disimpan! (Mock UI)');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
        <p className="text-gray-500 text-sm mt-1">Konfigurasi preferensi aplikasi dan keamanan akun admin Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Settings size={18} className="text-primary" />
              <h2 className="font-bold text-gray-900">Konfigurasi Umum</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Aplikasi</label>
                  <input 
                    type="text" 
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-50">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Mode Perawatan (Maintenance)</p>
                    <p className="text-xs text-gray-500">Mencegah user biasa untuk login saat sistem sedang diupdate.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.maintenanceMode} onChange={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Notifikasi Email Admin</p>
                    <p className="text-xs text-gray-500">Kirim email ketika ada UMKM baru yang mendaftar.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.emailNotifications} onChange={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-primary hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Save size={16} /> Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center p-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <Shield size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{user?.name || 'Administrator'}</h3>
            <p className="text-sm text-primary font-medium mb-1">Super Admin</p>
            <p className="text-xs text-gray-500 mb-6">{user?.email}</p>
            
            <button className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors">
              Ubah Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pengaturan;
