import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../lib/axios';

const Umkm = () => {
  const [umkms, setUmkms] = useState([]);

  useEffect(() => {
    fetchUmkms();
  }, []);

  const fetchUmkms = async () => {
    try {
      const { data } = await api.get('/admin/umkm');
      setUmkms(data);
    } catch (error) {
      console.error('Failed to fetch UMKM data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus UMKM ini? Data transaksi mereka juga akan ikut terhapus!')) {
      try {
        await api.delete(`/admin/umkm/${id}`);
        fetchUmkms();
      } catch (error) {
        alert('Gagal menghapus UMKM');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Data UMKM</h1>
          <p className="text-gray-500 text-sm mt-1">Daftar seluruh UMKM yang terdaftar di platform FinSmart.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Pemilik (User)</th>
                <th className="px-6 py-4 font-medium">Nama Usaha</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Pendapatan/Bulan</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {umkms.map((umkm) => (
                <tr key={umkm.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{umkm.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{umkm.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{umkm.nama_umkm}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{umkm.jenis_usaha}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">Rp {Number(umkm.pendapatan).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(umkm.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus UMKM">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {umkms.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Belum ada UMKM terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Umkm;
