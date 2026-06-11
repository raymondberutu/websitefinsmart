# Class Diagram Website FinSmart

Berikut adalah Class Diagram untuk sistem backend Website FinSmart Anda beserta penjelasannya secara mendetail.

![Class Diagram FinSmart](file:///C:/Users/LENOVO%20LOQ/.gemini/antigravity-ide/brain/3c527b36-ba92-46f9-bb2c-7d7faddbcf8c/Class_Diagram_FinSmart.png)

> [!TIP]
> **Cara Mengunduh Gambar:**
> Anda dapat **Klik Kanan** pada gambar diagram di atas, lalu pilih opsi **"Save image as..."** atau **"Simpan gambar sebagai..."** untuk mengunduhnya ke perangkat Anda dalam format `.png`.

---

## 1. Komponen Class (Tabel)

### **A. User**
Class ini merepresentasikan entitas pengguna dalam sistem, baik itu sebagai administrator maupun pengguna biasa (pemilik UMKM).
*   **Atribut (Kolom Database):**
    *   `id` (BigInteger): Primary key (id unik) untuk setiap user.
    *   `name` (String): Nama lengkap pengguna.
    *   `email` (String): Alamat email yang digunakan untuk login (unik).
    *   `email_verified_at` (Timestamp): Waktu kapan email diverifikasi.
    *   `password` (String): Kata sandi pengguna yang disimpan dalam bentuk acak (hashed).
    *   `role` (Enum): Peran dari pengguna sistem, bernilai `'admin'` atau `'user'`.
    *   `remember_token` (String): Token untuk menyimpan sesi "Ingat Saya" saat login.
    *   `created_at`, `updated_at` (Timestamp): Waktu rekam data (kapan dibuat dan terakhir diubah).
*   **Method (Relasi Eloquent):**
    *   `umkm()`: Mengambil profil UMKM yang didaftarkan oleh user ini.

### **B. Umkm**
Class ini merepresentasikan profil Usaha Mikro Kecil dan Menengah.
*   **Atribut:**
    *   `id` (BigInteger): Primary key.
    *   `user_id` (BigInteger): *Foreign key* yang merujuk pada `id` milik **User**.
    *   `nama_umkm` (String): Nama lengkap dari bisnis/usaha.
    *   `lokasi` (String): Alamat detail lokasi usaha.
    *   `jenis_usaha` (String): Kategori dari usaha (misal: Kuliner, Ritel, Jasa).
    *   `pendapatan` (Decimal): Data kisaran atau nominal pendapatan rata-rata usaha.
*   **Method:**
    *   `user()`: Menunjuk kembali (belongsTo) ke pemilik (User) dari UMKM ini.
    *   `transaksiQris()`: Mengambil seluruh rekap transaksi QRIS dari UMKM ini.
    *   `creditScores()`: Mengambil seluruh riwayat nilai kredit (credit score) dari UMKM ini.

### **C. TransaksiQris**
Class ini bertugas untuk menyimpan riwayat pendapatan/transaksi digital via QRIS.
*   **Atribut:**
    *   `id` (BigInteger): Primary key.
    *   `umkm_id` (BigInteger): *Foreign key* yang merujuk pada `id` milik **Umkm**.
    *   `tanggal` (Date): Waktu kalender terjadinya transaksi tersebut.
    *   `nominal` (Decimal): Jumlah rupiah nominal transaksi.
    *   `metode_pembayaran` (String): Secara default berisi teks `'QRIS'`.
    *   `status` (String): Status penyelesaian transaksi, secara default `'Berhasil'`.
*   **Method:**
    *   `umkm()`: Menunjuk kembali (belongsTo) ke UMKM tempat transaksi ini terjadi.

### **D. CreditScore**
Class ini menyimpan hasil hitung/penilaian kelayakan (Scoring) pembiayaan suatu UMKM.
*   **Atribut:**
    *   `id` (BigInteger): Primary key.
    *   `umkm_id` (BigInteger): *Foreign key* yang merujuk pada `id` milik **Umkm**.
    *   `score` (Integer): Nilai akhir skor kelayakan kredit (berupa angka).
    *   `kategori` (String): Label hasil dari skor tersebut (Contoh: `'Sangat Layak'`, `'Cukup Layak'`, `'Tidak Layak'`).
    *   `status_kelayakan` (String): Kesimpulan status kelayakan secara general (Contoh: `'Layak'`, `'Tidak Layak'`).
*   **Method:**
    *   `umkm()`: Menunjuk kembali (belongsTo) ke UMKM yang dilakukan scoring.

### **E. Artikel**
Class ini digunakan untuk modul literasi finansial atau blog berita di dalam website.
*   **Atribut:**
    *   `id` (BigInteger): Primary key.
    *   `penulis_id` (BigInteger): *Foreign key* merujuk pada `id` milik **User** (sebagai penulis).
    *   `judul` (String): Judul publikasi dari artikel.
    *   `gambar` (String): Alamat file/URL dari gambar _thumbnail_ artikel.
    *   `isi` (LongText): Konten utuh dari artikel tersebut.
*   **Method:**
    *   `penulis()`: Menunjuk kembali (belongsTo) ke User yang menulis artikel ini.

### **F. Notifikasi**
Class ini digunakan untuk menyimpan pesan masuk berupa sistem alert/pemberitahuan.
*   **Atribut:**
    *   `id` (BigInteger): Primary key.
    *   `user_id` (BigInteger): *Foreign key* merujuk pada `id` milik **User** sebagai penerima.
    *   `pesan` (String): Teks notifikasi yang hendak ditampilkan.
    *   `status` (Enum): Penanda apakah pesan telah dibaca, bernilai `'unread'` atau `'read'`.
*   **Method:**
    *   `user()`: Menunjuk kembali (belongsTo) ke User sang penerima pesan.

---

## 2. Penjelasan Logika Relasi (Garis Panah)

1. **User (1)  -->  (0..1) Umkm**  *(Relasi One-to-One / Zero)*
   *   **Arti:** Setiap pengguna yang mendaftar ke sistem Website FinSmart hanya diperbolehkan mengelola **maksimal 1 bisnis UMKM**. Jika dia admin, bisa jadi dia tidak memiliki UMKM (`0`). 

2. **User (1)  -->  (*) Artikel** *(Relasi One-to-Many)*
   *   **Arti:** Satu pengguna (biasanya Administrator) diberikan kemampuan untuk mempublikasikan **banyak tulisan artikel** literasi. Sebaliknya, satu artikel sudah pasti ditulis oleh tepat satu orang penulis saja.

3. **User (1)  -->  (*) Notifikasi** *(Relasi One-to-Many)*
   *   **Arti:** Satu orang pengguna bisa menerima dan menyimpan **banyak notifikasi masuk** sekaligus di dalam akunnya. 

4. **Umkm (1)  -->  (*) TransaksiQris** *(Relasi One-to-Many)*
   *   **Arti:** Satu profil UMKM yang terdaftar akan mendata dan mencatat **banyak transaksi QRIS harian** yang terjadi di lapak mereka seiring berjalannya waktu.

5. **Umkm (1)  -->  (*) CreditScore** *(Relasi One-to-Many)*
   *   **Arti:** Satu bisnis UMKM bisa saja dievaluasi/dihitung kemampuan kreditnya secara berulang-ulang di sistem (misal scoring di bulan Januari, lalu di bulan Februari). Oleh karena itu, satu UMKM dapat menyimpan **banyak riwayat hasil Credit Score**.
