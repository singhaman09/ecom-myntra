import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import styles from './MapDisplay.module.css';

// Create a custom icon using Lucide's MapPin SVG
const CustomIcon: DivIcon = L.divIcon({
  className: styles.customMapPin,
  html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a21caf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4.8-4.4-8-7.6-8-11a8 8 0 1 1 16 0c0 3.4-3.2 6.6-8 11z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const position: [number, number] = [22.9734, 78.6569]; // Example: center of India

const MapDisplay: React.FC = () => {
  return (
    <div className={styles.mapPlaceholder}>
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        className={styles.leafletMap}
        style={{ height: '300px', borderRadius: '1rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={CustomIcon}>
          <Popup>
            <b>Store Location</b>
            <br />
            This is your store on the map!
          </Popup>
        </Marker>
      </MapContainer>
    
    </div>
  );
};

export default MapDisplay;
