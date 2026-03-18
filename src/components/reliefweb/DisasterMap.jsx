"use client";

import dynamic from "next/dynamic";

const DisasterMapClient = dynamic(() => import("./DisasterMapClient"), {
  ssr: false,
  loading: () => <div className="p-3 text-gray-500">Loading map...</div>,
});

export default function DisasterMap({ lat, lon, title }) {
  return <DisasterMapClient lat={lat} lon={lon} title={title} />;
}
