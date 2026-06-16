import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [devCode, setDevCode] = useState('');

  const navigate = useNavigate();
  const { login, verify2FA } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await login(identifier, password);
      
      if (result.requires_2fa) {
        setRequires2FA(true);
        setLoginEmail(result.email);
        setDevCode(result.dev_2fa_code); // For development convenience
        return;
      }

      if (result.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError(err.response?.data?.message || err.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await verify2FA(loginEmail, twoFactorCode);
      if (result.user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Kode OTP tidak valid.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-surface p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-md backdrop-blur-sm border border-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">FinSmart</h1>
          <p className="text-text-muted">Financial Smart City Malang</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {requires2FA ? (
          <form onSubmit={handleVerify2FA} className="space-y-5">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                Kami telah mengirimkan kode OTP 6-digit ke email Anda.<br/>
                <span className="font-semibold text-gray-900">{loginEmail}</span>
              </p>
              {devCode && (
                <div className="mt-2 text-xs bg-yellow-100 text-yellow-800 p-2 rounded border border-yellow-200">
                  Dev Code: {devCode}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Kode OTP</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center tracking-[0.5em] text-lg font-bold"
                placeholder="••••••"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
            >
              Verifikasi & Masuk
            </button>
            <button 
              type="button" 
              onClick={() => { setRequires2FA(false); setTwoFactorCode(''); }}
              className="w-full bg-transparent hover:bg-gray-100 text-gray-600 font-medium py-2 rounded-lg transition-colors text-sm mt-2"
            >
              Batal
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Email / Username</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Masukkan email atau username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-text-main">Password</label>
                <a href="/forgot-password" className="text-sm text-primary hover:underline font-medium">Lupa Password?</a>
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
            >
              Masuk Sekarang
            </button>
          </form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={async () => {
                const width = 500;
                const height = 600;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2;
                const popup = window.open('/google-mock-login', 'GoogleAuth', `width=${width},height=${height},left=${left},top=${top}`);
                
                // Tunggu sampai user menutup popup (Simulasi OAuth asli)
                const timer = setInterval(async () => {
                  if (popup && popup.closed) {
                    clearInterval(timer);
                    try {
                      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/login/google-mock`, {
                        method: 'POST',
                        headers: { 'Accept': 'application/json' }
                      });
                      const data = await response.json();
                      if (data.access_token) {
                        localStorage.setItem('token', data.access_token);
                        window.location.href = '/user/dashboard';
                      }
                    } catch (e) {
                      console.error('Google login failed', e);
                    }
                  }
                }, 500);
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Lanjutkan dengan Google
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted">
            Belum punya akun? <a href="/register" className="text-secondary font-medium hover:underline">Daftar di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
