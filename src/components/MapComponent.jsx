"use client";

import ReliefWebMarkers from "@/components/ReliefWebMarkers";
import UCDPMarkers from "@/components/UCDPMarkers";
import { TileLayer, MapContainer } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';


export default function MapComponent({ reliefWebData, ucdpData }) {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ReliefWebMarkers disasters={reliefWebData} />
            <UCDPMarkers disasters={ucdpData} />
        </MapContainer>
    );
}
