"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getAllUCDPEvents } from "@/actions/ucdp";
import { getRWDisasters } from "@/actions/reliefweb";
import MapSearch from "@/components/MapSearch";

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
	ssr: false,
	loading: () => <p>Loading Map...</p>
});


export default function Explore() {
	const [reliefWebData, setReliefWebData] = useState([]);
	const [ucdpData, setUcdpData] = useState([]);

	const fetchReliefWebDisasters = async () => {
		const data = await getRWDisasters({ 
			"query[value]": "status:ongoing", 
			"fields[include][]": "country",
			"limit": 100
		});

		console.log("ReliefWeb Data: ", data);
		setReliefWebData(data.data.map(item => item.fields));
	};

	const fetchUCDPDisasters = async () => {
		try {
			const data = await getAllUCDPEvents();
			console.log("UCDP Data: ", data);
			setUcdpData(data.events || []);
		} catch (error) {
			console.error("Failed to fetch UCDP events:", error);
			setUcdpData([]);
		}
	};

	useEffect(() => {
		fetchReliefWebDisasters();
		fetchUCDPDisasters();
	}, []);

	return reliefWebData.length > 0 || ucdpData.length > 0 ? (
		<div className="flex flex-row">
			<MapSearch reliefWebData={reliefWebData} ucdpData={ucdpData} />
			<MapComponent reliefWebData={reliefWebData} ucdpData={ucdpData} />
		</div>
	) : (
		<div>Loading...</div>
	);
}
