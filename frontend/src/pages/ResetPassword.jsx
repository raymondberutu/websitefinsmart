import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    const emailParam = params.get('email');
    
    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
    } else {
      setError('Link reset password tidak valid. Silakan minta link baru.');
    }
  }, [location]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Z]/.test(pwd)) return "Password harus mengandung huruf besar.";
    if (!/[0-9]/.test(pwd)) return "Password harus mengandung angka.";
    if (!/[@$!%*#?&]/.test(pwd)) return "Password harus mengandung simbol (@$!%*#?&).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token || !email) {
      setError('Token atau email tidak valid.');
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    if (password !== passwordConfirm) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(token, email, password, passwordConfirm);
      setMessage(data.message || 'Password berhasil diubah.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengubah password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-surface p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-md backdrop-blur-sm border border-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">Buat Password Baru</h1>
          <p className="text-text-muted text-sm">Silakan masukkan password baru Anda untuk akun <span className="font-medium text-gray-700">{email}</span></p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
            {message}
            <p className="mt-2 text-xs">Mengarahkan ke halaman login...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Password Baru</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Min 8 karakter, 1 huruf besar, 1 angka, 1 simbol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Konfirmasi Password Baru</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Ulangi password baru"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading || message}
            className={`w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 ${loading || message ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ResetPassword;
