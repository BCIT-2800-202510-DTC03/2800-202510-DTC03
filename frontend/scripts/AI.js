import {GoogleGenAI} from "@google/genai";

//replace this with a value from .env
const ai = new GoogleGenAI({apiKey: "AIzaSyBSz-vEzZ4TJD8Xwt4DQfcdWDUvipqG2xA"});

const greenerEatingPrompt = "Give me a list of 3 tasks I can do to eat in a way that reduces my wastage or is healthier for me. Do not suggest things like reducing portion size or anything related to diets. keep tasks related to things like zero-waste eating, adding more nutrients to meals, or eating less processed food. Do not suggest anything that requires a huge change in lifestyle."

const formatSpecification = " Do not include any pleasantries and only provide the task. Make the task a simple action statement like: 'Plan your meals for the week' Keep the wording simple, and use as few words as possible while still conveying the full message. Keep the tasks to something that can be done in a day."

const model = "gemini-2.0-flash";
var previousResponse = "";

async function callAI() {
    var task = "";
    if (!previousResponse){
        task = await ai.models.generateContent({
            model: model,
            contents: greenerEatingPrompt + " " + formatSpecification,
        });
    } else{
        const priorResponse = "Provide a different response than your previous response which was: " + previousResponse;
        task = await ai.models.generateContent({
            model: model,
            contents: greenerEatingPrompt + " " + formatSpecification + " " + priorResponse,
        })
    }
    return task;
}

async function main() {
    const response = await callAI();
    console.log(response.text);
    previousResponse = response;
}

main();