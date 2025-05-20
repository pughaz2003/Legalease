import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function UserDashboard() {
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState('');
  const [searchText, setSearchText] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) return setStatus("Geolocation not supported");

    setStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        setStatus(`📍 You are here`);
      },
      () => setStatus("Failed to get location"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSearch = async () => {
    if (!searchText) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const latLng = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(latLng);
        setStatus(`📍 Moved to: ${lat}, ${lon}`);
      } else {
        setStatus("Location not found");
      }
    } catch (err) {
      setStatus("Error searching location");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const findLawyers = async () => {
    if (!position) return alert("Please select a location");

    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/lawyer/nearby?lat=${position.lat}&lng=${position.lng}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const lawyers = await res.json();
      setLawyers(lawyers);
      setStatus(`Found ${lawyers.length} lawyers nearby`);
    } catch (err) {
      console.error("Error fetching lawyers:", err);
      setStatus("Error fetching lawyers");
      setLawyers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-2">User Dashboard</h2>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Search place or address..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            className="btn bg-blue-700 text-white" 
            onClick={handleSearch}
            disabled={isLoading || !searchText}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <button 
          className="btn w-full bg-blue-700 text-white" 
          onClick={getLocation}
          disabled={isLoading}
        >
          📍 Get My Current Location
        </button>

        {position && (
          <p className="text-sm text-blue-700">
            Location: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
          </p>
        )}
        <p className="text-sm text-green-600">{status}</p>
      </div>

      <MapContainer
        center={position || [13.115, 79.686]}
        zoom={position ? 14 : 8}
        scrollWheelZoom={true}
        style={{ height: '350px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>

      <button 
        className="btn bg-blue-700 w-full mt-4 text-white" 
        onClick={findLawyers}
        disabled={isLoading || !position}
      >
        {isLoading ? '🔍 Searching...' : '🔍 Find Nearby Lawyers'}
      </button>

      <div className="mt-4">
        {lawyers.length > 0 ? (
          <ul className="space-y-2">
            {lawyers.map((lawyer, i) => (
              <li key={i} className="p-4 bg-white border-2 border-gray-700   text-black  rounded-xl">
                <p><strong>{lawyer.name}</strong></p>
                <p>Specialization: {lawyer.specialization}</p>
                <p>Phone: {lawyer.phone}</p>
                <p>Mail: {lawyer.email}</p>
                {lawyer.distance && (
                  <p>Distance: {(lawyer.distance / 1000).toFixed(2)} km</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">
            {status.includes('Found 0') ? 'No lawyers found near your location' : ''}
          </p>
        )}
      </div>
    </div>
  );
}