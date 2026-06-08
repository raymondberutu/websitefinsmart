import { useState, useEffect } from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import api from '../../lib/axios';

const Laporan = () => {
  const [stats, setStats] = useState({ total_trx: 0, total_nominal: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/transaksi');
      setStats({
        total_trx: data.length,
        total_nominal: data.reduce((sum, trx) => sum + Number(trx.nominal), 0)
      });
    } catch (e) {
      console.error('Failed fetching data', e);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get('/transaksi/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan_global_finsmart_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Gagal mendownload laporan');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Laporan & Export Data</h1>
        <p className="text-gray-500 text-sm mt-1">Unduh laporan rekapitulasi performa seluruh UMKM di sistem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full text-primary mb-4">
            <FileText size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Export Data Transaksi (CSV)</h3>
          <p className="text-gray-500 text-sm mb-6">
            Unduh seluruh riwayat transaksi QRIS dari semua UMKM. File ini dapat dibuka menggunakan Microsoft Excel atau Google Sheets.
          </p>
          <button 
            onClick={handleDownload}
            className="w-full sm:w-auto bg-primary hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} /> Download Laporan Sekarang
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Ringkasan Saat Ini</h3>
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600">Total Transaksi Tercatat</span>
            <span className="font-bold text-gray-900">{stats.total_trx} Trx</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600">Total Perputaran Uang</span>
            <span className="font-bold text-green-600">Rp {stats.total_nominal.toLocaleString('id-ID')}</span>
          </div>
          
          <div className="mt-8 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Filter size={16}/> Filter Export (Segera Hadir)
            </label>
            <div className="flex gap-2">
              <input type="date" disabled className="border rounded px-3 py-2 text-sm bg-gray-50 text-gray-400 w-full cursor-not-allowed" />
              <span className="py-2 text-gray-400">-</span>
              <input type="date" disabled className="border rounded px-3 py-2 text-sm bg-gray-50 text-gray-400 w-full cursor-not-allowed" />
            </div>
            <p className="text-xs text-gray-400 mt-2">*Saat ini export akan mengunduh seluruh data tanpa filter waktu.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
