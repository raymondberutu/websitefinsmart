import { Link } from 'react-router-dom';
import { 
  ArrowRight, BarChart2, Shield, Zap, TrendingUp, 
  Wallet, CreditCard, Smartphone, CheckCircle, 
  Gift, Percent, HelpCircle, Phone, Mail, MapPin 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import dashboardImg from '../assets/dashboard-finsmart.jpg';

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang', href: '#tentang' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Simulasi Kredit', href: '#simulasi' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Promo', href: '#promo' },
    { name: 'Bantuan', href: '#bantuan' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded text-white flex items-center justify-center">
              <TrendingUp size={20} strokeWidth={3} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">FinSmart</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-primary hover:bg-blue-800 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all shadow-sm hover:shadow">
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 font-medium hover:text-primary">
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
              <Link to="/login" className="text-center font-bold text-gray-700 py-2 border rounded-lg">Login</Link>
              <Link to="/register" className="text-center font-bold text-white bg-primary py-2 rounded-lg">Register</Link>
            </div>
          </div>
        )}
      </nav>

      {/* 1. Beranda (Hero) */}
      <section id="beranda" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50/50">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-primary text-xs font-bold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Platform FinTech UMKM Cerdas
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Masa Depan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Keuangan UMKM</span> Ada di Sini
          </h1>
          
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            FinSmart memberikan Anda kendali penuh atas keuangan bisnis. Mulai dari E-Wallet, Analisis Kredit, hingga Pencatatan Transaksi otomatis.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1">
              Buka Akun Sekarang <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#layanan" className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl transition-all shadow-sm">
              Jelajahi Fitur
            </a>
          </div>
        </div>
      </section>

      {/* 2. Tentang FinSmart */}
      <section id="tentang" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform -rotate-3 scale-105 -z-10"></div>
              <img src="/tentang-finsmart.jpg" alt="Tentang FinSmart" className="rounded-3xl shadow-xl object-cover h-[400px] w-full" />
            </div>
            <div>
              <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest">Tentang Kami</p>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Visi Misi Mendorong Kemajuan UMKM</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                FinSmart lahir dari kesadaran bahwa masih banyak UMKM yang kesulitan mengakses layanan keuangan modern dan permodalan dari perbankan. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Digitalisasi Transaksi:</strong> Membawa UMKM masuk ke ekosistem pembayaran digital (QRIS).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Akses Permodalan:</strong> Menjembatani UMKM dengan bank melalui skor kredit yang valid.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                  <span className="text-gray-700"><strong>Edukasi Finansial:</strong> Memberikan panduan dan literasi keuangan berkelanjutan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Layanan Fintech */}
      <section id="layanan" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest">Layanan Utama</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Solusi FinTech Menyeluruh</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">FinSmart menyediakan ekosistem dompet digital (E-Wallet) dan alat manajemen kas untuk memudahkan perputaran uang usaha Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Wallet size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-Wallet & Top Up</h3>
              <p className="text-gray-600 leading-relaxed">Simpan dana operasional usaha dengan aman. Lakukan isi saldo (Top Up) melalui berbagai bank dan metode instan.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pembayaran Tagihan</h3>
              <p className="text-gray-600 leading-relaxed">Bayar tagihan utilitas seperti Listrik PLN, Air PDAM, dan Internet dengan satu ketukan dari aplikasi.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transfer Dana Instan</h3>
              <p className="text-gray-600 leading-relaxed">Kirim uang ke sesama pengguna FinSmart atau antar bank secara real-time tanpa biaya tersembunyi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simulasi Kredit */}
      <section id="simulasi" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-6">
                  <Shield size={14} /> Teknologi AI Scoring
                </div>
                <h2 className="text-4xl font-extrabold mb-6 leading-tight">Ukur Kelayakan Bisnis Anda Secara Instan</h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Tidak perlu menunggu lama. Masukkan data profil usaha dan transaksi Anda, lalu biarkan algoritma kami menghitung Skor Kredit dan memberikan analisis mendalam secara real-time.
                </p>
                <Link to="/register" className="inline-block bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                  Coba Simulasi Sekarang
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-bold mb-6 text-center">Faktor Penilaian</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                    <span>Kesehatan Arus Kas</span>
                    <span className="font-bold text-green-400">Tinggi</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                    <span>Kapasitas Bayar (QRIS)</span>
                    <span className="font-bold text-blue-300">Stabil</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                    <span>Profil Risiko Usaha</span>
                    <span className="font-bold text-yellow-300">Menengah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dashboard Analitik */}
      <section id="dashboard" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest">Dashboard & Pelaporan</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Analitik Cerdas di Ujung Jari</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Ubah data transaksi menjadi wawasan bisnis yang berharga. Pantau performa keuangan melalui grafik dan laporan terpadu.</p>
          </div>
          
          <div className="bg-white p-2 md:p-4 rounded-3xl shadow-xl border border-gray-100 max-w-5xl mx-auto">
            <img src={dashboardImg} alt="Dashboard Analitik FinSmart" className="w-full h-auto rounded-2xl shadow-sm border border-gray-200" />
          </div>
        </div>
      </section>

      {/* 6. Promo & Program */}
      <section id="promo" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-primary font-bold text-sm mb-2 uppercase tracking-widest">Penawaran Spesial</p>
              <h2 className="text-4xl font-extrabold text-gray-900">Promo & Program</h2>
            </div>
            <Link to="/register" className="hidden sm:flex text-primary font-bold items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 flex items-center justify-between">
              <div>
                <div className="text-orange-600 bg-orange-100 w-max px-3 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-1">
                  <Percent size={14} /> Cashback 50%
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Up Pertama</h3>
                <p className="text-gray-600 mb-6">Dapatkan cashback langsung untuk isi saldo E-Wallet pertama Anda.</p>
                <Link to="/register" className="text-orange-600 font-bold hover:underline">Klaim Promo</Link>
              </div>
              <Gift size={100} className="text-orange-200 opacity-50" />
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 flex items-center justify-between">
              <div>
                <div className="text-blue-600 bg-blue-100 w-max px-3 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-1">
                  <Zap size={14} /> Bebas Biaya
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Gratis Transfer Antar Bank</h3>
                <p className="text-gray-600 mb-6">Nikmati kuota 10x gratis transfer ke semua bank setiap bulannya.</p>
                <Link to="/register" className="text-blue-600 font-bold hover:underline">Pelajari Lanjut</Link>
              </div>
              <Wallet size={100} className="text-blue-200 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bantuan & FAQ */}
      <section id="bantuan" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <HelpCircle size={48} className="text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Pusat Bantuan</h2>
            <p className="text-gray-500 text-lg">Temukan jawaban atas pertanyaan yang sering diajukan seputar FinSmart.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Apakah FinSmart aman digunakan?', a: 'Ya, kami menggunakan enkripsi standar perbankan untuk menjaga keamanan data dan saldo Anda.' },
              { q: 'Bagaimana cara menaikkan Skor Kredit?', a: 'Tingkatkan intensitas penggunaan QRIS dan catat transaksi dengan disiplin. Sistem akan membaca peningkatan stabilitas kas Anda.' },
              { q: 'Apakah ada biaya bulanan?', a: 'Tidak. Aplikasi FinSmart 100% gratis digunakan oleh UMKM. Kami hanya mengenakan biaya standar untuk transaksi tertentu.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Kontak Kami */}
      <section id="kontak" className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Hubungi Tim Kami</h2>
              <p className="text-gray-500 text-lg mb-10">Tim Customer Success kami siap membantu segala kendala operasional Anda dari hari Senin-Jumat, 12:00-22:00 WIB</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Telepon / WhatsApp</p>
                    <p className="font-bold text-gray-900 text-lg">+62 82298216134</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email Support</p>
                    <p className="font-bold text-gray-900 text-lg">raymondberutu@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Kirim Pesan</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full border-gray-300 border rounded-lg p-3 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border-gray-300 border rounded-lg p-3 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                  <textarea rows="4" className="w-full border-gray-300 border rounded-lg p-3 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <button type="button" onClick={() => alert('Pesan telah terkirim!')} className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors">
                  Kirim Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded text-white flex items-center justify-center">
                <TrendingUp size={20} strokeWidth={3} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">FinSmart</span>
            </div>
            <div className="flex gap-6 font-medium">
              <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
              <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
              <a href="#simulasi" className="hover:text-white transition-colors">Simulasi</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 FinSmart. Platform FinTech Cerdas UMKM Kota Malang.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat Penggunaan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
