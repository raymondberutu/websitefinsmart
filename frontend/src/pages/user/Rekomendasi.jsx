import { Building2, Percent, CheckCircle, ChevronRight } from 'lucide-react';

const Rekomendasi = () => {
  const recommendations = [
    { id: 1, bank: 'Bank Rakyat Indonesia (BRI)', product: 'KUR Mikro BRI', rate: '0.2%', limit: 'S.d Rp 50 Juta', matched: 98 },
    { id: 2, bank: 'Bank Mandiri', product: 'Kredit Usaha Mikro', rate: '0.5%', limit: 'S.d Rp 25 Juta', matched: 85 },
    { id: 3, bank: 'Amartha FinTech', product: 'Modal Kerja Syariah', rate: '1.1%', limit: 'S.d Rp 15 Juta', matched: 72 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Pendanaan</h1>
        <p className="text-gray-500 text-sm mt-1">Produk pinjaman dan permodalan yang paling sesuai dengan skor kredit Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-gray-50 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Building2 size={24} /></div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">
                  <CheckCircle size={14} /> {item.matched}% Cocok
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{item.product}</h3>
              <p className="text-sm text-gray-500 mb-4">{item.bank}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Percent size={18} className="text-gray-400" />
                  <span>Bunga: <strong className="text-gray-900">{item.rate} / bulan</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-[18px] h-[18px] flex items-center justify-center font-serif italic text-gray-400">Rp</div>
                  <span>Plafon: <strong className="text-gray-900">{item.limit}</strong></span>
                </div>
              </div>
            </div>
            <button className="bg-gray-50 hover:bg-primary hover:text-white text-primary font-medium p-4 transition-colors flex items-center justify-center gap-2">
              Ajukan Sekarang <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rekomendasi;
