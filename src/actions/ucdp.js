"use server";

const formatUCDPEvent = event => ({
    id: event.id,
    conflict_name: event.conflict_name,
    conflict_new_id: event.conflict_new_id,
    // dyad_name: event.dyad_name,
    // dyad_new_id: event.dyad_new_id,
    // side_a: event.side_a,
    // side_a_new_id: event.side_a_new_id,
    // side_b: event.side_b,
    // side_b_new_id: event.side_b_new_id,
    code_status: event.code_status,
    type_of_violence: event.type_of_violence,

    // country: event.country,
    // country_id: event.country_id,
    // region: event.region,
    latitude: event.latitude,
    longitude: event.longitude,

    source_headline: event.source_headline,
    // source_article: event.source_article,
    source_office: event.source_office,

    date_start: event.date_start,
    date_end: event.date_end,
    // year: event.year,

    deaths_a: event.deaths_a,
    deaths_b: event.deaths_b,
    deaths_civilians: event.deaths_civilians,
    deaths_unknown: event.deaths_unknown,
});


export async function getUCDPEvents(datasetVersion, parameters = {}) {
    const params = new URLSearchParams({
        pagesize: 1000,
        page: 0,
        ...parameters
    });

    try {
        const response = await fetch(`https://ucdpapi.pcr.uu.se/api/gedevents/${datasetVersion}?${params.toString()}`, { method: "GET" });
        const result = await response.json();

        if (result.Message) {
            throw new Error(result.Message);
        }

        return {
            totalEvents: result["TotalCount"],
            totalPages: result["TotalPages"],
            events: result["Result"].map(event => formatUCDPEvent(event))
        };
    } catch (error) {
        console.error(error);
    };
}


export async function getAllUCDPEvents(datasetVersion, parameters = {}) {
    let allEvents = [];

    console.log("Fetching all UCDP events...");

    const firstRequest = await getUCDPEvents(datasetVersion, {page: 0, pagesize: 1, ...parameters });
    const totalEvents = firstRequest.totalEvents;
    const totalPages = Math.ceil(totalEvents / 1000);
    
    console.log(`Total Events: ${totalEvents}, Total Pages: ${totalPages}`);

    const allPromises = Array.from({ length: totalPages }, (_, i) => i).map(async (page) => {
        const pagedParameters = { ...parameters, page, pagesize: 1000 };
        console.log("Fetching UCDP Page ", page);
        return getUCDPEvents(datasetVersion, pagedParameters);
    });

    const allPageResults = await Promise.all(allPromises);
    allEvents = allPageResults.map(result => result.events).flat();

    return {
        totalEvents: allEvents.length,
        events: allEvents
    };
}

export async function getUCDPConflict(conflictId) {
    try {
        const response = await fetch(`https://ucdp.uu.se/api/conflict/${conflictId}`, { method: "GET" });
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error(error);
    }
}


export async function getUCDPActor(conflictId) {
    try {
        const response = await fetch(`https://ucdp.uu.se/api/actor/${conflictId}`, { method: "GET" });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function getArmedConflicts(events) {
    let conflicts = [];
    const uniqueConflicts = [...new Set(events.map(event => event.conflict_name))];

    for (let conflict of uniqueConflicts) {
        const individualEvents = events.filter(event => event.conflict_name === conflict)
        let totalDeaths = 0;

        individualEvents.map(event => totalDeaths += event.deaths_a + event.deaths_b + event.deaths_civilians + event.deaths_unknown);

        conflicts.push({
            id: individualEvents[0].conflict_new_id,
            name: conflict,
            deaths: totalDeaths,
            // events: individualEvents,
        });
    }

    return conflicts.sort((a, b) => b.deaths - a.deaths);
}

// const events = await getUCDPEvents("25.0.8");
// const conflicts = getArmedConflicts(events);

// // console.log("Events: ", events)
// console.log("Conflicts: ", conflicts);
// console.log("Total Conflicts Fetched:", conflicts.length);
// console.log("Total Events:", events.totalEvents);

