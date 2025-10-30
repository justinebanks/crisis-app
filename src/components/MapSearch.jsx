"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getArmedConflicts } from "@/actions/ucdp";

export default function MapSearch({ reliefWebData, ucdpData }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [conflicts, setConflicts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const updatedConflicts = await getArmedConflicts(ucdpData);
            setConflicts(updatedConflicts);
        }

        fetchData();
    }, [ucdpData]);



    return (
        <div className="w-200 p-4 bg-white shadow-md z-10 h-screen overflow-y-scroll">
            <Link href="/explore/community-crises" className="absolute bottom-3 left-3 p-3 border-gray-500 border-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500">Explore Community-Submitted Crises</Link>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search disasters..."
                className="w-full p-2 border border-gray-300 rounded text-black"
            />
            <div className="p-3">
                <h2 className="font-bold text-lg m-2">ReliefWeb Search Results</h2>
                <ul className="overflow-y-scroll h-75 border-1 border-gray-300 p-2">
                    {searchTerm == "" ? <p>Search for humanitarian crises</p> : reliefWebData
                        .filter(item =>
                            item.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(item => (
                            <li key={item.id} className="border-b border-gray-200 py-2 hover:bg-gray-200"><Link href={`/disasters/reliefweb/${item.id}`}>{item.name}</Link></li>
                        ))}
                </ul>
            </div>
            <div className="p-3">
                <h2 className="font-bold text-lg m-2">UCDP Search Results</h2>
                <ul className="overflow-y-scroll h-75 border-1 border-gray-300 p-2">
                    {searchTerm == "" ? <p>Search for armed conflicts</p> : conflicts
                        .filter(item =>
                            item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(conflict => (
                            <li key={conflict.id} className="border-b border-gray-200 py-2 hover:bg-gray-200"><Link href={`/disasters/ucdp/${conflict.id}`}>{conflict.name}</Link></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}