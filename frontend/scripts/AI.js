import {GoogleGenAI} from "@google/genai";

//replace this with a value from .env
const ai = new GoogleGenAI({apiKey: "AIzaSyBSz-vEzZ4TJD8Xwt4DQfcdWDUvipqG2xA"});

//goal prompts
const greenerEatingPrompt = "Give me a task I can do to eat in a way that reduces my wastage or is healthier for me. Do not suggest things like reducing portion size or anything related to diets. keep tasks related to things like zero-waste eating, adding more nutrients to meals, or eating less processed food. Do not suggest anything that requires a huge change in lifestyle."

const transportationPrompt = "Give me a task I can do to improve my environmental impact related to transportation. Do not suggest things that may require large purchases. Keep tasks related to things like walking to the grocery store, using the bus, or riding a bike. Do not suggest anything that requires a huge change in lifestyle."

const wasteReductionPrompt = "Give me a list of 3 tasks I can do to improve my environmental impact related to my waste from things like garbage. Do not suggest things that may require large purchases. Keep tasks related to things like composting more, recycling more, buying items in reusable packaging, and donating unwanted but still usable items. Tasks may be something that the I may do over a longer period of time."

const resourceConservationPrompt = "Give me a task I can do to "


//formatting prompt
const formatSpecification = " Do not include any pleasantries and only provide the task. Make the task a simple action statement like: 'Plan your meals for the week' Keep the wording simple, and use as few words as possible while still conveying the full message. Keep the tasks to something that can be done in a day."

const model = "gemini-2.0-flash";
var previousResponse = "1.  Start a home compost bin.2.  Recycle all eligible materials.3.  Choose reusable packaging when shopping.4.  Reduce food waste at each meal.5.  Research local recycling guidelines.6.  Repair broken items instead of replacing.7.  Segregate waste into specific categories.8.  Repurpose empty containers for storage.9.  Find alternatives to single-use plastic.10.  Donate unwanted clothing.11.  Compost food scraps today.12.  Avoid single-use plastics.";

async function callAI() {
    var task = "";
    if (!previousResponse){
        task = await ai.models.generateContent({
            model: model,
            contents: wasteReductionPrompt + " " + formatSpecification,
        });
    } else{
        const priorResponse = "Provide a different response than your previous response which was: " + previousResponse;
        task = await ai.models.generateContent({
            model: model,
            contents: wasteReductionPrompt + " " + formatSpecification + " " + priorResponse,
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