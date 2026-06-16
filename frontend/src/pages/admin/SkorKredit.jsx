import { useState, useEffect } from 'react';
import { Calendar, FileBarChart, Download, Loader, User } from 'lucide-react';
import api from '../../lib/axios';

const SkorKredit = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/admin/credit-simulations');
        setHistory(data);
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const handleDownload = (item) => {
    try {
      let details = '';
      if (item.data_input) {
        const input = typeof item.data_input === 'string' ? JSON.parse(item.data_input) : item.data_input;
        details = `
Data UMKM:
- Pendapatan Bulanan: Rp ${input.pendapatan_bulanan || 0}
- Lama Usaha: ${input.lama_usaha || 0} tahun
- Status Tempat Usaha: ${input.status_tempat_usaha || '-'}
- Jumlah Karyawan: ${input.jumlah_karyawan || 0}
`;
      }

      const reportContent = `====================================================
LAPORAN HASIL ANALISIS KELAYAKAN KREDIT - FINSMART
====================================================

INFORMASI ANALISIS
------------------
ID Analisis    : ${item.id}
Tanggal        : ${formatDate(item.created_at)}
Pemilik UMKM   : ${item.user?.name || 'Unknown User'}

HASIL PENILAIAN
---------------
Skor Akhir     : ${item.skor_akhir} / 1000
Status         : ${item.status_kelayakan}

REKOMENDASI SISTEM
------------------
${item.rekomendasi || 'Sistem telah mencatat analisis ini. Terus tingkatkan transaksi QRIS Anda.'}
${details}
====================================================
Dicetak oleh: Admin FinSmart pada ${new Date().toLocaleString('id-ID')}
====================================================
`;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Laporan_Analisis_${item.id}_${item.user?.name || 'UMKM'}.txt`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate report', error);
      alert('Gagal mengunduh laporan. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Skor Kredit UMKM</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau seluruh riwayat analisis kelayakan kredit dari berbagai UMKM.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {history.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {history.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg hidden sm:block"><FileBarChart size={24} /></div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.id}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                      <span className="flex items-center gap-1"><User size={14} /> {item.user?.name || 'Unknown User'}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(item.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Skor</p>
                    <p className="font-bold text-primary">{item.skor_akhir}</p>
                  </div>
                  <div className="text-right w-28">
                    <p className="text-xs text-gray-500 font-medium">Status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold
                      ${item.skor_akhir >= 800 ? 'bg-green-100 text-green-700' : 
                        item.skor_akhir >= 600 ? 'bg-blue-100 text-blue-700' : 
                        item.skor_akhir >= 400 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status_kelayakan}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDownload(item)}
                    title="Download Laporan Admin"
                    className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <FileBarChart size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Riwayat Analisis</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Belum ada satupun UMKM yang melakukan simulasi kelayakan kredit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkorKredit;
