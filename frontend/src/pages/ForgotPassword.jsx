import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [devToken, setDevToken] = useState(''); // For dev only

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    setDevToken('');

    try {
      const data = await forgotPassword(email);
      setMessage(data.message || 'Link reset password telah dikirim ke email Anda.');
      if (data.dev_token) {
        setDevToken(data.dev_token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim link reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-surface p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-md backdrop-blur-sm border border-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">Lupa Password</h1>
          <p className="text-text-muted text-sm">Masukkan email Anda yang terdaftar, kami akan mengirimkan link untuk reset password.</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
            {message}
            {devToken && (
              <div className="mt-4 p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Simulasi Email (Mode Dev):</p>
                <a href={`/reset-password?token=${devToken}&email=${encodeURIComponent(email)}`} className="text-primary hover:underline font-medium break-all">
                  Klik di sini untuk Reset Password
                </a>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-sm text-text-muted">
            Ingat password Anda? <a href="/login" className="text-primary font-medium hover:underline">Masuk di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
