import { useState, useEffect } from 'react';
import { User, MapPin, Briefcase } from 'lucide-react';
import api from '../../lib/axios';
import { useAuth } from '../../contexts/AuthContext';

const Profil = () => {
  const { user } = useAuth();
  const [umkm, setUmkm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama_umkm: '',
    jenis_usaha: '',
    lokasi: '',
    pendapatan: '',
  });

  useEffect(() => {
    fetchUmkm();
  }, []);

  const fetchUmkm = async () => {
    try {
      const { data } = await api.get('/umkm/me');
      setUmkm(data);
      setFormData({
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/umkm', formData);
      setUmkm(data.umkm);
      setIsEditing(false);
      alert('Profil berhasil disimpan!');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menyimpan profil');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data diri dan informasi UMKM Anda.</p>
        {!umkm && !isEditing && (
           <div className="mt-4 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg text-sm">
             <strong>Penting:</strong> Anda belum mengisi profil UMKM. Silakan lengkapi profil UMKM Anda agar bisa menambah transaksi.
           </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-green-400"></div>
        <div className="px-8 pb-8">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                {user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </div>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Edit Profil
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Batal
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informasi Pemilik</h3>
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <div><p className="text-sm text-gray-500">Nama Lengkap</p><p className="font-medium text-gray-900">{user?.name}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400">@</div>
                <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-gray-900">{user?.email}</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Data UMKM</h3>
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha</label>
                    <input type="text" name="nama_umkm" value={formData.nama_umkm} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bidang/Kategori Usaha</label>
                    <input type="text" name="jenis_usaha" value={formData.jenis_usaha} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi/Alamat</label>
                    <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pendapatan Rata-rata /Bulan (Rp)</label>
                    <input type="number" name="pendapatan" value={formData.pendapatan} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Simpan Perubahan
                  </button>
                </form>
              ) : umkm ? (
                <>
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-gray-400" size={20} />
                    <div><p className="text-sm text-gray-500">Nama Usaha & Bidang</p><p className="font-medium text-gray-900">{umkm.nama_umkm} ({umkm.jenis_usaha})</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-400" size={20} />
                    <div><p className="text-sm text-gray-500">Lokasi</p><p className="font-medium text-gray-900">{umkm.lokasi}</p></div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm italic">Belum ada data UMKM. Silakan Edit Profil.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
