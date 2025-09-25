import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom icon for the marker
const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocationMap = ({ latitude, longitude, name }) => {
  if (!latitude || !longitude) {
    return <p className="text-gray-500">No coordinates available</p>;
  }

  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "250px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker
        position={[latitude, longitude]}
        icon={locationIcon}
        eventHandlers={{ click: handleDirections }}
      >
        <Popup>
          <div className="text-center">
            <strong>{name}</strong>
            <br />
            <button
              onClick={handleDirections}
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Get Directions
            </button>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;