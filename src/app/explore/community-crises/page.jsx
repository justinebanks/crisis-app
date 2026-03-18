"use client";

import dynamic from "next/dynamic";
import { communityCrisisData } from "@/actions/community-crisis-data";

const CommunityMap = dynamic(() => import("@/components/community/CommunityMap"), {
    ssr: false,
    loading: () => <div className="p-4 text-gray-500">Loading map...</div>,
});

export default function CommunityCrisesPage() {
    return (
        <div>
            <CommunityMap communityCrisisData={communityCrisisData} />
        </div>
    )
}