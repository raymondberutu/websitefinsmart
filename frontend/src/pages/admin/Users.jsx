import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../lib/axios';
import Modal from '../../components/Modal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try { const { data } = await api.get('/admin/users'); setUsers(data); } catch (e) { }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', formData);
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) { alert('Gagal menambah user'); }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Yakin ingin menghapus?')) {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18}/> Tambah Pengguna
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="px-6 py-4 font-medium">Nama</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id}>
                <td className="px-6 py-4 text-sm">{u.name}</td>
                <td className="px-6 py-4 text-sm">{u.email}</td>
                <td className="px-6 py-4 text-sm uppercase">{u.role}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Pengguna">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nama" required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} className="w-full border p-2 rounded" />
          <input type="email" placeholder="Email" required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} className="w-full border p-2 rounded" />
          <input type="password" placeholder="Password" required value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})} className="w-full border p-2 rounded" />
          <select value={formData.role} onChange={e=>setFormData({...formData,role:e.target.value})} className="w-full border p-2 rounded">
            <option value="user">User UMKM</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded">Simpan</button>
        </form>
      </Modal>
    </div>
  );
};
export default Users;
