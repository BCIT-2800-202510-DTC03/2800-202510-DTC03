import {GoogleGenAI} from "@google/genai";

//replace this with a value from .env
const ai = new GoogleGenAI({apiKey: "AIzaSyBSz-vEzZ4TJD8Xwt4DQfcdWDUvipqG2xA"});

const greenerEatingPrompt = "Give me one task I can do to eat in a way that reduces my wastage or is healthier for me."

const formatSpecification = " Do not include any pleasantries and only provide the task. Make the task a simple action statement like: 'Plan your meals for the week' Keep the wording simple, and use as few words as possible while still conveying the full message. Keep the tasks to something that can be done in a day. Do not provide anything too specific."

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: greenerEatingPrompt + " " + formatSpecification,
    })
    console.log(response.text);
}

main();