import { useState } from 'react';
import { CreditCard, Building2, Smartphone, ArrowRight, CheckCircle2, QrCode } from 'lucide-react';
import api from '../../lib/axios';
import { useNavigate, Link } from 'react-router-dom';

const TopUp = () => {
  const [nominal, setNominal] = useState('');
  const [metode, setMetode] = useState('Transfer Bank BCA');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTopUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await api.post('/wallet/topup', { 
        nominal: Number(nominal.replace(/\D/g, '')), 
        metode 
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal melakukan Top Up');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Up Berhasil!</h2>
        <p className="text-gray-600 mb-6">Saldo FinSmart Anda telah bertambah. Anda akan dialihkan ke Dashboard dalam beberapa detik.</p>
        <Link to="/user/dashboard" className="w-full inline-block bg-primary text-white py-3 rounded-xl font-bold">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Top Up Saldo</h1>
        <p className="text-gray-500 text-sm mt-1">Isi saldo FinSmart Anda dengan mudah dan cepat.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleTopUp} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Nominal Top Up</label>
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
          <div className="flex gap-2 mt-3">
            {['50000', '100000', '250000', '500000'].map(val => (
              <button 
                key={val} 
                type="button"
                onClick={() => setNominal(formatRupiahInput(val))}
                className="flex-1 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                {Number(val).toLocaleString('id-ID')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Metode Pembayaran</label>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { id: 'QRIS', icon: <QrCode className="text-pink-600"/>, label: 'QRIS (Gopay, ShopeePay, dll)' },
              { id: 'Transfer Bank BCA', icon: <Building2 className="text-blue-600"/>, label: 'BCA Virtual Account' },
              { id: 'Transfer Bank Mandiri', icon: <Building2 className="text-yellow-600"/>, label: 'Mandiri Virtual Account' },
              { id: 'Transfer Bank BRI', icon: <Building2 className="text-blue-800"/>, label: 'BRI Virtual Account' },
              { id: 'Transfer Bank BNI', icon: <Building2 className="text-orange-600"/>, label: 'BNI Virtual Account' },
              { id: 'Transfer Bank CIMB', icon: <Building2 className="text-red-700"/>, label: 'CIMB Niaga Virtual Account' },
              { id: 'Minimarket (Indomaret/Alfamart)', icon: <CreditCard className="text-red-500"/>, label: 'Indomaret / Alfamart' },
              { id: 'E-Wallet Lain (OVO/GoPay)', icon: <Smartphone className="text-purple-600"/>, label: 'OVO / GoPay / Dana' },
            ].map((method) => (
              <label key={method.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${metode === method.id ? 'border-primary bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-50">
                    {method.icon}
                  </div>
                  <span className="font-bold text-gray-800">{method.label}</span>
                </div>
                <input 
                  type="radio" 
                  name="metode" 
                  value={method.id} 
                  checked={metode === method.id}
                  onChange={(e) => setMetode(e.target.value)}
                  className="w-5 h-5 text-primary focus:ring-primary"
                />
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !nominal}
          className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Lanjutkan Top Up'} <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default TopUp;
