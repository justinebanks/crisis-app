"use server";

const APP_NAME = "OrgCongressionalApp4953";

async function fetchReliefWebJson(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent": "crisis-app/1.0",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`ReliefWeb request failed (${response.status}): ${errorBody.slice(0, 200)}`);
    }

    return response.json();
}


export async function getRWDisasters(parameters) {
    const params = new URLSearchParams({
        "appname": APP_NAME,
        "preset": "external",
        ...parameters
    });

    console.log("Params: ", params.toString());

    const response = await fetchReliefWebJson(`https://api.reliefweb.int/v2/disasters?${params.toString()}`);
    return response;
}

export async function getRWDisasterByID(disasterID) {
    const params = new URLSearchParams({
        "appname": APP_NAME
    });

    const response = await fetchReliefWebJson(`https://api.reliefweb.int/v2/disasters/${disasterID}?${params.toString()}`);
    return response;
}

export async function getRWReportsByDisasterID(disasterID) {
    const params = new URLSearchParams({
        "appname": APP_NAME,
        "filter[field]": "disaster.id",
        "filter[value]": disasterID,
    });

    const response = await fetchReliefWebJson(`https://api.reliefweb.int/v2/reports?${params.toString()}`);
    return response;
}
