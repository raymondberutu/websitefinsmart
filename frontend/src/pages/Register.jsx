import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, verifyAccount } = useAuth();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [devCode, setDevCode] = useState(''); // For testing display
  const [isVerification, setIsVerification] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password minimal 8 karakter.";
    if (!/[A-Z]/.test(pwd)) return "Password harus mengandung huruf besar.";
    if (!/[0-9]/.test(pwd)) return "Password harus mengandung angka.";
    if (!/[@$!%*#?&]/.test(pwd)) return "Password harus mengandung simbol (@$!%*#?&).";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    const pwdError = validatePassword(formData.password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      const response = await register({ ...formData, role: 'user' });
      setIsVerification(true);
      setSuccessMsg(response.message || 'Registrasi berhasil. Silakan cek email Anda untuk kode verifikasi.');
      if (response.dev_verification_code) {
        setDevCode(response.dev_verification_code); // Simulating email receipt for dev
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError(err.response?.data?.message || err.message || 'Registrasi gagal. Silakan coba lagi.');
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await verifyAccount(formData.email, verificationCode);
      navigate('/user/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Verifikasi gagal. Silakan periksa kembali kode Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-surface p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-md backdrop-blur-sm border border-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">FinSmart</h1>
          <p className="text-text-muted">{isVerification ? 'Verifikasi Akun' : 'Buat Akun Baru'}</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {successMsg && isVerification && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center">
            {successMsg}
            {devCode && (
              <div className="mt-2 font-mono text-lg font-bold">Kode Anda: {devCode}</div>
            )}
          </div>
        )}

        {!isVerification ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Nama Lengkap</label>
              <input 
                type="text" name="name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Masukkan nama lengkap"
                value={formData.name} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Username</label>
              <input 
                type="text" name="username"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Buat username unik"
                value={formData.username} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Nomor Telepon</label>
              <input 
                type="tel" name="phone"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Contoh: 081234567890"
                value={formData.phone} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Email</label>
              <input 
                type="email" name="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="email@example.com"
                value={formData.email} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Password</label>
              <input 
                type="password" name="password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Min 8 karakter, 1 huruf besar, 1 angka, 1 simbol"
                value={formData.password} onChange={handleChange} required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Konfirmasi Password</label>
              <input 
                type="password" name="password_confirmation"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Ulangi password"
                value={formData.password_confirmation} onChange={handleChange} required
              />
            </div>
            
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Kode Verifikasi</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-center text-xl tracking-widest"
                placeholder="XXXXXX"
                maxLength={6}
                value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-200"
            >
              Verifikasi & Aktifkan
            </button>
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => setIsVerification(false)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Kembali ke Form Registrasi
              </button>
            </div>
          </form>
        )}

        {!isVerification && (
          <div className="mt-8 text-center border-t pt-6">
            <p className="text-sm text-text-muted">
              Sudah memiliki akun? <a href="/login" className="text-primary font-medium hover:underline">Masuk di sini</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
