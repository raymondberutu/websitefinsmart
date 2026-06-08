import { useState } from 'react';
import { PlayCircle, BookOpen, Clock, ExternalLink, Search } from 'lucide-react';
import Modal from '../../components/Modal';

const Edukasi = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Literasi Keuangan', 'Pengelolaan UMKM', 'QRIS', 'Kredit Usaha'];

  const contents = [
    { 
      id: 1, type: 'Video', category: 'Literasi Keuangan',
      title: 'Cara Memisahkan Uang Pribadi & Usaha', 
      desc: 'Pelajari langkah penting memisahkan arus kas pribadi dengan bisnis Anda agar tidak bercampur.',
      author: 'Tim FinSmart', date: '08 Jun', time: '10 Min', 
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80', 
      url: 'https://www.youtube.com/watch?v=76W2eQ3u1tE',
      embedUrl: 'https://www.youtube.com/embed/76W2eQ3u1tE' 
    },
    { 
      id: 2, type: 'Artikel', category: 'Pengelolaan UMKM',
      title: 'Panduan Lengkap Pembukuan UMKM', 
      desc: 'Mencatat pengeluaran dan pemasukan dengan rapi adalah kunci stabilitas usaha jangka panjang.',
      author: 'Divisi Edukasi FinSmart', date: '07 Jun', time: '5 Min Baca', 
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', 
      url: 'https://accurate.id/akuntansi/pembukuan-sederhana-untuk-usaha-kecil/' 
    },
    { 
      id: 3, type: 'Video', category: 'Kredit Usaha',
      title: 'Tips Lolos KUR Bank Untuk UMKM', 
      desc: 'Langkah praktis mempersiapkan dokumen dan syarat agar pengajuan Kredit Usaha Rakyat disetujui.',
      author: 'Tim Analis FinSmart', date: '05 Jun', time: '15 Min', 
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', 
      url: 'https://www.youtube.com/watch?v=gJg4wB4-r1Q',
      embedUrl: 'https://www.youtube.com/embed/gJg4wB4-r1Q' 
    },
    { 
      id: 4, type: 'Artikel', category: 'Pengelolaan UMKM',
      title: 'Strategi Menetapkan Harga Jual Produk', 
      desc: 'Cara jitu menghitung margin keuntungan tanpa takut kehilangan pelanggan setia.',
      author: 'Tim FinSmart', date: '04 Jun', time: '8 Min Baca', 
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80', 
      url: 'https://ukmindonesia.id/baca-deskripsi-posts/strategi-menetapkan-harga-jual' 
    },
    { 
      id: 5, type: 'Artikel', category: 'QRIS',
      title: 'QRIS: Revolusi Pembayaran Digital', 
      desc: 'Quick Response Code Indonesian Standard (QRIS) adalah standar pembayaran digital yang aman.',
      author: 'Divisi QRIS FinSmart', date: '02 Jun', time: '4 Min Baca', 
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&q=80', 
      url: 'https://www.bi.go.id/QRIS/default.aspx' 
    },
    { 
      id: 6, type: 'Video', category: 'Literasi Keuangan',
      title: 'Cara Mengatur Cash Flow Agar Tidak Boncos', 
      desc: 'Manajemen perputaran uang yang cerdas untuk mengamankan operasional harian bisnis Anda.',
      author: 'Tim FinSmart', date: '01 Jun', time: '12 Min', 
      image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=400&q=80', 
      url: 'https://www.youtube.com/watch?v=nNwyB1i8fOM',
      embedUrl: 'https://www.youtube.com/embed/nNwyB1i8fOM' 
    },
    { 
      id: 7, type: 'Video', category: 'Kredit Usaha',
      title: 'Memahami Skor Kredit: Kunci Akses Pembiayaan', 
      desc: 'Skor kredit adalah angka yang mencerminkan kemampuan UMKM dalam melunasi pinjaman.',
      author: 'Tim Analis FinSmart', date: '28 Mei', time: '20 Min', 
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80', 
      url: 'https://www.youtube.com/watch?v=d_Uu9_S-Z-Y',
      embedUrl: 'https://www.youtube.com/embed/d_Uu9_S-Z-Y' 
    },
    { 
      id: 8, type: 'Artikel', category: 'Kredit Usaha',
      title: 'Cara Mengajukan Pinjaman Modal Usaha', 
      desc: 'Panduan step-by-step mengajukan permodalan kepada bank untuk ekspansi usaha mikro.',
      author: 'Tim FinSmart', date: '25 Mei', time: '7 Min Baca', 
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80', 
      url: 'https://www.bankmandiri.co.id/kur' 
    },
    { 
      id: 9, type: 'Video', category: 'Literasi Keuangan',
      title: 'Manajemen Keuangan Usaha Kecil', 
      desc: 'Pondasi literasi dasar tentang neraca keuangan yang sangat krusial bagi wirausaha pemula.',
      author: 'Tim FinSmart', date: '20 Mei', time: '18 Min', 
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80', 
      url: 'https://www.youtube.com/watch?v=vVj4u_3n2H0',
      embedUrl: 'https://www.youtube.com/embed/vVj4u_3n2H0'
    },
    { 
      id: 10, type: 'Artikel', category: 'Pengelolaan UMKM',
      title: 'Tips Pemasaran Digital UMKM', 
      desc: 'Strategi mendatangkan pelanggan baru dari sosial media dengan modal seadanya.',
      author: 'Divisi Edukasi', date: '15 Mei', time: '10 Min Baca', 
      image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&q=80', 
      url: 'https://ukmindonesia.id/baca-deskripsi-posts/pemasaran-digital' 
    },
  ];

  // Filtering Logic
  const filteredContents = contents.filter(item => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (item) => {
    if (item.type === 'Video' && item.embedUrl) {
      setSelectedVideo(item);
    }
  };

  const getBadgeColor = (category) => {
    switch(category) {
      case 'Literasi Keuangan': return 'bg-blue-100 text-blue-700';
      case 'Pengelolaan UMKM': return 'bg-emerald-100 text-emerald-700';
      case 'QRIS': return 'bg-purple-100 text-purple-700';
      case 'Kredit Usaha': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edukasi Keuangan</h1>
        <p className="text-gray-500 text-base">Artikel dan panduan untuk meningkatkan literasi keuangan UMKM</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <div className="relative w-full md:w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari artikel..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContents.map((item) => {
          const CardContent = (
            <>
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.type === 'Video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <PlayCircle size={48} className="text-white opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-semibold ${getBadgeColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{item.desc}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 mt-auto">
                  <span className="font-medium text-gray-500">{item.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} /> {item.date}
                  </div>
                </div>
              </div>
            </>
          );

          if (item.type === 'Artikel') {
            return (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {CardContent}
              </a>
            );
          }

          return (
            <div 
              key={item.id} 
              onClick={() => handleCardClick(item)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {CardContent}
            </div>
          );
        })}
        
        {filteredContents.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
            Tidak ada konten yang sesuai dengan pencarian atau filter Anda.
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
      >
        {selectedVideo && (
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src={`${selectedVideo.embedUrl}?autoplay=1`} 
                title={selectedVideo.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
              <ExternalLink className="text-primary mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Video tidak bisa diputar (dibatasi kreator)?</p>
                <a 
                  href={selectedVideo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Tonton langsung di YouTube
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Edukasi;
