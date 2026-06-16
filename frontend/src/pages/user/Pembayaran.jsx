import { useState } from 'react';
import { Lock, CheckCircle2, Zap, Droplets, Wifi, Smartphone, Stethoscope, ShoppingBag } from 'lucide-react';
import api from '../../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Pembayaran = () => {
  const { user } = useAuth();
  const [jenisTagihan, setJenisTagihan] = useState('Listrik PLN');
  const [nomorPelanggan, setNominalPelanggan] = useState('');
  const [nominal, setNominal] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Cek Tagihan, 2: Konfirmasi & Bayar
  const navigate = useNavigate();

  const handleCekTagihan = (e) => {
    e.preventDefault();
    if (!nomorPelanggan) return;
    
    // Simulasi Cek Tagihan
    setLoading(true);
    setTimeout(() => {
      // Simulate random tagihan amount
      const randomAmount = Math.floor(Math.random() * 500000) + 50000;
      setNominal(randomAmount.toString());
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleBayar = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user?.pin) {
      setError('Anda belum mengatur PIN Transaksi. Silakan atur di menu Profil terlebih dahulu.');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/wallet/pembayaran', { 
        jenis_tagihan: jenisTagihan,
        nomor_pelanggan: nomorPelanggan,
        nominal: Number(nominal), 
        pin
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Pembayaran gagal diproses');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
        <p className="text-gray-600 mb-6">Tagihan {jenisTagihan} ({nomorPelanggan}) telah berhasil dibayar.</p>
        <Link to="/user/dashboard" className="w-full inline-block bg-primary text-white py-3 rounded-xl font-bold mb-3">
          Selesai
        </Link>
        <button onClick={() => { setSuccess(false); setStep(1); setNominalPelanggan(''); setNominal(''); setPin(''); }} className="w-full inline-block bg-white text-gray-600 border border-gray-200 py-3 rounded-xl font-bold">
          Bayar Tagihan Lain
        </button>
      </div>
    );
  }

  const tagihanOptions = [
    { id: 'Listrik PLN', icon: <Zap className="text-yellow-500"/> },
    { id: 'PDAM / Air', icon: <Droplets className="text-blue-500"/> },
    { id: 'Internet / TV Kabel', icon: <Wifi className="text-purple-500"/> },
    { id: 'Pulsa / Paket Data', icon: <Smartphone className="text-green-500"/> },
    { id: 'BPJS Kesehatan', icon: <Stethoscope className="text-teal-500"/> },
    { id: 'E-Commerce / Belanja', icon: <ShoppingBag className="text-orange-500"/> },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pembayaran Tagihan</h1>
        <p className="text-gray-500 text-sm mt-1">Bayar berbagai tagihan bulanan dengan mudah.</p>
      </div>

      {!user?.pin && (
        <div className="p-4 bg-orange-50 text-orange-800 rounded-xl border border-orange-200 text-sm font-medium flex items-center justify-between">
          <span>Anda harus membuat PIN Transaksi sebelum dapat membayar tagihan.</span>
          <Link to="/user/profil" className="px-3 py-1.5 bg-orange-600 text-white rounded-lg">Buat PIN</Link>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        
        {step === 1 ? (
          <form onSubmit={handleCekTagihan} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Jenis Layanan</label>
              <div className="grid grid-cols-2 gap-3">
                {tagihanOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setJenisTagihan(opt.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${jenisTagihan === opt.id ? 'border-primary bg-blue-50/50 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    {opt.icon}
                    <span className="text-sm font-medium text-gray-800">{opt.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Nomor Pelanggan / Tagihan</label>
              <input 
                type="text" 
                required
                value={nomorPelanggan}
                onChange={(e) => setNominalPelanggan(e.target.value)}
                placeholder="Masukkan nomor identitas pelanggan"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !nomorPelanggan}
              className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading ? 'Mengecek...' : 'Cek Tagihan'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleBayar} className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Detail Tagihan</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Layanan</span>
                  <span className="font-bold text-gray-900">{jenisTagihan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">No Pelanggan</span>
                  <span className="font-bold text-gray-900">{nomorPelanggan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Nama Pelanggan</span>
                  <span className="font-bold text-gray-900">{user?.name}</span>
                </div>
                <hr className="border-gray-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-bold">Total Tagihan</span>
                  <span className="text-2xl font-bold text-primary">Rp {Number(nominal).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Lock size={16} className="text-gray-500"/> PIN Transaksi
              </label>
              <input 
                type="password" 
                required
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-center tracking-[1em] text-xl font-bold"
              />
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => { setStep(1); setPin(''); }}
                className="w-1/3 bg-white text-gray-700 border border-gray-200 font-bold py-4 rounded-xl transition-all hover:bg-gray-50"
              >
                Batal
              </button>
              <button 
                type="submit" 
                disabled={loading || pin.length !== 6 || !user?.pin}
                className="w-2/3 bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
              >
                {loading ? 'Memproses...' : 'Bayar Sekarang'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Pembayaran;
