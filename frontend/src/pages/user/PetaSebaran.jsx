import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Users, Store } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PetaSebaran = () => {
  const malangPosition = [-7.9797, 112.6304]; // Malang City Coordinates
  
  const umkmLocations = [
    { id: 1, pos: [-7.9820, 112.6310], name: 'Warung Makmur', type: 'Kuliner', score: 850 },
    { id: 2, pos: [-7.9750, 112.6280], name: 'Toko Baju Indah', type: 'Fashion', score: 720 },
    { id: 3, pos: [-7.9850, 112.6350], name: 'Kopi Senja', type: 'Kuliner', score: 910 },
    { id: 4, pos: [-7.9700, 112.6300], name: 'Bengkel Maju', type: 'Jasa', score: 680 },
  ];

  const distributionData = [
    { name: 'Klojen', count: 2, color: '#1d4ed8', desc: 'Pusat kota, kawasan bisnis utama', percentage: 25 },
    { name: 'Lowokwaru', count: 2, color: '#15803d', desc: 'Kawasan pendidikan & kuliner', percentage: 25 },
    { name: 'Blimbing', count: 2, color: '#7e22ce', desc: 'Kawasan industri & perdagangan', percentage: 25 },
    { name: 'Kedungkandang', count: 1, color: '#b45309', desc: 'Kawasan manufaktur & pertanian', percentage: 13 },
    { name: 'Sukun', count: 1, color: '#0e7490', desc: 'Kawasan pemukiman padat', percentage: 12 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Peta Sebaran UMKM</h1>
        <p className="text-gray-500 text-base">Pemetaan lokasi dan klasterisasi jenis UMKM di Kota Malang.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><MapPin size={24} /></div>
          <div><p className="text-sm text-gray-600">Total Titik</p><p className="text-xl font-bold text-gray-900">8</p></div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600"><Store size={24} /></div>
          <div><p className="text-sm text-gray-600">Terbanyak</p><p className="text-xl font-bold text-gray-900">Kuliner</p></div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><Users size={24} /></div>
          <div><p className="text-sm text-gray-600">Kecamatan Padat</p><p className="text-xl font-bold text-gray-900">Klojen</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[400px] relative z-0">
        <MapContainer center={malangPosition} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {umkmLocations.map((loc) => (
            <Marker key={loc.id} position={loc.pos}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-gray-900 text-sm">{loc.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">Sektor: {loc.type}</p>
                  <p className="text-xs font-bold text-primary mt-1">Skor Kredit: {loc.score}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Distribusi UMKM per Kecamatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Distribusi UMKM per Kecamatan</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={distributionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 13}} width={100} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          {distributionData.map((data, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center relative overflow-hidden">
              {/* Left Color Border */}
              <div className="absolute left-0 top-0 bottom-0 w-2" style={{backgroundColor: data.color}}></div>
              
              <div className="pl-4 flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-gray-900">{data.name}</h3>
                  <span className="text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded">{data.count} UMKM</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{data.desc}</p>
                
                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{width: `${data.percentage}%`, backgroundColor: data.color}}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 w-8">{data.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetaSebaran;
