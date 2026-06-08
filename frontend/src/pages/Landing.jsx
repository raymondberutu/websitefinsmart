import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Shield, Zap, TrendingUp } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-5 flex justify-between items-center relative z-10 border-b border-transparent">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded text-white flex items-center justify-center">
            <TrendingUp size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">FinSmart</span>
        </div>
        <div className="hidden md:flex space-x-10 text-sm font-medium text-gray-500">
          <a href="#" className="text-blue-600">Beranda</a>
          <a href="#fitur" className="hover:text-blue-600 transition-colors">Fitur</a>
          <a href="#tentang" className="hover:text-blue-600 transition-colors">Tentang</a>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors hidden sm:block">
            Masuk
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded transition-all">
            Daftar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-xs font-medium mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Platform FinTech Smart City — Kota Malang
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Analisis Kelayakan Kredit<br/>
            <span className="text-blue-600">UMKM Lebih </span><span className="text-green-600">Cerdas</span>
          </h1>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            FinSmart membantu UMKM Kota Malang mendapatkan akses pembiayaan yang tepat melalui sistem penilaian kredit berbasis data transaksi digital QRIS yang transparan dan akurat.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/login" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded font-bold transition-all flex items-center justify-center gap-2 group">
              Mulai Gratis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#fitur" className="w-full sm:w-auto bg-transparent hover:text-blue-600 text-gray-700 font-bold px-4 py-3 transition-all">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="bg-white py-24 pt-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <p className="text-blue-600 font-bold text-sm mb-3">Fitur Utama</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Semua yang Dibutuhkan<br/>UMKM untuk Akses Kredit</h2>
            <p className="text-gray-500 max-w-2xl text-lg">
              Platform lengkap yang menghubungkan data transaksi digital dengan sistem penilaian kredit yang adil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow flex gap-5">
              <div className="text-blue-600 mt-1">
                <TrendingUp size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Simulasi Kredit Otomatis</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Analisis kelayakan kredit UMKM secara real-time berdasarkan data transaksi QRIS dan profil usaha.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow flex gap-5">
              <div className="text-blue-600 mt-1">
                <BarChart2 size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dashboard Analitik</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Pantau performa UMKM dengan grafik interaktif, distribusi skor kredit, dan data per wilayah Kota Malang.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow flex gap-5">
              <div className="text-blue-600 mt-1">
                <Shield size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sistem Scoring Transparan</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Perhitungan skor kredit berbasis algoritma yang adil dan dapat dipahami oleh semua pelaku usaha.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-shadow flex gap-5">
              <div className="text-blue-600 mt-1">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Proses Cepat & Mudah</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Dapatkan hasil analisis kelayakan kredit dalam hitungan detik tanpa dokumen fisik yang rumit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Section */}
      <section id="tentang" className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 max-w-3xl">
            <p className="text-blue-600 font-bold text-sm mb-3">Cara Kerja</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Empat Langkah Mudah<br/>Menuju Kredit UMKM</h2>
            <p className="text-gray-500 text-lg">
              Proses yang dirancang sederhana agar semua pelaku UMKM dapat mengakses pembiayaan tanpa hambatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-10 right-10 h-0.5 bg-gray-200 z-0"></div>
            <div className="relative z-10 bg-gray-50 pt-2">
              <div className="text-5xl font-black text-blue-100 mb-4">01</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Daftar Akun</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Buat akun UMKM gratis dengan email dan password Anda.</p>
            </div>
            <div className="relative z-10 bg-gray-50 pt-2">
              <div className="text-5xl font-black text-blue-100 mb-4">02</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Isi Data Usaha</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Masukkan informasi usaha: nama, lokasi, jenis, dan pendapatan bulanan.</p>
            </div>
            <div className="relative z-10 bg-gray-50 pt-2">
              <div className="text-5xl font-black text-blue-100 mb-4">03</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Dapatkan Skor Kredit</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Sistem menghitung skor kredit secara otomatis dan menampilkan hasil analisis.</p>
            </div>
            <div className="relative z-10 bg-gray-50 pt-2">
              <div className="text-5xl font-black text-blue-100 mb-4">04</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Ajukan Pembiayaan</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Gunakan hasil skor sebagai referensi pengajuan kredit ke lembaga keuangan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sistem Penilaian Section */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="text-blue-600 font-bold text-sm mb-3">Kategori Kelayakan</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Sistem Penilaian yang Transparan</h2>
            <p className="text-gray-500 text-lg">
              Skor kredit dihitung berdasarkan pendapatan, jenis usaha, dan lokasi. Hasilnya dikategorikan secara jelas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-xl bg-green-50/50 border border-green-200">
              <p className="text-green-700 font-bold text-sm mb-2 uppercase tracking-wide">Sangat Layak</p>
              <h3 className="text-4xl font-black text-green-700 mb-4">80-100</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Rekomendasi pinjaman hingga 3× pendapatan bulanan.</p>
            </div>
            <div className="p-8 rounded-xl bg-blue-50/50 border border-blue-200">
              <p className="text-blue-700 font-bold text-sm mb-2 uppercase tracking-wide">Layak</p>
              <h3 className="text-4xl font-black text-blue-700 mb-4">60-79</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Rekomendasi pinjaman hingga 2,5× pendapatan bulanan.</p>
            </div>
            <div className="p-8 rounded-xl bg-yellow-50/50 border border-yellow-200">
              <p className="text-yellow-700 font-bold text-sm mb-2 uppercase tracking-wide">Cukup Layak</p>
              <h3 className="text-4xl font-black text-yellow-700 mb-4">40-59</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Rekomendasi pinjaman hingga 1,5× pendapatan bulanan.</p>
            </div>
            <div className="p-8 rounded-xl bg-red-50/50 border border-red-200">
              <p className="text-red-700 font-bold text-sm mb-2 uppercase tracking-wide">Tidak Layak</p>
              <h3 className="text-4xl font-black text-red-700 mb-4">0-39</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Disarankan mengikuti program pembinaan UMKM terlebih dahulu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">Mulai Analisis Kredit UMKM Anda Sekarang</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Bergabung dengan ratusan UMKM Kota Malang yang telah memanfaatkan FinSmart untuk mendapatkan akses pembiayaan yang lebih mudah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-transparent border border-white hover:bg-white hover:text-blue-600 text-white font-bold px-8 py-3.5 rounded transition-colors flex items-center justify-center gap-2">
              Daftar Gratis <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto bg-transparent border border-blue-500 hover:border-white text-white font-bold px-8 py-3.5 rounded transition-colors text-center">
              Sudah punya akun? Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded text-white flex items-center justify-center">
              <TrendingUp size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-lg">FinSmart</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 FinSmart. Platform FinTech Smart City UMKM Kota Malang.</p>
          <div className="flex gap-4 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-blue-600">Kebijakan Privasi</a>
            <a href="#" className="hover:text-blue-600">Syarat Penggunaan</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
