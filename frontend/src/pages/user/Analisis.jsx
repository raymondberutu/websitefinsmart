import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, AlertTriangle, CheckCircle, Target, Loader } from 'lucide-react';
import api from '../../lib/axios';

const Analisis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await api.get('/credit/analysis');
        setAnalysis(data);
      } catch (err) {
        console.error('Failed to fetch analysis', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analisis Kelayakan UMKM</h1>
          <p className="text-gray-500 text-sm mt-1">Detail evaluasi dan metrik kelayakan bisnis Anda secara mendalam.</p>
        </div>
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <Target size={64} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada Analisis Kelayakan</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Anda belum melakukan simulasi kredit. Silakan menuju menu Simulasi Kredit untuk mengisi data usaha dan mendapatkan skor kelayakan Anda.
          </p>
          <a href="/user/simulasi" className="bg-primary hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            Mulai Simulasi Kredit
          </a>
        </div>
      </div>
    );
  }

  const { metrics, skor, status } = analysis;
  
  const data = [
    { name: 'Kesehatan Arus Kas', value: metrics.cashflow, color: '#10B981' },
    { name: 'Kapasitas Bayar', value: metrics.capacity, color: '#3B82F6' },
    { name: 'Profil Risiko', value: metrics.risk, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analisis Kelayakan UMKM</h1>
        <p className="text-gray-500 text-sm mt-1">Detail evaluasi dan metrik kelayakan bisnis Anda secara mendalam.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Indeks Kelayakan</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <span className="text-4xl font-black text-primary">{skor}/1000</span>
            <p className="text-sm font-medium text-green-600 mt-1 flex items-center justify-center gap-1">
              <ShieldCheck size={16} /> {status}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={24} /></div>
            <div>
              <h4 className="text-md font-bold text-gray-900">Kesehatan Arus Kas ({metrics.cashflow}%)</h4>
              <p className="text-sm text-gray-600 mt-1">Berdasarkan rasio pendapatan rata-rata yang Anda masukkan, indikator arus kas Anda berada di angka {metrics.cashflow}%. {metrics.cashflow > 70 ? 'Ini menunjukkan kemampuan yang sangat baik untuk menutupi operasional.' : 'Perlu evaluasi untuk meningkatkan likuiditas kas.'}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Target size={24} /></div>
            <div>
              <h4 className="text-md font-bold text-gray-900">Kapasitas Pembayaran ({metrics.capacity}%)</h4>
              <p className="text-sm text-gray-600 mt-1">Volume transaksi QRIS mencerminkan perputaran dana harian. Skor {metrics.capacity}% {metrics.capacity > 60 ? 'menandakan bahwa Anda memiliki basis transaksi yang stabil untuk mencicil pinjaman.' : 'menunjukkan bahwa aktivitas transaksi masih perlu ditingkatkan agar lebih stabil.'}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><AlertTriangle size={24} /></div>
            <div>
              <h4 className="text-md font-bold text-gray-900">Profil Risiko ({metrics.risk}%)</h4>
              <p className="text-sm text-gray-600 mt-1">Dihitung dari faktor eksternal (Lama Usaha & Status Tempat). Tingkat risiko {metrics.risk}% tergolong {metrics.risk < 40 ? 'Rendah. Usaha Anda cukup mapan.' : 'Sedang/Tinggi. Sebaiknya perkuat ketahanan bisnis jangka panjang.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analisis;
