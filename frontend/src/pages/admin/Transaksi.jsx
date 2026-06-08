import { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';
import api from '../../lib/axios';

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transaksi');
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus transaksi ini? Data tidak dapat dikembalikan.')) {
      try {
        await api.delete(`/transaksi/${id}`);
        fetchTransactions();
      } catch (error) {
        alert('Gagal menghapus transaksi');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rekapitulasi Transaksi</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau seluruh perputaran uang dari semua UMKM.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan ID atau nama UMKM..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Nama UMKM</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Nominal</th>
                <th className="px-6 py-4 font-medium">Metode</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{trx.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">{trx.umkm?.nama_umkm || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trx.tanggal}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                    Rp {Number(trx.nominal).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trx.metode_pembayaran}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${trx.status === 'Berhasil' ? 'bg-green-100 text-green-800' : 
                        trx.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(trx.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    Belum ada transaksi di seluruh sistem.
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

export default Transaksi;
