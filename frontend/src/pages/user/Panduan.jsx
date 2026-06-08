import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const Panduan = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const guides = [
    {
      title: "Mulai Menggunakan FinSmart",
      content: "Selamat datang di FinSmart! Langkah pertama yang harus Anda lakukan adalah melengkapi Profil UMKM Anda. Buka menu 'Profil Saya' dan isikan informasi dasar tentang bisnis Anda. Informasi ini sangat penting karena digunakan untuk mengkalkulasi Skor Kelayakan Kredit Anda nantinya."
    },
    {
      title: "Cara Mencatat Transaksi QRIS",
      content: "Untuk mencatat penjualan, masuk ke menu 'Data Transaksi QRIS'. Klik tombol 'Tambah Transaksi', lalu masukkan tanggal, nominal, metode pembayaran (misal: QRIS, Transfer, atau Tunai), serta statusnya. Seluruh catatan ini akan otomatis diakumulasi dan bisa Anda pantau perkembangannya di halaman Dashboard."
    },
    {
      title: "Membaca Analisis Kelayakan",
      content: "Menu 'Analisis Kelayakan' adalah fitur pintar yang mengukur kesehatan bisnis Anda. AI kami akan memberikan Skor Kredit dari skala 1-100. Jika skor Anda di atas 700, status Anda menjadi 'Sangat Layak' untuk mengajukan pinjaman bank. Pastikan untuk mencatat transaksi dengan jujur agar analisisnya akurat."
    },
    {
      title: "Simulasi Kredit Bank",
      content: "Ingin tahu berapa cicilan per bulan jika Anda meminjam modal? Buka menu 'Simulasi Kredit'. Masukkan jumlah pinjaman yang Anda inginkan, suku bunga per tahun, dan lama tenor (bulan). Sistem kami akan langsung menghitung estimasi cicilan per bulan untuk Anda."
    },
    {
      title: "Mengunduh Laporan Keuangan",
      content: "Anda bisa mengunduh rekap transaksi Anda kapan saja. Masuk ke halaman Dashboard, lalu klik tombol biru 'Download Laporan' di pojok kanan atas. Sistem akan membuatkan file berformat CSV yang bisa Anda buka di Microsoft Excel, siap diserahkan kepada pihak Bank jika diperlukan."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buku Panduan Website</h1>
        <p className="text-gray-500 text-sm mt-1">Pelajari cara memaksimalkan seluruh fitur FinSmart untuk bisnis Anda.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex items-center gap-4">
          <div className="bg-white p-3 rounded-full text-primary shadow-sm">
            <BookOpen size={28} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Pusat Bantuan UMKM</h2>
            <p className="text-sm text-gray-600">Temukan jawaban untuk semua pertanyaan Anda di bawah ini.</p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {guides.map((guide, index) => (
            <div key={index} className="p-2">
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className={openIndex === index ? "text-primary" : "text-gray-400"} />
                  <span className={`font-semibold ${openIndex === index ? "text-primary" : "text-gray-700"}`}>
                    {guide.title}
                  </span>
                </div>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-primary" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-11 pr-4 pb-5 pt-1 text-gray-600 text-sm leading-relaxed">
                  {guide.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Panduan;
