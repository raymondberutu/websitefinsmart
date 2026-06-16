import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard,
  Activity,
  Search,
  Filter
} from 'lucide-react';
import api from '../../lib/axios';

const RiwayatWallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, masuk, keluar
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const { data } = await api.get('/wallet/riwayat');
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch wallet history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRiwayat();
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  const getTrxIcon = (tipe) => {
    switch(tipe) {
      case 'top_up': return <ArrowDownRight size={20} className="text-green-500" />;
      case 'transfer_in': return <ArrowDownRight size={20} className="text-green-500" />;
      case 'transfer_out': return <ArrowUpRight size={20} className="text-red-500" />;
      case 'pembayaran': return <CreditCard size={20} className="text-orange-500" />;
      default: return <Activity size={20} className="text-gray-500" />;
    }
  };

  const getTrxTitle = (trx) => {
    switch(trx.tipe) {
      case 'top_up': return 'Top Up Saldo';
      case 'transfer_in': return 'Terima Dana';
      case 'transfer_out': return 'Transfer Dana';
      case 'pembayaran': return 'Pembayaran Tagihan';
      default: return 'Transaksi';
    }
  };

  const isIncome = (tipe) => ['top_up', 'transfer_in'].includes(tipe);

  const filteredTransactions = transactions.filter(trx => {
    const matchesSearch = trx.deskripsi?.toLowerCase().includes(search.toLowerCase()) || 
                          trx.referensi?.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'masuk') return isIncome(trx.tipe) && matchesSearch;
    if (filter === 'keluar') return !isIncome(trx.tipe) && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat E-Wallet</h1>
        <p className="text-gray-500 text-sm mt-1">Daftar seluruh transaksi dompet digital Anda.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari transaksi..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex bg-white rounded-lg border border-gray-200 p-1 w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter('masuk')}
              className={`flex-1 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'masuk' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Uang Masuk
            </button>
            <button 
              onClick={() => setFilter('keluar')}
              className={`flex-1 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'keluar' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Uang Keluar
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {loading ? (
             <div className="p-10 text-center text-gray-500">Memuat riwayat transaksi...</div>
          ) : filteredTransactions.length > 0 ? (
            filteredTransactions.map((trx) => (
              <div key={trx.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm shrink-0">
                    {getTrxIcon(trx.tipe)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{getTrxTitle(trx)}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{trx.deskripsi}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-gray-400">{new Date(trx.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500 font-mono">Ref: {trx.referensi || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="sm:text-right flex sm:block items-center justify-between mt-2 sm:mt-0 pl-16 sm:pl-0">
                  <p className={`font-bold text-lg ${isIncome(trx.tipe) ? 'text-green-600' : 'text-gray-900'}`}>
                    {isIncome(trx.tipe) ? '+' : '-'}{formatRupiah(trx.nominal)}
                  </p>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide
                    ${trx.status === 'Berhasil' ? 'bg-green-100 text-green-700' : 
                      trx.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                      'bg-red-100 text-red-700'}`}>
                    {trx.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center text-gray-500 flex flex-col items-center">
              <Activity size={48} className="text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">Tidak ada riwayat ditemukan</p>
              <p className="text-sm mt-1">Coba sesuaikan filter pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiwayatWallet;
