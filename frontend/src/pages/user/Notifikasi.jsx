import { useState, useEffect } from 'react';
import { Info, CheckCircle2, AlertTriangle, Bell } from 'lucide-react';
import api from '../../lib/axios';

const Notifikasi = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifikasi');
      if (response.data.status === 'success') {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Polling every 30 seconds for real-time feel
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifikasi/${id}/read`);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={24} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={24} className="text-yellow-500" />;
      case 'info':
      default:
        return <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"><Info size={20} className="text-blue-600" /></div>;
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options).replace(',', ' pukul');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifikasi</h1>
        <p className="text-gray-500 text-base">Pemberitahuan status analisis dan sistem</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-5 rounded-xl border flex items-start gap-4 transition-all ${
                notif.is_read ? 'bg-white border-gray-200' : 'bg-blue-50/50 border-blue-100 shadow-sm cursor-pointer hover:bg-blue-50'
              }`}
              onClick={() => !notif.is_read && markAsRead(notif.id)}
            >
              {getIcon(notif.type)}
              <div className="flex-grow">
                <p className={`text-gray-800 leading-relaxed mb-2 ${!notif.is_read ? 'font-medium' : 'font-normal'}`}>
                  {notif.pesan}
                </p>
                <span className="text-sm text-gray-500">
                  {formatDate(notif.created_at)}
                </span>
              </div>
              {!notif.is_read && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
              )}
            </div>
          ))
        ) : (
          <div className="p-5 rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center py-12 text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
               <Bell size={32} className="text-gray-400" />
             </div>
             <p className="text-gray-900 font-medium mb-1">Belum Ada Notifikasi</p>
             <p className="text-gray-500 text-sm">Anda akan melihat pemberitahuan sistem di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifikasi;
