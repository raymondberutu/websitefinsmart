import { useState, useEffect, useRef } from 'react';
import { User, MapPin, Briefcase, Camera, Lock, Bell, Shield, Phone, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';

const Profil = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('data-diri');
  
  // UMKM State
  const [umkm, setUmkm] = useState(null);
  
  // Forms State
  const [personalData, setPersonalData] = useState({
    name: '',
    email: '',
    phone: '',
    receive_notifications: true
  });
  
  const [umkmData, setUmkmData] = useState({
    nama_umkm: '',
    jenis_usaha: '',
    lokasi: '',
    pendapatan: '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const [pinData, setPinData] = useState({
    pin: '',
    pin_confirmation: ''
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // UI State
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingUmkm, setIsEditingUmkm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUmkm();
    if (user) {
      setPersonalData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        receive_notifications: user.receive_notifications ?? true
      });
      setIs2FAEnabled(user.two_factor_enabled ?? false);
      if (user.profile_photo) {
        const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:8000';
        setPhotoPreview(`${apiUrl}/storage/${user.profile_photo}`);
      }
    }
  }, [user]);

  const fetchUmkm = async () => {
    try {
      const { data } = await api.get('/umkm/me');
      setUmkm(data);
      setUmkmData({
        nama_umkm: data.nama_umkm || '',
        jenis_usaha: data.jenis_usaha || '',
        lokasi: data.lokasi || '',
        pendapatan: data.pendapatan || '',
      });
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Failed to fetch UMKM', error);
      }
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // --- Handlers for Personal Data ---
  const handlePersonalChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPersonalData({ ...personalData, [e.target.name]: value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePersonal = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', personalData.name);
    formData.append('email', personalData.email);
    formData.append('phone', personalData.phone);
    formData.append('receive_notifications', personalData.receive_notifications ? 1 : 0);
    
    if (selectedPhoto) {
      formData.append('photo', selectedPhoto);
    }

    try {
      const { data } = await api.post('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(data.user);
      setIsEditingPersonal(false);
      showMessage('success', 'Profil data diri berhasil diperbarui.');
      // Update photo preview based on new path
      if (data.user.profile_photo) {
        const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:8000';
        setPhotoPreview(`${apiUrl}/storage/${data.user.profile_photo}`);
      }
    } catch (err) {
      console.error(err);
      showMessage('error', err.response?.data?.message || 'Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers for Password ---
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Z]/.test(pwd)) return "Password harus mengandung huruf besar.";
    if (!/[0-9]/.test(pwd)) return "Password harus mengandung angka.";
    if (!/[@$!%*#?&]/.test(pwd)) return "Password harus mengandung simbol (@$!%*#?&).";
    return null;
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    
    const pwdError = validatePassword(passwordData.password);
    if (pwdError) {
      showMessage('error', pwdError);
      return;
    }

    if (passwordData.password !== passwordData.password_confirmation) {
      showMessage('error', 'Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/user/change-password', passwordData);
      showMessage('success', 'Password berhasil diubah.');
      setPasswordData({ current_password: '', password: '', password_confirmation: '' });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors?.current_password) {
        showMessage('error', err.response.data.errors.current_password[0]);
      } else {
        showMessage('error', err.response?.data?.message || 'Gagal mengubah password.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers for PIN and 2FA ---
  const handlePinChange = (e) => {
    // Only allow numbers and max 6 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPinData({ ...pinData, [e.target.name]: val });
  };

  const handleSavePin = async (e) => {
    e.preventDefault();
    if (pinData.pin.length !== 6) {
      showMessage('error', 'PIN harus 6 digit.');
      return;
    }
    if (pinData.pin !== pinData.pin_confirmation) {
      showMessage('error', 'Konfirmasi PIN tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/user/setup-pin', pinData);
      showMessage('success', 'PIN Transaksi berhasil dibuat/diubah.');
      setPinData({ pin: '', pin_confirmation: '' });
      // Update local user object to know they have a pin
      setUser({ ...user, pin: true });
    } catch (err) {
      console.error(err);
      showMessage('error', err.response?.data?.message || 'Gagal mengubah PIN.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA = async () => {
    const newVal = !is2FAEnabled;
    try {
      const { data } = await api.post('/user/toggle-2fa', { enabled: newVal });
      setIs2FAEnabled(newVal);
      setUser(data.user);
      showMessage('success', data.message);
    } catch (err) {
      console.error(err);
      showMessage('error', 'Gagal mengubah pengaturan 2FA.');
    }
  };

  // --- Handlers for UMKM ---
  const handleUmkmChange = (e) => {
    setUmkmData({ ...umkmData, [e.target.name]: e.target.value });
  };

  const handleSaveUmkm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/umkm', umkmData);
      setUmkm(data.umkm);
      setIsEditingUmkm(false);
      showMessage('success', 'Data UMKM berhasil disimpan.');
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Gagal menyimpan profil UMKM.');
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = () => {
    if (!message.text) return null;
    return (
      <div className={`p-4 rounded-lg text-sm mb-6 ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
        {message.text}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengelolaan Profil</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data diri, keamanan akun, dan informasi UMKM Anda.</p>
        {!umkm && !isEditingUmkm && activeTab === 'umkm' && (
           <div className="mt-4 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg text-sm">
             <strong>Penting:</strong> Anda belum mengisi profil UMKM. Silakan lengkapi profil UMKM Anda agar bisa menambah transaksi.
           </div>
        )}
      </div>

      {renderMessage()}

      {/* Tabs */}
      <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 mb-6">
        <button 
          onClick={() => setActiveTab('data-diri')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'data-diri' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          Data Diri & Notifikasi
        </button>
        <button 
          onClick={() => setActiveTab('umkm')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'umkm' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          Data UMKM
        </button>
        <button 
          onClick={() => setActiveTab('keamanan')}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'keamanan' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
        >
          Keamanan Akun
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Cover Background */}
        <div className="h-24 bg-gradient-to-r from-blue-500 to-green-400"></div>
        
        <div className="px-8 pb-8">
          {/* Avatar Section */}
          <div className="flex justify-between items-end -mt-10 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md cursor-pointer overflow-hidden relative">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </div>
                )}
                {activeTab === 'data-diri' && isEditingPersonal && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="text-white" size={24} />
                    <span className="text-white text-xs mt-1 font-medium">Ubah</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>
            
            {/* Edit Toggles */}
            {activeTab === 'data-diri' && (
              !isEditingPersonal ? (
                <button onClick={() => setIsEditingPersonal(true)} className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Edit Data Diri</button>
              ) : (
                <button onClick={() => { setIsEditingPersonal(false); const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : 'http://localhost:8000'; setPhotoPreview(user?.profile_photo ? `${apiUrl}/storage/${user.profile_photo}` : null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Batal</button>
              )
            )}

            {activeTab === 'umkm' && (
              !isEditingUmkm ? (
                <button onClick={() => setIsEditingUmkm(true)} className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Edit Data UMKM</button>
              ) : (
                <button onClick={() => setIsEditingUmkm(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">Batal</button>
              )
            )}
          </div>

          {/* TAB: DATA DIRI & NOTIFIKASI */}
          {activeTab === 'data-diri' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2"><User size={20} className="text-primary"/> Informasi Dasar</h3>
                </div>
                
                {isEditingPersonal ? (
                  <form id="personal-form" onSubmit={handleSavePersonal} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                      <input type="text" name="name" value={personalData.name} onChange={handlePersonalChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username (Tidak dapat diubah)</label>
                      <input type="text" value={user?.username || ''} disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" name="email" value={personalData.email} onChange={handlePersonalChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                      <input type="tel" name="phone" value={personalData.phone} onChange={handlePersonalChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><User size={16} /></div>
                      <div><p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Nama Lengkap</p><p className="font-medium text-gray-900">{user?.name}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">@</div>
                      <div><p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Username</p><p className="font-medium text-gray-900">{user?.username}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><Mail size={16} /></div>
                      <div><p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p><p className="font-medium text-gray-900">{user?.email}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><Phone size={16} /></div>
                      <div><p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Nomor Telepon</p><p className="font-medium text-gray-900">{user?.phone || '-'}</p></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications Setting */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2"><Bell size={20} className="text-primary"/> Preferensi Notifikasi</h3>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Notifikasi Sistem</h4>
                      <p className="text-sm text-gray-500 mt-1">Terima pembaruan penting mengenai akun, aktivitas transaksi, dan pemberitahuan edukasi terbaru.</p>
                    </div>
                    {isEditingPersonal ? (
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input type="checkbox" name="receive_notifications" checked={personalData.receive_notifications} onChange={handlePersonalChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    ) : (
                      <div className="mt-1">
                        {user?.receive_notifications ? (
                          <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>
                        ) : (
                          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Nonaktif</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {isEditingPersonal && (
                  <div className="pt-4">
                    <button form="personal-form" type="submit" disabled={loading} className="w-full bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors shadow-md shadow-blue-200">
                      {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: KEAMANAN AKUN */}
          {activeTab === 'keamanan' && (
            <div className="max-w-md mx-auto py-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ubah Password</h3>
                <p className="text-sm text-gray-500 mt-1">Gunakan password yang kuat untuk melindungi akun Anda.</p>
              </div>

              <form onSubmit={handleSavePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
                  <input type="password" name="current_password" value={passwordData.current_password} onChange={handlePasswordChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Masukkan password lama" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                  <input type="password" name="password" value={passwordData.password} onChange={handlePasswordChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Min 8 karakter, huruf besar, angka, simbol" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                  <input type="password" name="password_confirmation" value={passwordData.password_confirmation} onChange={handlePasswordChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Ulangi password baru" />
                </div>
                <div className="pt-2">
                  <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors shadow-md shadow-blue-200">
                    {loading ? 'Mengubah...' : 'Perbarui Password'}
                  </button>
                </div>
              </form>

              <hr className="my-10 border-gray-200" />

              {/* PIN Transaksi */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">PIN Transaksi</h3>
                <p className="text-sm text-gray-500 mt-1">Buat PIN 6-digit untuk mengamankan transaksi Anda.</p>
                {user?.pin ? (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">PIN Sudah Diatur</span>
                ) : (
                  <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Belum Ada PIN</span>
                )}
              </div>

              <form onSubmit={handleSavePin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN (6 Angka)</label>
                  <input type="password" name="pin" value={pinData.pin} onChange={handlePinChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all tracking-[0.5em] text-center text-lg" placeholder="••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi PIN</label>
                  <input type="password" name="pin_confirmation" value={pinData.pin_confirmation} onChange={handlePinChange} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all tracking-[0.5em] text-center text-lg" placeholder="••••••" />
                </div>
                <div className="pt-2">
                  <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md shadow-green-200">
                    {loading ? 'Menyimpan...' : 'Simpan PIN'}
                  </button>
                </div>
              </form>

              <hr className="my-10 border-gray-200" />

              {/* 2FA Toggle */}
              <div className="flex items-start justify-between bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Shield size={20} className="text-primary" /> Verifikasi 2 Langkah (2FA)
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 max-w-sm">Tingkatkan keamanan dengan mewajibkan kode OTP saat Anda masuk ke akun.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" checked={is2FAEnabled} onChange={handleToggle2FA} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="mt-12 space-y-8">
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-primary" /> Sistem Keamanan
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">Aplikasi FinSmart dilengkapi dengan fitur keamanan berstandar industri:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Enkripsi data *end-to-end*</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> OTP verification</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> PIN transaksi aman</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> *Session timeout* otomatis</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> *Multi-factor authentication*</li>
                  </ul>
                </div>

                <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-orange-500" /> Tips Keamanan
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                      <span><strong>Jangan pernah</strong> membagikan password atau PIN Anda kepada siapa pun, termasuk staf FinSmart.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                      <span>Gunakan password yang <strong>kuat</strong> (kombinasi huruf, angka, dan simbol).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                      <span>Selalu <strong>logout</strong> setelah selesai menggunakan sistem pada perangkat apa pun.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                      <span>Hindari login pada perangkat umum atau koneksi Wi-Fi publik tanpa pengamanan.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                      <span>Aktifkan <strong>verifikasi dua langkah</strong> untuk lapisan keamanan tambahan.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DATA UMKM */}
          {activeTab === 'umkm' && (
            <div className="max-w-2xl mx-auto">
              {isEditingUmkm ? (
                <form onSubmit={handleSaveUmkm} className="space-y-5 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha</label>
                    <input type="text" name="nama_umkm" value={umkmData.nama_umkm} onChange={handleUmkmChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bidang/Kategori Usaha</label>
                    <input type="text" name="jenis_usaha" value={umkmData.jenis_usaha} onChange={handleUmkmChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Contoh: Kuliner, Fashion, Jasa" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi/Alamat</label>
                    <input type="text" name="lokasi" value={umkmData.lokasi} onChange={handleUmkmChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pendapatan Rata-rata /Bulan (Rp)</label>
                    <input type="number" name="pendapatan" value={umkmData.pendapatan} onChange={handleUmkmChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md shadow-green-200">
                    {loading ? 'Menyimpan...' : 'Simpan Data UMKM'}
                  </button>
                </form>
              ) : umkm ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Briefcase size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Nama Usaha</p>
                      <p className="font-bold text-gray-900 text-lg">{umkm.nama_umkm}</p>
                      <p className="text-sm text-gray-600 mt-1">{umkm.jenis_usaha}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><MapPin size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Lokasi</p>
                      <p className="font-medium text-gray-900">{umkm.lokasi}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex items-start gap-4 sm:col-span-2">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0"><span className="font-bold">Rp</span></div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Pendapatan Rata-rata/Bulan</p>
                      <p className="font-medium text-gray-900">Rp {Number(umkm.pendapatan).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                  <Briefcase className="mx-auto text-gray-300 mb-3" size={48} />
                  <p className="text-gray-500 mb-4">Belum ada data UMKM yang terdaftar.</p>
                  <button onClick={() => setIsEditingUmkm(true)} className="text-primary font-medium hover:underline">Tambah Data Sekarang</button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profil;
