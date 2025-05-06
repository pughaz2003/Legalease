

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// fix marker icon paths
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

function SearchLocation({ setPosition }) {
  const [searchText, setSearchText] = useState('');
  const map = useMap(); // Now inside MapContainer, this works properly.

  const handleSearch = async () => {
    if (!searchText) return;

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`);
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const latLng = { lat: parseFloat(lat), lng: parseFloat(lon) };
      setPosition(latLng);
      map.setView(latLng, 14); // Re-centers the map to the searched location
    } else {
      alert('Location not found');
    }
  };

  return (
    <div className="mb-4 flex items-center space-x-2">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter address or city"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="btn btn-secondary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default function LocationPicker({ position, setPosition }) {
  return (
    <div className="mt-4 space-y-2">
      <SearchLocation setPosition={setPosition} />
      <MapContainer
        center={[13.1, 79.7]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '350px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
