import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";

const MapContainerStyled = styled(MapContainer)`
  width: 100%;
  height: 30vh;
`;

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
});

async function geocodeAddress(city, district, postalCode) {
  const apiKey = "7aeaf7397d0341fa951b6dce55ccef69";
  const address = `${city} ${district} ${postalCode}, Germany`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry;
      return location;
    }
  } catch (error) {
    console.error("Fehler bei der Geocodierung:", error);
  }
}

export default function Map({ data }) {
  const [locations, setLocations] = useState([]);
  const [yourLocation, setYourLocation] = useState(null);

  useEffect(() => {
    if (data) {
      const locationPromises = data.map(async (provider) => {
        const { city, district, postalCode, firstName, skills, needs, _id } =
          provider;
        const location = await geocodeAddress(city, district, postalCode);
        return { location, name: firstName, skills, needs, _id };
      });

      Promise.all(locationPromises).then((updatedLocations) => {
        setLocations(updatedLocations);
      });
    }
  }, [data]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setYourLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <MapContainerStyled center={[51.1657, 10.4515]} zoom={6}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {yourLocation && (
        <Marker
          position={[yourLocation.lat, yourLocation.lng]}
          icon={yellowIcon}
        >
          <Popup>Ich bin hier</Popup>
        </Marker>
      )}
      {locations.map((provider, index) => {
        return (
          <Marker
            key={index}
            position={[provider.location.lat, provider.location.lng]}
            icon={blueIcon}
          >
            <Popup>
              <strong>Standort von:</strong> {provider.name} <br></br>
              <strong>Skills:</strong> {provider.skills}
              <br></br>
              <strong>Needs:</strong> {provider.needs}
              <br></br>
              <a href={`#${provider._id}`}>Go to Service Card</a>
            </Popup>
          </Marker>
        );
      })}
    </MapContainerStyled>
  );
}
