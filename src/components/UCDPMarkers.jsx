"use client";

import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Link from "next/link";


const UCDPMarkers = ({ disasters }) => {
    const redIcon = new Icon({
        iconUrl: "/marker-red.svg",
        iconSize: [50,50],
    })

    return disasters.length > 0 ? (
        <MarkerClusterGroup chunkedLoading>
            {disasters.map((disaster) => {
                const lat = Number(disaster.latitude);
                const lon = Number(disaster.longitude);
                if (!isFinite(lat) || !isFinite(lon)) return null;

                return (
                    <Marker key={disaster.id} position={[lat, lon]} icon={redIcon}>
                        <Popup>
                            <h3>{disaster.conflict_name}</h3>
                            <p>{disaster.source_headline}</p>
                            <Link href={`/disasters/ucdp/${disaster.conflict_new_id}`}>View Details</Link>
                        </Popup>
                    </Marker>
                );
            })}
        </MarkerClusterGroup>
    ) : <div>Loading...</div>;
};

export default UCDPMarkers;

