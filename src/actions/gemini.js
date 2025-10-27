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
        contents: `Provide a list of links to ${count} images on the internet that are related to this disaster: ` + (disasterDescription || "" + ". Return data in JSON array format."),
    })
}

// Suggestions for ways to help with disaster relief
export async function getReliefSuggestionsWithGemini(disasterDescription, numSuggestions = 5) {

}
