import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../lib/axios';
import Modal from '../../components/Modal';

const Edukasi = () => {
  const [artikels, setArtikels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    gambar: ''
  });

  useEffect(() => {
    fetchArtikels();
  }, []);

  const fetchArtikels = async () => {
    try {
      const { data } = await api.get('/admin/artikels');
      setArtikels(data);
    } catch (error) {
      console.error('Failed to fetch articles');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/artikels', formData);
      setIsModalOpen(false);
      setFormData({ judul: '', isi: '', gambar: '' });
      fetchArtikels();
    } catch (error) {
      alert('Gagal menambah artikel');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus artikel ini?')) {
      try {
        await api.delete(`/admin/artikels/${id}`);
        fetchArtikels();
      } catch (error) {
        alert('Gagal menghapus artikel');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel Edukasi</h1>
          <p className="text-gray-500 text-sm mt-1">Publikasikan materi keuangan untuk membantu UMKM.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus size={18} /> Tambah Artikel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artikels.map((artikel) => (
          <div key={artikel.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-200">
              {artikel.gambar ? (
                <img src={artikel.gambar} alt={artikel.judul} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-primary font-bold">
                  FinSmart Edu
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{artikel.judul}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                {artikel.isi}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {new Date(artikel.created_at).toLocaleDateString('id-ID')}
                </span>
                <button onClick={() => handleDelete(artikel.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors flex items-center gap-1 text-xs font-medium">
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
        {artikels.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            Belum ada artikel edukasi yang dipublikasikan.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Artikel Baru">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
            <input 
              type="text" required value={formData.judul} 
              onChange={e => setFormData({...formData, judul: e.target.value})} 
              className="w-full border p-2 rounded-lg focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Artikel</label>
            <textarea 
              required value={formData.isi} 
              onChange={e => setFormData({...formData, isi: e.target.value})} 
              className="w-full border p-2 rounded-lg focus:ring-primary focus:border-primary h-32" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (Opsional)</label>
            <input 
              type="url" value={formData.gambar} 
              onChange={e => setFormData({...formData, gambar: e.target.value})} 
              className="w-full border p-2 rounded-lg focus:ring-primary focus:border-primary" 
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-blue-800 text-white py-2 rounded-lg font-medium transition-colors">
            Publikasikan
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Edukasi;
