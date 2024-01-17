import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const Map = () => {
  useEffect(() => {
    
    if (!document.getElementById('map').classList.contains('leaflet-container')) {
    
      const map = L.map('map').fitWorld();
      
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
      
      map.locate({ setView: true, maxZoom: 16 });
      
      function onLocationFound(e) {
        const radius = e.accuracy;
        L.marker(e.latlng)
          .addTo(map)
          .bindPopup(`You are within ${radius} meters from this point`)
          .openPopup();
        L.circle(e.latlng, radius).addTo(map);
      }
      map.on('locationfound', onLocationFound);
      
      function onLocationError(e) {
        alert(e.message);
      }
      map.on('locationerror', onLocationError);
    }
    
    return () => {
    
    };
  }, []); 
  return <div id="map" style={{ height: '100vh', width: '100vw' }}></div>;
};
export default Map;