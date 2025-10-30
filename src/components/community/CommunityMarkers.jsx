"use client";

import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Link from "next/link";

// NOTE: react-leaflet-markercluster depends on leaflet.markercluster. Make sure
// to install `react-leaflet-markercluster leaflet.markercluster`.

const CommunityMarkers = ({ disasters }) => {
    const blueIcon = new Icon({
        iconUrl: "/marker-blue.svg",
        iconSize: [50,50],
    })

    return disasters.length > 0 ? (
        <MarkerClusterGroup chunkedLoading>
            {disasters.map((disaster) => {
                return (
                    <Marker key={disaster.id} position={[disaster.lat, disaster.lon]} icon={blueIcon}>
                        <Popup>
                            <h3>{disaster.name}</h3>
                            <Link href={`/disasters/community/${disaster.id}`}>View Details</Link>
                        </Popup>
                    </Marker>
                );
            })}
        </MarkerClusterGroup>
    ) : <div>Loading...</div>;
};

export default CommunityMarkers;

