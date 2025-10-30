"use client";

import CommunityMap from "@/components/community/CommunityMap";
import { communityCrisisData } from "@/actions/community-crisis-data";

export default function CommunityCrisesPage() {
    return (
        <div>
            <CommunityMap communityCrisisData={communityCrisisData} />
        </div>
    )
}