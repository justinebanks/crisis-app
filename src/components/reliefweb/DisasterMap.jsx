"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import React from 'react';

const pinIcon = new Icon({
  iconUrl: '/marker-red.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function DisasterMap({ lat, lon, title }) {
  if (!lat || !lon) return <div className="p-3 text-gray-500">Location not available</div>;

  return (
    <div className="h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
      <MapContainer center={[lat, lon]} zoom={6} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={pinIcon}>
          <Popup>
            <strong>{title}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
