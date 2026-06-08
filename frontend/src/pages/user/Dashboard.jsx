import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Activity, 
  TrendingUp 
} from 'lucide-react';
import api from '../../lib/axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const incomeData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'Mei', value: 6000 },
  { name: 'Jun', value: 7000 },
];

const growthData = [
  { name: 'Jan', growth: 10 },
  { name: 'Feb', growth: 15 },
  { name: 'Mar', growth: 20 },
  { name: 'Apr', growth: 25 },
  { name: 'Mei', growth: 35 },
  { name: 'Jun', growth: 45 },
];

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      {trend && (
        <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'} bg-${trend > 0 ? 'green' : 'red'}-50 px-2 py-1 rounded-full`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
    </div>
  </div>
);

const UserDashboard = () => {
  const [stats, setStats] = useState({
    total_transaksi: 0,
    total_pendapatan: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/transaksi');
        setStats({
          total_transaksi: data.length,
          total_pendapatan: data.reduce((sum, trx) => sum + Number(trx.nominal), 0),
        });
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };
    fetchStats();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await api.get('/transaksi/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan_transaksi_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Gagal mendownload laporan');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard UMKM</h1>
          <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas dan performa usaha Anda.</p>
        </div>
        <button 
          onClick={handleDownload}
          className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Download Laporan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pendapatan" 
          value={`Rp ${stats.total_pendapatan.toLocaleString('id-ID')}`}
          icon={<DollarSign size={24} className="text-blue-600" />} 
          color="blue" 
          trend={stats.total_transaksi > 0 ? 12.5 : null} 
        />
        <StatCard 
          title="Jumlah Transaksi" 
          value={`${stats.total_transaksi}`}
          icon={<CreditCard size={24} className="text-green-600" />} 
          color="green" 
          trend={stats.total_transaksi > 0 ? 8.2 : null} 
        />
        <StatCard 
          title="Skor Kredit" 
          value={localStorage.getItem('riwayat_simulasi') ? "785" : "0"} 
          icon={<Activity size={24} className="text-purple-600" />} 
          color="purple" 
          trend={localStorage.getItem('riwayat_simulasi') ? 5.0 : null} 
        />
        <StatCard 
          title="Status Kelayakan" 
          value={localStorage.getItem('riwayat_simulasi') ? "Sangat Layak" : "-"} 
          icon={<TrendingUp size={24} className="text-orange-600" />} 
          color="orange" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">Grafik Pendapatan</h3>
            <p className="text-sm text-gray-500">6 bulan terakhir</p>
          </div>
          <div className="h-72">
            {stats.total_transaksi > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1E3A8A" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-200 rounded-xl">
                <CreditCard size={48} className="text-gray-300 mb-3" />
                <p className="text-gray-900 font-medium">Belum ada data transaksi</p>
                <p className="text-gray-500 text-sm mt-1">Silakan masukkan data QRIS Anda untuk melihat grafik pendapatan.</p>
              </div>
            )}
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">Pertumbuhan Usaha</h3>
            <p className="text-sm text-gray-500">Persentase pertumbuhan per bulan</p>
          </div>
          <div className="h-72">
            {stats.total_transaksi > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="growth" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-200 rounded-xl">
                <TrendingUp size={48} className="text-gray-300 mb-3" />
                <p className="text-gray-900 font-medium">Belum ada data pertumbuhan</p>
                <p className="text-gray-500 text-sm mt-1">Sistem butuh data transaksi untuk mengkalkulasi pertumbuhan usaha.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
