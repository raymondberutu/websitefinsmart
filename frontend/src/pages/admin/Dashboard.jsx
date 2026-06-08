import { useState, useEffect } from 'react';
import { Users, Store, CreditCard, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../lib/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    umkms: 0,
    transaksi: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, umkmsRes, trxRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/umkm'),
          api.get('/transaksi')
        ]);
        setStats({
          users: usersRes.data.length,
          umkms: umkmsRes.data.length,
          transaksi: trxRes.data.length,
        });
      } catch (error) {
        console.error('Failed to fetch admin stats');
      }
    };
    fetchStats();
  }, []);

  const chartData = [
    { name: 'Jan', umkm: 120, transaksi: 400 },
    { name: 'Feb', umkm: 150, transaksi: 600 },
    { name: 'Mar', umkm: 200, transaksi: 800 },
    { name: 'Apr', umkm: 280, transaksi: 1200 },
    { name: 'Mei', umkm: 350, transaksi: 1600 },
    { name: 'Jun', umkm: 450, transaksi: 2100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan statistik ekosistem FinSmart.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="bg-blue-50 p-4 rounded-full text-blue-600"><Store size={24} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total UMKM</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.umkms}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-green-500">
          <div className="bg-green-50 p-4 rounded-full text-green-600"><CreditCard size={24} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Transaksi</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.transaksi}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-purple-500">
          <div className="bg-purple-50 p-4 rounded-full text-purple-600"><Users size={24} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pengguna Aktif</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.users}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-red-500">
          <div className="bg-red-50 p-4 rounded-full text-red-600"><AlertCircle size={24} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Laporan Kelayakan</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Pertumbuhan Ekosistem UMKM</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUmkm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTransaksi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Area type="monotone" dataKey="transaksi" stroke="#10B981" fillOpacity={1} fill="url(#colorTransaksi)" />
              <Area type="monotone" dataKey="umkm" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUmkm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
