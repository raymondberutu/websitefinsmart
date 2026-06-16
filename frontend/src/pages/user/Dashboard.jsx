import { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard,
  Activity,
  TrendingUp,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Phone,
  Wifi
} from 'lucide-react';
import api from '../../lib/axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const QuickActionButton = ({ icon, label, to, color }) => (
  <Link 
    to={to} 
    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all group"
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </Link>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const [walletData, setWalletData] = useState({
    saldo: 0,
    recent_transactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const { data } = await api.get('/wallet/dashboard');
        setWalletData({
          saldo: Number(data.saldo) || 0,
          recent_transactions: data.recent_transactions || []
        });
      } catch (error) {
        console.error('Failed to fetch wallet data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
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

  if (loading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-40 bg-gray-200 rounded-2xl w-full"></div>
      <div className="grid grid-cols-4 gap-4"><div className="h-24 bg-gray-200 rounded-xl"></div><div className="h-24 bg-gray-200 rounded-xl"></div><div className="h-24 bg-gray-200 rounded-xl"></div><div className="h-24 bg-gray-200 rounded-xl"></div></div>
    </div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Utama</h1>
          <p className="text-gray-500 text-sm mt-1">Selamat datang kembali, {user?.name}</p>
        </div>
      </div>

      {/* Saldo Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Abstract decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
        <div className="absolute bottom-0 right-10 -mb-10 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="text-blue-100 text-sm font-medium flex items-center gap-2 mb-2">
              <Wallet size={16} /> Saldo FinSmart
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {formatRupiah(walletData.saldo)}
            </h2>
          </div>
          
          <div className="flex gap-3">
            <Link to="/user/wallet/topup" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
              <ArrowDownRight size={18} /> Top Up
            </Link>
            <Link to="/user/wallet/transfer" className="bg-white text-blue-700 hover:bg-blue-50 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
              <ArrowUpRight size={18} /> Transfer
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Layanan Finansial</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickActionButton to="/user/wallet/transfer" icon={<ArrowUpRight />} label="Transfer" color="blue" />
          <QuickActionButton to="/user/wallet/topup" icon={<ArrowDownRight />} label="Top Up" color="green" />
          <QuickActionButton to="/user/wallet/pembayaran" icon={<Zap />} label="Listrik & Air" color="yellow" />
          <QuickActionButton to="/user/wallet/pembayaran" icon={<Phone />} label="Pulsa & Data" color="purple" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Clock size={18} className="text-primary"/> Riwayat Terakhir
            </h3>
            <Link to="/user/wallet/riwayat" className="text-sm text-primary font-medium hover:underline flex items-center">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100">
            {walletData.recent_transactions.length > 0 ? (
              walletData.recent_transactions.map((trx) => (
                <div key={trx.id} className="p-5 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      {getTrxIcon(trx.tipe)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{getTrxTitle(trx)}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{trx.deskripsi}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(trx.created_at).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isIncome(trx.tipe) ? 'text-green-600' : 'text-gray-900'}`}>
                      {isIncome(trx.tipe) ? '+' : '-'}{formatRupiah(trx.nominal)}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${trx.status === 'Berhasil' ? 'bg-green-100 text-green-700' : 
                        trx.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {trx.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500">
                <Activity size={48} className="mx-auto text-gray-300 mb-3" />
                <p>Belum ada transaksi di dompet Anda.</p>
              </div>
            )}
          </div>
        </div>

        {/* Info & Security */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aman & Terlindungi</h3>
            <p className="text-sm text-gray-600 mb-4">
              Seluruh transaksi dompet Anda dilindungi dengan enkripsi end-to-end dan PIN Transaksi 6-digit.
            </p>
            {!user?.pin && (
              <Link to="/user/profil" className="inline-block text-sm font-bold text-green-700 hover:text-green-800 hover:underline">
                Buat PIN Sekarang &rarr;
              </Link>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider text-gray-500">Promo Pembayaran</h3>
             <div className="space-y-3">
               <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                 <Zap className="text-blue-500 shrink-0 mt-0.5" size={18} />
                 <div>
                   <p className="text-sm font-bold text-blue-900">Diskon Token Listrik</p>
                   <p className="text-xs text-blue-700 mt-0.5">Potongan Rp 5.000 untuk pembelian pertama.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                 <Wifi className="text-purple-500 shrink-0 mt-0.5" size={18} />
                 <div>
                   <p className="text-sm font-bold text-purple-900">Cashback Internet</p>
                   <p className="text-xs text-purple-700 mt-0.5">Bayar tagihan Indihome dapat cashback 5%.</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
