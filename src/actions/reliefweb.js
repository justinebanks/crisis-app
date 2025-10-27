"use server";

import puppeteer from 'puppeteer';

const APP_NAME = "OrgCongressionalApp4953";

async function fetchWithPuppeteer(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    const rawJsonText = await page.evaluate(() => document.querySelector('body').innerText);
    const jsonData = JSON.parse(rawJsonText);

    await browser.close();
    return jsonData;
}


export async function getRWDisasters(parameters) {
    const params = new URLSearchParams({
        "appname": APP_NAME,
        "preset": "external",
        ...parameters
    });

    console.log("Params: ", params.toString());

    const response = await fetchWithPuppeteer(`https://api.reliefweb.int/v2/disasters?${params.toString()}`);
    return response;
}

export async function getRWDisasterByID(disasterID) {
    const params = new URLSearchParams({
        "appname": APP_NAME
    });

    const response = await fetchWithPuppeteer(`https://api.reliefweb.int/v2/disasters/${disasterID}?${params.toString()}`);
    return response;
}

export async function getRWReportsByDisasterID(disasterID) {
    const params = new URLSearchParams({
        "appname": APP_NAME,
        "filter[field]": "disaster.id",
        "filter[value]": disasterID,
    });

    const response = await fetchWithPuppeteer(`https://api.reliefweb.int/v2/reports?${params.toString()}`);
    return response;
}
