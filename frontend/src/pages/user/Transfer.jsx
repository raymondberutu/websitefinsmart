import { useState, useEffect } from 'react';
import { Send, Lock, CheckCircle2, User as UserIcon } from 'lucide-react';
import api from '../../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Transfer = () => {
  const { user } = useAuth();
  const [tujuan, setTujuan] = useState('');
  const [nominal, setNominal] = useState('');
  const [catatan, setCatatan] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user?.pin) {
      setError('Anda belum mengatur PIN Transaksi. Silakan atur di menu Profil terlebih dahulu.');
      return;
    }

    setLoading(true);
    
    try {
      await api.post('/wallet/transfer', { 
        tujuan,
        nominal: Number(nominal.replace(/\D/g, '')), 
        catatan,
        pin
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal melakukan transfer');
    } finally {
      setLoading(false);
    }
  };

  const formatRupiahInput = (value) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('id-ID').format(number);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Berhasil!</h2>
        <p className="text-gray-600 mb-6">Dana telah berhasil dikirim ke {tujuan}.</p>
        <Link to="/user/dashboard" className="w-full inline-block bg-primary text-white py-3 rounded-xl font-bold mb-3">
          Selesai
        </Link>
        <button onClick={() => { setSuccess(false); setTujuan(''); setNominal(''); setCatatan(''); setPin(''); }} className="w-full inline-block bg-white text-gray-600 border border-gray-200 py-3 rounded-xl font-bold">
          Transfer Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transfer Dana</h1>
        <p className="text-gray-500 text-sm mt-1">Kirim saldo ke sesama pengguna FinSmart dengan aman.</p>
      </div>

      {!user?.pin && (
        <div className="p-4 bg-orange-50 text-orange-800 rounded-xl border border-orange-200 text-sm font-medium flex items-center justify-between">
          <span>Anda harus membuat PIN Transaksi sebelum dapat mentransfer dana.</span>
          <Link to="/user/profil" className="px-3 py-1.5 bg-orange-600 text-white rounded-lg">Buat PIN</Link>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleTransfer} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Tujuan Transfer</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              required
              value={tujuan}
              onChange={(e) => setTujuan(e.target.value)}
              placeholder="Email atau Username pengguna FinSmart"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Nominal Transfer</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">Rp</span>
            <input 
              type="text" 
              required
              value={nominal}
              onChange={(e) => setNominal(formatRupiahInput(e.target.value))}
              placeholder="0"
              className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Catatan (Opsional)</label>
          <input 
            type="text" 
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Bayar makan siang..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <hr className="border-gray-100" />

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

        <button 
          type="submit" 
          disabled={loading || !nominal || !tujuan || pin.length !== 6 || !user?.pin}
          className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Kirim Dana'} <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Transfer;
