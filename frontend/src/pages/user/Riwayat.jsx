import { Calendar, FileBarChart, Download } from 'lucide-react';

const Riwayat = () => {
  const hasSimulated = localStorage.getItem('riwayat_simulasi');
  const history = hasSimulated ? [
    { id: 'SIM-001', date: new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'}), score: 785, status: 'Sangat Layak', limit: 'Rp 25 Juta' },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Analisis</h1>
        <p className="text-gray-500 text-sm mt-1">Rekam jejak simulasi kelayakan kredit Anda dari waktu ke waktu.</p>
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
                    <div className="flex items-center text-sm text-gray-500 mt-1 gap-1">
                      <Calendar size={14} /> {item.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Skor</p>
                    <p className="font-bold text-primary">{item.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Status</p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold
                      ${item.score >= 800 ? 'bg-green-100 text-green-700' : 
                        item.score >= 700 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status}
                    </span>
                  </div>
                  <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm">
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
            <p className="text-gray-500 max-w-md mx-auto">
              Semua simulasi dan analisis kelayakan yang Anda lakukan akan tersimpan di sini sebagai rekam jejak historis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Riwayat;
