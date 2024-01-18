import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

async function geocodeAddress(city, district, postalCode) {
  const apiKey = 'c5d6945313184f0da4648a7de1952f2d';
  const address = `${city} ${district} ${postalCode}, Germany`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry;
      return location;
    }
  } catch (error) {
    console.error('Fehler bei der Geocodierung:', error);
  }
}
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function Map() {
  const { data } = useSWR('/api/providers', fetcher);
  const [locations, setLocations] = useState([]);
  const [yourLocation, setYourLocation] = useState(null); // Hier speichern wir deine eigene Position

  useEffect(() => {
    if (data) {
      const updatedLocations = [];

      data.forEach(async (provider) => {
        const { city, district, postalCode } = provider;
        const location = await geocodeAddress(city, district, postalCode);
        updatedLocations.push(location);
      });

      setLocations(updatedLocations);
    }

    // Hier erlauben wir den Standortzugriff im Browser und speichern die eigenen Koordinaten
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setYourLocation({ lat: latitude, lng: longitude });
    });
  }, [data]);

  return (
    <div> 
      <MapContainer center={[51.1657, 10.4515]} zoom={6}> 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {yourLocation && (
          <Marker position={[yourLocation.lat, yourLocation.lng]}>
            <Popup>Ich bin hier</Popup>
          </Marker>
        )}
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>Standort eines Servicedienstleisters {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
