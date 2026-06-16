import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const Panduan = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const guides = [
    {
      title: "Mulai Menggunakan FinSmart",
      content: "Selamat datang di FinSmart! Langkah pertama yang harus Anda lakukan adalah melengkapi Profil Anda. Buka menu 'Profil Saya' dan isikan informasi dasar Anda. Informasi ini sangat penting karena digunakan untuk mengelola data akun Anda."
    },
    {
      title: "Menggunakan E-Wallet (Dompet Digital)",
      content: "FinSmart dilengkapi dengan dompet digital bawaan. Untuk mengisi saldo, gunakan menu 'Top Up Saldo' dan pilih metode (QRIS, VA Bank, dll). Anda dapat melakukan 'Transfer Dana' ke pengguna lain, atau membayar tagihan (Listrik, Pulsa) melalui menu 'Bayar Tagihan'. Semua transaksi tercatat otomatis di 'Riwayat E-Wallet'."
    },
    {
      title: "Simulasi Kelayakan Kredit",
      content: "Untuk mengetahui kelayakan usaha Anda, buka menu 'Simulasi Kredit'. Masukkan data pendapatan, transaksi, lama usaha, jumlah karyawan, dan status tempat. Sistem kami menggunakan algoritma khusus untuk menghasilkan Skor Kelayakan (0-1000) yang akan menentukan status dan estimasi plafon pinjaman Anda."
    },
    {
      title: "Membaca Analisis & Rekomendasi",
      content: "Setelah melakukan simulasi, hasil analisis mendalam (Kesehatan Arus Kas, Kapasitas Bayar, Profil Risiko) dapat dilihat pada menu 'Analisis Kelayakan'. Selanjutnya, buka 'Rekomendasi Pendanaan' untuk melihat produk pinjaman (Bank/P2P) yang persentase kecocokannya paling sesuai dengan skor Anda."
    },
    {
      title: "Melihat Riwayat Analisis",
      content: "Anda tidak perlu khawatir kehilangan data kalkulasi. Setiap kali Anda menekan 'Hitung Skor Sekarang' pada Simulasi Kredit, hasilnya akan tersimpan di menu 'Riwayat Analisis' sehingga Anda bisa memonitor perkembangan skor bisnis Anda dari waktu ke waktu."
    },
    {
      title: "Mencatat Data Transaksi QRIS",
      content: "Masuk ke menu 'Data Transaksi QRIS' untuk mencatat secara manual transaksi bisnis Anda. Anda juga bisa mengunduh rekap transaksi Anda dalam format Excel (.xlsx) atau PDF melalui tombol Export di halaman Laporan Keuangan untuk diserahkan kepada pihak Bank."
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
