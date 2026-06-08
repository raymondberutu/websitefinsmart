import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, AlertTriangle, CheckCircle, Target } from 'lucide-react';

const Analisis = () => {
  const data = [
    { name: 'Kesehatan Arus Kas', value: 85, color: '#10B981' },
    { name: 'Kapasitas Bayar', value: 75, color: '#3B82F6' },
    { name: 'Profil Risiko', value: 25, color: '#EF4444' } // Risk is low but shown as a slice
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analisis Kelayakan UMKM</h1>
        <p className="text-gray-500 text-sm mt-1">Detail evaluasi dan metrik kelayakan bisnis Anda secara mendalam.</p>
      </div>

      {!localStorage.getItem('riwayat_simulasi') ? (
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
      ) : (
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
            <span className="text-4xl font-black text-primary">85/100</span>
            <p className="text-sm font-medium text-green-600 mt-1 flex items-center justify-center gap-1">
              <ShieldCheck size={16} /> Sangat Sehat
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={24} /></div>
            <div>
              <h4 className="text-md font-bold text-gray-900">Kesehatan Arus Kas (Sangat Baik)</h4>
              <p className="text-sm text-gray-600 mt-1">Rasio pendapatan bersih terhadap pengeluaran operasional Anda berada pada tingkat optimal (margin &gt; 30%). Ini menunjukkan efisiensi operasional yang baik.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Target size={24} /></div>
            <div>
              <h4 className="text-md font-bold text-gray-900">Kapasitas Pembayaran (Baik)</h4>
              <p className="text-sm text-gray-600 mt-1">Berdasarkan data transaksi QRIS bulanan, usaha Anda memiliki likuiditas yang cukup untuk membayar cicilan bulanan hingga Rp 3.000.000.</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><AlertTriangle size={24} /></div>
            <div>
              <h4 className="text-md font-bold text-gray-900">Profil Risiko (Sedang)</h4>
              <p className="text-sm text-gray-600 mt-1">Usaha Anda memiliki sedikit volatilitas pada transaksi akhir pekan. Disarankan untuk menyediakan dana cadangan minimal 2x biaya operasional bulanan.</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Analisis;
