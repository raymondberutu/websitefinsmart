import { Mail, Phone, MessageSquare, Clock, MapPin, LifeBuoy } from 'lucide-react';

const Bantuan = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <LifeBuoy size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Pusat Bantuan FinSmart</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Kami siap membantu Anda. Jika Anda mengalami kendala teknis atau memiliki pertanyaan seputar aplikasi, silakan hubungi tim Customer Service kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Email Support</h3>
            <p className="text-gray-500 text-sm mb-2">Kirimkan pertanyaan detail Anda melalui email.</p>
            <a href="mailto:raymondberutu@gmail.com" className="text-primary font-medium hover:underline">
              raymondberutu@gmail.com
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">WhatsApp CS</h3>
            <p className="text-gray-500 text-sm mb-2">Chat langsung dengan tim dukungan kami.</p>
            <a href="https://wa.me/6282298216134" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              0822 9821 6134
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Layanan Telepon</h3>
            <p className="text-gray-500 text-sm mb-2">Hubungi kami untuk penanganan darurat.</p>
            <a href="tel:0882015050541" className="text-primary font-medium hover:underline">
              0882 0150 50541
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-blue-600 p-6 rounded-xl shadow-sm border border-blue-700 flex items-start gap-4 text-white transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Jam Operasional</h3>
            <p className="text-blue-100 text-sm mb-2">Customer Service beroperasi pada:</p>
            <p className="font-semibold text-lg">Senin – Jumat</p>
            <p className="font-medium text-blue-50">12.00 - 22.00 WIB</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Troubleshooting (Permasalahan Umum)</h3>
          <p className="text-gray-500 mt-2">
            Panduan cepat untuk mengatasi kendala yang paling sering terjadi.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {/* Tidak Bisa Login */}
          <div className="p-6 sm:p-8 hover:bg-gray-50 transition-colors">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm">1</span>
              Tidak Bisa Login
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-10">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Penyebab:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Salah password</li>
                  <li>Akun belum aktif</li>
                  <li>Koneksi internet bermasalah</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Solusi:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Gunakan fitur lupa password</li>
                  <li>Periksa koneksi internet</li>
                  <li>Hubungi customer service</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transaksi Pending */}
          <div className="p-6 sm:p-8 hover:bg-gray-50 transition-colors">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">2</span>
              Transaksi Pending
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-10">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Penyebab:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Gangguan sistem</li>
                  <li>Koneksi tidak stabil</li>
                  <li>Proses verifikasi bank</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Solusi:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Tunggu beberapa menit</li>
                  <li>Refresh halaman</li>
                  <li>Cek status transaksi kembali</li>
                </ul>
              </div>
            </div>
          </div>

          {/* OTP Tidak Masuk */}
          <div className="p-6 sm:p-8 hover:bg-gray-50 transition-colors">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
              OTP Tidak Masuk
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-10">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Penyebab:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Nomor tidak aktif</li>
                  <li>Gangguan jaringan operator</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Solusi:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Pastikan nomor aktif</li>
                  <li>Klik kirim ulang OTP</li>
                  <li>Hubungi layanan bantuan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bantuan;
