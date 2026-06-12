import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        await logout(); // Jika bukan admin, keluarkan
        setError('Akses ditolak. Kredensial tidak memiliki hak akses Administrator.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError(err.response?.data?.message || err.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="bg-gray-800/80 backdrop-blur-xl p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] w-full max-w-md border border-gray-700 relative z-10">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <ShieldAlert size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-gray-400">Silakan masuk untuk mengelola sistem FinSmart</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 text-red-200 rounded-lg text-sm text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Administrator</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input 
                type="email" 
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                placeholder="admin@finsmart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-[1px] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Masuk sebagai Admin'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-700/50 pt-6">
          <p className="text-sm text-gray-400">
            Halaman ini khusus untuk administrator. <br/>
            <a href="/login" className="text-blue-400 font-medium hover:text-blue-300 hover:underline mt-2 inline-block transition-colors">
              Kembali ke Login User
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
