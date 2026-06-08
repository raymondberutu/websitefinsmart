import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import GoogleMockLogin from './pages/GoogleMockLogin';
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';

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

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminUmkm from './pages/admin/Umkm';
import AdminTransaksi from './pages/admin/Transaksi';
import AdminEdukasi from './pages/admin/Edukasi';
import AdminLaporan from './pages/admin/Laporan';
import AdminPengaturan from './pages/admin/Pengaturan';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google-mock-login" element={<GoogleMockLogin />} />
        
        {/* User Routes */}
        <Route path="/user/*" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
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
