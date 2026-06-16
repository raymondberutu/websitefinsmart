import { useState, useEffect } from 'react';
import { Download, FileText, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../lib/axios';

const Laporan = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ pemasukan: 0, pengeluaran: 0, saldo: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // Fetch both QRIS business transactions and E-Wallet personal transactions
      const [qrisRes, walletRes] = await Promise.all([
        api.get('/transaksi').catch(() => ({ data: [] })),
        api.get('/wallet/riwayat').catch(() => ({ data: [] }))
      ]);

      const qrisData = qrisRes.data.map(trx => ({
        ...trx,
        source: 'QRIS',
        kategori: trx.jenis === 'pemasukan' ? 'pemasukan' : 'pengeluaran',
        tanggal_format: trx.tanggal
      }));

      const walletData = walletRes.data.map(trx => {
        const isPemasukan = ['top_up', 'transfer_in'].includes(trx.tipe);
        return {
          id: `WLT-${trx.id}`,
          tanggal: trx.created_at,
          tanggal_format: new Date(trx.created_at).toISOString().split('T')[0],
          jenis: isPemasukan ? 'pemasukan' : 'pengeluaran',
          kategori: isPemasukan ? 'pemasukan' : 'pengeluaran',
          nominal: trx.nominal,
          metode_pembayaran: 'E-Wallet',
          status: trx.status,
          source: 'Wallet',
          deskripsi: trx.deskripsi
        };
      });

      const merged = [...qrisData, ...walletData].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      
      setTransactions(merged);
      calculateSummary(merged);
      prepareChartData(merged);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

  const calculateSummary = (data) => {
    let pemasukan = 0;
    let pengeluaran = 0;
    
    data.forEach(trx => {
      if (trx.status === 'Berhasil') {
        if (trx.jenis === 'pengeluaran') {
          pengeluaran += parseFloat(trx.nominal);
        } else {
          pemasukan += parseFloat(trx.nominal);
        }
      }
    });

    setSummary({ pemasukan, pengeluaran, saldo: pemasukan - pengeluaran });
  };

  const prepareChartData = (data) => {
    // Group by month
    const grouped = {};
    data.forEach(trx => {
      if (trx.status !== 'Berhasil') return;
      const month = new Date(trx.tanggal).toLocaleString('default', { month: 'short' });
      if (!grouped[month]) {
        grouped[month] = { name: month, Pemasukan: 0, Pengeluaran: 0 };
      }
      if (trx.jenis === 'pengeluaran') {
        grouped[month].Pengeluaran += parseFloat(trx.nominal);
      } else {
        grouped[month].Pemasukan += parseFloat(trx.nominal);
      }
    });
    
    setChartData(Object.values(grouped).reverse());
  };

  const handleExportCSV = () => {
    try {
      if (transactions.length === 0) {
        alert('Tidak ada data transaksi untuk diexport.');
        return;
      }

      const headers = ['ID', 'Tanggal', 'Sumber', 'Jenis', 'Nominal (Rp)', 'Metode/Referensi', 'Status', 'Deskripsi'];
      const rows = transactions.map(trx => [
        trx.id,
        trx.tanggal_format || trx.tanggal,
        trx.source || 'QRIS',
        trx.jenis,
        trx.nominal,
        trx.metode_pembayaran,
        trx.status,
        `"${trx.deskripsi || '-'}"`
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(e => e.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'Laporan_Keuangan_Terpadu_FinSmart.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed', error);
      alert('Gagal membuat file Excel/CSV.');
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const pieData = [
    { name: 'Pemasukan', value: summary.pemasukan, color: '#10B981' },
    { name: 'Pengeluaran', value: summary.pengeluaran, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Keuangan</h1>
          <p className="text-gray-500 text-sm mt-1">Ringkasan pemasukan, pengeluaran, dan analisis transaksi.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download size={18} /> Export Excel
          </button>
          <button onClick={handleExportPDF} className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <FileText size={18} /> Export PDF
          </button>
        </div>
      </div>

      <div className="print:block hidden mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Laporan Keuangan UMKM</h1>
        <p className="text-gray-500">Dicetak pada: {new Date().toLocaleString('id-ID')}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Pemasukan</p>
            <p className="text-2xl font-bold text-gray-900">Rp {summary.pemasukan.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Pengeluaran</p>
            <p className="text-2xl font-bold text-gray-900">Rp {summary.pengeluaran.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Saldo Bersih</p>
            <p className={`text-2xl font-bold ${summary.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Rp {summary.saldo.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Monitoring Pemasukan vs Pengeluaran</h3>
          <div className="h-72 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `Rp${value/1000}k`} />
                  <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                  <Legend />
                  <Bar dataKey="Pemasukan" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Pengeluaran" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Belum ada data transaksi untuk ditampilkan
              </div>
            )}
          </div>
        </div>

        {/* Pie Chart / Analisis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Distribusi Keuangan</h3>
          <div className="h-48 w-full mb-4">
            {summary.pemasukan > 0 || summary.pengeluaran > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Tidak ada data
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-gray-600">Pemasukan</span>
              </div>
              <span className="font-medium text-gray-900">
                {summary.pemasukan + summary.pengeluaran > 0 
                  ? Math.round((summary.pemasukan / (summary.pemasukan + summary.pengeluaran)) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-gray-600">Pengeluaran</span>
              </div>
              <span className="font-medium text-gray-900">
                {summary.pemasukan + summary.pengeluaran > 0 
                  ? Math.round((summary.pengeluaran / (summary.pemasukan + summary.pengeluaran)) * 100) 
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
