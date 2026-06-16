import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Lock } from 'lucide-react';
import api from '../../lib/axios';
import Modal from '../../components/Modal';
import { useAuth } from '../../contexts/AuthContext';

const Transaksi = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [pin, setPin] = useState('');
  const [formData, setFormData] = useState({
    tanggal: '',
    jenis: 'pemasukan',
    nominal: '',
    metode_pembayaran: 'QRIS',
    status: 'Berhasil'
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transaksi');
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

  const handleOpenModal = (trx = null) => {
    if (trx) {
      setEditingId(trx.id);
      setFormData({
        tanggal: trx.tanggal,
        jenis: trx.jenis || 'pemasukan',
        nominal: trx.nominal,
        metode_pembayaran: trx.metode_pembayaran,
        status: trx.status
      });
    } else {
      setEditingId(null);
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        jenis: 'pemasukan',
        nominal: '',
        metode_pembayaran: 'QRIS',
        status: 'Berhasil'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, pin };
      if (editingId) {
        await api.put(`/transaksi/${editingId}`, payload);
      } else {
        await api.post('/transaksi', payload);
      }
      setIsModalOpen(false);
      setPin('');
      fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menyimpan transaksi');
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setPin('');
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/transaksi/${deleteId}`, { data: { pin } });
      setIsDeleteModalOpen(false);
      setPin('');
      fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menghapus transaksi');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Transaksi QRIS</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola dan pantau seluruh transaksi digital UMKM Anda.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Tambah Transaksi
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Actions */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari transaksi..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 w-full sm:w-auto justify-center">
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Jenis</th>
                <th className="px-6 py-4 font-medium">Nominal</th>
                <th className="px-6 py-4 font-medium">Metode Pembayaran</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{trx.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trx.tanggal}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {trx.jenis === 'pengeluaran' ? (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md">Pengeluaran</span>
                    ) : (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md">Pemasukan</span>
                    )}
                  </td>
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
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(trx)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => confirmDelete(trx.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Transaksi" : "Tambah Transaksi"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input 
              type="date" 
              required
              value={formData.tanggal}
              onChange={e => setFormData({...formData, tanggal: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Transaksi</label>
            <select 
              value={formData.jenis}
              onChange={e => setFormData({...formData, jenis: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rp)</label>
            <input 
              type="number" 
              required
              value={formData.nominal}
              onChange={e => setFormData({...formData, nominal: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
            <select 
              value={formData.metode_pembayaran}
              onChange={e => setFormData({...formData, metode_pembayaran: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="QRIS">QRIS</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Tunai">Tunai</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="Berhasil">Berhasil</option>
              <option value="Pending">Pending</option>
              <option value="Gagal">Gagal</option>
            </select>
          </div>
          {user?.role !== 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Lock size={14}/> PIN Transaksi</label>
              <input 
                type="password" 
                required
                maxLength={6}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary tracking-[0.5em] text-center text-lg"
                placeholder="••••••"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">Masukkan 6-digit PIN transaksi Anda untuk mengonfirmasi.</p>
            </div>
          )}
          <div className="pt-4">
            <button type="submit" className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-2 rounded-lg transition-colors">
              Simpan Transaksi
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Transaksi"
      >
        <form onSubmit={executeDelete} className="space-y-4">
          <p className="text-sm text-gray-600">Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.</p>
          {user?.role !== 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Lock size={14}/> PIN Transaksi</label>
              <input 
                type="password" 
                required
                maxLength={6}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary tracking-[0.5em] text-center text-lg"
                placeholder="••••••"
              />
            </div>
          )}
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors">
              Hapus
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Transaksi;
