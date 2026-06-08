import { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

const SimulasiKredit = () => {
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSimulasi = (e) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Simulasi Kelayakan Kredit</h1>
        <p className="text-gray-500 text-sm mt-1">
          Hitung estimasi skor kredit dan kelayakan pendanaan UMKM Anda berdasarkan data operasional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Simulasi */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-blue-50 text-primary rounded-lg">
              <Calculator size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Form Parameter Penilaian</h2>
          </div>

          <form onSubmit={handleSimulasi} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pendapatan Rata-rata/Bulan</label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-gray-500 font-medium">Rp</span>
                  <input 
                    type="number" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="5000000"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Transaksi QRIS/Bulan</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: 150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lama Usaha Berjalan (Bulan)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: 24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Karyawan</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: 3"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Tempat Usaha</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
                  <option value="Milik Sendiri">Milik Sendiri</option>
                  <option value="Sewa">Sewa</option>
                  <option value="Menumpang">Menumpang / Milik Keluarga</option>
                </select>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-md shadow-blue-200"
              >
                Hitung Skor Sekarang
              </button>
            </div>
          </form>
        </div>

        {/* Hasil Simulasi */}
        <div className="lg:col-span-5">
          {isCalculated ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CheckCircle2 size={120} className="text-green-500" />
              </div>
              
              <h2 className="text-lg font-bold text-gray-900 mb-6">Hasil Analisis Credit Scoring</h2>
              
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-gray-500 mb-2">Skor Anda</p>
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-green-500 bg-green-50 text-4xl font-black text-green-700">
                  825
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Kategori Kelayakan</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">Sangat Layak</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Estimasi Plafon Pinjaman</span>
                  <span className="text-sm font-bold text-gray-900">Rp 10.000.000 - Rp 25.000.000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">Rekomendasi Bunga</span>
                  <span className="text-sm font-bold text-gray-900">0.9% - 1.2% per bulan</span>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md shadow-green-200">
                  Ajukan Pembiayaan
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <AlertCircle size={40} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Belum Ada Perhitungan</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Silakan isi form parameter di samping dan klik "Hitung Skor Sekarang" untuk melihat hasil kelayakan Anda.
              </p>
            </div>
          )}

          {/* Kategori Kelayakan Kredit Info Box */}
          <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-blue-500" /> Kategori Kelayakan Kredit
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Sangat Layak</span>
                <span className="font-medium text-gray-600">800 - 1000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Layak</span>
                <span className="font-medium text-gray-600">600 - 799</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Kurang Layak</span>
                <span className="font-medium text-gray-600">400 - 599</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Tidak Layak</span>
                <span className="font-medium text-gray-600">0 - 399</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Skor kredit ini adalah simulasi berbasis Algoritma Alternative Credit Scoring FinSmart. Kategori ini digunakan sebagai salah satu pertimbangan dalam persetujuan limit pendanaan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulasiKredit;
