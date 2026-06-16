import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GoogleMockLogin from './pages/GoogleMockLogin';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';

// Admin Auth
import AdminLogin from './pages/admin/Login';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import SimulasiKredit from './pages/user/SimulasiKredit';
import Transaksi from './pages/user/Transaksi';
import Analisis from './pages/user/Analisis';
import PetaSebaran from './pages/user/PetaSebaran';
import Rekomendasi from './pages/user/Rekomendasi';
import Edukasi from './pages/user/Edukasi';
import Riwayat from './pages/user/Riwayat';
import Notifikasi from './pages/user/Notifikasi';
import Profil from './pages/user/Profil';
import Pengaturan from './pages/user/Pengaturan';
import Panduan from './pages/user/Panduan';
import Laporan from './pages/user/Laporan';
import Bantuan from './pages/user/Bantuan';
import TopUp from './pages/user/TopUp';
import Transfer from './pages/user/Transfer';
import Pembayaran from './pages/user/Pembayaran';
import RiwayatWallet from './pages/user/RiwayatWallet';
// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminUmkm from './pages/admin/Umkm';
import AdminTransaksi from './pages/admin/Transaksi';
import AdminEdukasi from './pages/admin/Edukasi';
import AdminLaporan from './pages/admin/Laporan';
import AdminPengaturan from './pages/admin/Pengaturan';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const { darkMode } = JSON.parse(savedSettings);
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/google-mock-login" element={<GoogleMockLogin />} />
        
        {/* User Routes */}
        <Route path="/user/*" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="wallet/topup" element={<TopUp />} />
          <Route path="wallet/transfer" element={<Transfer />} />
          <Route path="wallet/pembayaran" element={<Pembayaran />} />
          <Route path="wallet/riwayat" element={<RiwayatWallet />} />
          <Route path="simulasi" element={<SimulasiKredit />} />
          <Route path="transaksi" element={<Transaksi />} />
          <Route path="analisis" element={<Analisis />} />
          <Route path="peta" element={<PetaSebaran />} />
          <Route path="rekomendasi" element={<Rekomendasi />} />
          <Route path="edukasi" element={<Edukasi />} />
          <Route path="riwayat" element={<Riwayat />} />
          <Route path="notifikasi" element={<Notifikasi />} />
          <Route path="profil" element={<Profil />} />
          <Route path="pengaturan" element={<Pengaturan />} />
          <Route path="panduan" element={<Panduan />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="bantuan" element={<Bantuan />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="umkm" element={<AdminUmkm />} />
          <Route path="transaksi" element={<AdminTransaksi />} />
          <Route path="edukasi" element={<AdminEdukasi />} />
          <Route path="laporan" element={<AdminLaporan />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Route>

        {/* Default route */}
        <Route path="/" element={<Landing />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
