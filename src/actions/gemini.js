"use server";

import { GoogleGenAI } from "@google/genai";

// Summarize A disaster's long un-readable description
export async function summarizeWithGemini(disasterDescription, maxWords = 150) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize this description of a disaster in less than ${maxWords} words: ` + (disasterDescription || ""),
    });

    return response.text;
}

// Get Images relating to a disaster
export async function getImagesWithGemini(disasterDescription, count = 6) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Search the internet in order to provide a list of links to ${count} images on the internet that are related to this disaster that is occurring in the world right now: ` + (disasterDescription || "" + ". Return data in JSON array format. Remember that I need direct image URLs only and that the information you need requires you to do a web search to find the most relevant images. Even if the data is from a later date than the current date, you must find a way to get it for me."),
    })

    return response.text;
}

// Suggestions for ways to help with disaster relief
export async function getReliefSuggestionsWithGemini(disasterDescription, numSuggestions = 5) {

}
