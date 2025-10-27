"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';

const pinIcon = new Icon({
  iconUrl: '/marker-red.svg',
  iconSize: [28, 28],
  iconAnchor: [14, 28]
});

export default function UCDPConflictMap({ events = [], center }) {
  // compute a center if not provided
  let lat = center?.lat || null;
  let lon = center?.lon || null;

  if ((!lat || !lon) && events.length > 0) {
    const coords = events
      .map(e => ({ lat: Number(e.latitude), lon: Number(e.longitude) }))
      .filter(c => isFinite(c.lat) && isFinite(c.lon));

    if (coords.length > 0) {
      const avgLat = coords.reduce((s, c) => s + c.lat, 0) / coords.length;
      const avgLon = coords.reduce((s, c) => s + c.lon, 0) / coords.length;
      lat = avgLat;
      lon = avgLon;
    }
  }

  if (!lat || !lon) return <div className="p-4 text-gray-500">Location not available</div>;

  // limit displayed markers for performance
  const markers = events.slice(0, 500);

  return (
    <div className="h-72 md:h-96 rounded-lg overflow-hidden shadow-sm">
      <MapContainer center={[lat, lon]} zoom={6} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((e) => {
          const elat = Number(e.latitude);
          const elon = Number(e.longitude);
          if (!isFinite(elat) || !isFinite(elon)) return null;

          const title = e.source_headline || e.conflict_name || `Event ${e.id}`;

          return (
            <Marker key={e.id} position={[elat, elon]} icon={pinIcon}>
              <Popup>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-gray-600">Type: {e.type_of_violence || 'Unknown'}</div>
                <div className="text-xs text-gray-600">Deaths: {(Number(e.deaths_a)||0) + (Number(e.deaths_b)||0) + (Number(e.deaths_civilians)||0) + (Number(e.deaths_unknown)||0)}</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
