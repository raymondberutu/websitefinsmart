# FinSmart - Smart City Malang

<div align="center">

![FinSmart Logo](https://img.shields.io/badge/FinSmart-Smart%20City%20Malang-1D9E75?style=for-the-badge)

**Platform Financial Technology untuk Credit Scoring UMKM Berbasis QRIS**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com)

</div>

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Alur Kerja Aplikasi](#-alur-kerja-aplikasi)
- [Instalasi dan Setup](#-instalasi-dan-setup)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [User Roles dan Akses](#-user-roles-dan-akses)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Algoritma Credit Scoring](#-algoritma-credit-scoring)
- [Struktur Folder](#-struktur-folder)
- [Screenshot Aplikasi](#-screenshot-aplikasi)
- [Development Team](#-development-team)
- [License](#-license)

---

## 📖 Tentang Project

**FinSmart** adalah platform Financial Technology yang dikembangkan untuk mendukung program **Smart City Malang**. Aplikasi ini dirancang khusus untuk membantu UMKM (Usaha Mikro, Kecil, dan Menengah) di Kota Malang memperoleh akses pendanaan yang lebih mudah melalui sistem **Alternative Credit Scoring** berbasis data transaksi QRIS.

### Latar Belakang
- **48.000+ UMKM** terdaftar di Kota Malang
- **93.16%** merchant telah menggunakan QRIS
- **Rp579 Triliun** total transaksi digital
- Kebutuhan akses pendanaan yang cepat dan transparan

### Solusi yang Ditawarkan
FinSmart menganalisis data transaksi QRIS UMKM secara real-time untuk menghasilkan skor kredit yang objektif, akurat, dan dapat dipertanggungjawabkan. Sistem ini mengintegrasikan 5 faktor penilaian dengan bobot yang telah ditentukan untuk menghasilkan rekomendasi kelayakan kredit.

---

## ✨ Fitur Utama

### 1. **Alternative Credit Scoring**
- Analisis berbasis data transaksi QRIS real-time
- 5 faktor penilaian dengan algoritma terbobot
- 4 kategori kelayakan: Sangat Layak, Layak, Cukup Layak, Tidak Layak

### 2. **Multi-Role Dashboard**
- **Dashboard Admin**: Manajemen pengguna, UMKM, dan monitoring sistem
- **Dashboard UMKM**: Monitoring skor kredit, riwayat transaksi, simulasi kredit
- **Dashboard Pemerintah**: Analitik regional, peta sebaran UMKM, laporan ekonomi
- **Dashboard Bank/Lembaga Keuangan**: Daftar UMKM potensial, persetujuan pendanaan

### 3. **Peta Sebaran UMKM Interaktif**
- Visualisasi 5 kecamatan di Kota Malang (Klojen, Lowokwaru, Blimbing, Sukun, Kedungkandang)
- Marker interaktif dengan detail statistik per kecamatan
- Filter berdasarkan sektor usaha dan kategori kredit

### 4. **Dashboard Analitik Real-Time**
- Total UMKM dan transaksi QRIS
- Grafik pertumbuhan transaksi per bulan
- Distribusi kategori kredit (Pie Chart)
- Volume transaksi per sektor (Bar Chart)
- Rata-rata skor kredit regional

### 5. **Manajemen Data Lengkap**
- CRUD UMKM (Create, Read, Update, Delete)
- CRUD Transaksi QRIS
- CRUD Credit Scoring
- Monitoring status UMKM

### 6. **Keamanan dan Autentikasi**
- Laravel Sanctum untuk API Authentication
- Role-Based Access Control (RBAC)
- Password hashing dengan bcrypt
- CSRF Protection
- Input validation

---

## 🛠 Teknologi yang Digunakan

### **Backend**
- **Framework**: Laravel 12
- **Authentication**: Laravel Sanctum
- **Database ORM**: Eloquent ORM
- **Architecture**: MVC (Model-View-Controller)
- **API**: RESTful API dengan API Resource
- **Database**: MySQL 8.0

### **Frontend**
- **Library**: React 18
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v3
- **Charts**: Recharts
- **Icons**: React Icons
- **Alerts**: SweetAlert2
- **Maps**: React Leaflet (Leaflet.js)

### **Development Tools**
- **Package Manager**: Composer (PHP), npm (Node.js)
- **Build Tool**: Vite
- **Code Editor**: Visual Studio Code
- **Database Management**: phpMyAdmin
- **Local Server**: XAMPP / Laragon

### **Server & Deployment**
- **Web Server**: Apache / Nginx
- **PHP Version**: 8.2+
- **Node.js**: v18+

---

## 🏗 Arsitektur Sistem

Aplikasi ini menggunakan arsitektur **Client-Server** dengan pemisahan yang jelas antara frontend dan backend:

1. **Frontend (Client)**: Dibangun dengan React.js, bertanggung jawab untuk antarmuka pengguna, validasi sisi klien, dan manajemen *state*. Berkomunikasi dengan backend melalui *REST API*.
2. **Backend (Server)**: Dibangun dengan Laravel 12, bertindak sebagai *API Provider*. Menangani logika bisnis, algoritma *credit scoring*, autentikasi dengan Sanctum, dan interaksi *database*.
3. **Database**: MySQL digunakan sebagai tempat penyimpanan data relasional.

---

## 🔄 Alur Kerja Aplikasi

1. **Pendaftaran/Masuk**: UMKM mendaftar akun atau masuk menggunakan metode konvensional maupun otentikasi Google.
2. **Pengisian Profil**: Melengkapi profil usaha termasuk alamat (Kecamatan di Malang), sektor, dan detail lainnya.
3. **Unggah/Input Data Keuangan**: Memasukkan data transaksi bulanan (pendapatan, pengeluaran, dan data QRIS).
4. **Analisis Kredit**: Sistem secara otomatis menjalankan algoritma penilaian (*credit scoring*) di belakang layar.
5. **Dashboard & Hasil**: Menampilkan indeks kelayakan, batas pinjaman rekomendasi, dan metrik kesehatan usaha di Dashboard interaktif.

---

## 🚀 Instalasi dan Setup

Ikuti langkah-langkah di bawah ini untuk menjalankan *project* ini secara lokal di mesin Anda.

### Prasyarat
- PHP >= 8.2
- Node.js >= 18
- Composer
- MySQL Database

### Clone Repository
```bash
git clone https://github.com/username/websitefinsmart.git
cd websitefinsmart
```

---

## ⚙️ Konfigurasi Environment

### Setup Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
Sesuaikan konfigurasi database di dalam file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=websitefinsmart
DB_USERNAME=root
DB_PASSWORD=
```
Jalankan migrasi database:
```bash
php artisan migrate --seed
```

### Setup Frontend (React)
Buka terminal baru:
```bash
cd frontend
npm install
```

---

## 🖥 Menjalankan Aplikasi

### Menjalankan Backend
Di dalam folder `backend/`:
```bash
php artisan serve
```
*API akan berjalan di `http://localhost:8000`*

### Menjalankan Frontend
Di dalam folder `frontend/`:
```bash
npm run dev
```
*Aplikasi web akan berjalan di `http://localhost:5173`*

---

## 👥 User Roles dan Akses

- **Admin**: Akses penuh ke seluruh sistem, manajemen UMKM, pengelolaan artikel/video edukasi, pemantauan transaksi seluruh kota.
- **User (UMKM)**: Akses ke menu *Dashboard*, *Simulasi Kredit*, *Riwayat*, *Notifikasi*, dan *Edukasi Keuangan*. Hanya dapat melihat data milik usahanya sendiri.

---

## 🔌 API Endpoints

Berikut adalah beberapa contoh Endpoint utama dalam sistem:

- `POST /api/login` - Otentikasi dan mendapatkan *Token* Sanctum
- `POST /api/register` - Pendaftaran akun baru
- `GET /api/user` - Mengambil profil pengguna terautentikasi
- `GET /api/umkm` - Mendapatkan daftar UMKM (Akses Admin)
- `POST /api/umkm/simulasi` - Memproses perhitungan *credit scoring*
- `GET /api/transaksi` - Melihat transaksi QRIS UMKM
- `GET /api/edukasi` - Mengambil modul literasi keuangan

---

## 🗄 Database Schema

Beberapa tabel utama dalam skema database:
- `users`: Menyimpan kredensial dan peran (Admin/User).
- `umkms`: Informasi detail usaha (Nama, Kecamatan, Alamat, dll).
- `transaksis`: Catatan arus kas masuk/keluar harian & bulanan.
- `credit_scores`: Menyimpan riwayat hasil perhitungan kelayakan UMKM.
- `artikels` & `videos`: Materi untuk literasi keuangan UMKM.

---

## 🧮 Algoritma Credit Scoring

Perhitungan sistem skor di FinSmart menggunakan metode *Weighted Scoring Model* (Model Penilaian Terbobot) yang menggabungkan berbagai parameter kesehatan finansial dan profil UMKM.

### Rumus Utama
**Total Score** = (W₁ × S₁) + (W₂ × S₂) + (W₃ × S₃) + (W₄ × S₄)

Keterangan:
- **W** = Bobot (*Weight*) masing-masing parameter
- **S** = Skor (*Score*) yang didapatkan per parameter (skala 0-100)

### Detail Parameter & Bobot
1. **Kesehatan Arus Kas (W₁ = 40%)**
   - Mengukur rasio margin keuntungan bersih.
   - **Rumus:** `Margin = ((Pendapatan - Pengeluaran) / Pendapatan) × 100%`
   - *Skor maksimal jika margin ≥ 30%.*

2. **Kapasitas Pembayaran (W₂ = 30%)**
   - Mengukur kemampuan UMKM melunasi cicilan berdasarkan sisa dana bersih dari transaksi QRIS.
   - **Rumus:** `DSCR = (Sisa Saldo Rata-rata QRIS) / Estimasi Cicilan Bulanan`
   - *Skor maksimal jika Debt Service Coverage Ratio (DSCR) ≥ 1.5.*

3. **Profil Usaha (W₃ = 15%)**
   - Dinilai berdasarkan stabilitas operasional (Lama Usaha) dan faktor risiko geografis (Sektor/Kecamatan).
   - *Skor maksimal jika umur usaha > 3 tahun.*

4. **Rekam Jejak Historis (W₄ = 15%)**
   - Memeriksa riwayat pinjaman/pembiayaan sebelumnya.
   - *Skor penalti (pengurangan) jika terdapat riwayat tunggakan dalam 12 bulan terakhir.*

### Kategori Hasil Kelayakan
Berdasarkan hasil kalkulasi **Total Score (0 - 100)**, sistem mengklasifikasikan UMKM ke dalam 4 kategori:
- 🟢 **Sangat Layak (80 - 100)**: Direkomendasikan penuh, rasio kredit aman (plafon hingga 3x pendapatan).
- 🔵 **Layak (60 - 79)**: Direkomendasikan dengan plafon pinjaman yang disesuaikan (hingga 2,5x pendapatan).
- 🟡 **Cukup Layak (40 - 59)**: Pembiayaan bersyarat dengan mitigasi risiko tambahan (pendampingan ekstra).
- 🔴 **Tidak Layak (0 - 39)**: Penolakan sementara, disarankan mengikuti program Edukasi Keuangan FinSmart.

---

## 📁 Struktur Folder

```text
websitefinsmart/
├── backend/                  # Laravel 12 Backend
│   ├── app/                  # Controller, Model, Middleware
│   ├── database/             # Migrasi & Seeder MySQL
│   ├── routes/               # api.php (RESTful Endpoints)
│   └── ...
└── frontend/                 # React 18 Frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── contexts/         # React Context (Auth)
    │   ├── layouts/          # UserLayout & AdminLayout
    │   ├── pages/            # Halaman Dashboard, Simulasi, Landing
    │   └── lib/              # Konfigurasi Axios API
    └── ...
```

---

## 📸 Screenshot Aplikasi

*(Screenshot dapat ditambahkan di sini saat sistem siap di-publish)*

---

## 👨‍💻 Development Team

- **Raymond Berutu** - *Lead Developer / Fullstack Engineer*
- **Team FinSmart Malang**

---

## 📄 License

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).
