import { GoogleGenAI } from "https://esm.run/@google/genai";

const backendURLTest = "http://localhost:3000";

const apiKeyResponse = await axios.get(backendURLTest + "/API/AIAPI", {
    withCredentials: true,
});

const apiKey = apiKeyResponse.data.apiKey;

//replace this with a value from .env
const ai = new GoogleGenAI({ apiKey: `${apiKey}` });

//goal prompts
const greenerEatingPrompt = "Give me a task I can do to eat in a way that reduces my wastage or is healthier for me. Do not suggest things like reducing portion size or anything related to diets. keep tasks related to things like zero-waste eating, adding more nutrients to meals, or eating less processed food. Do not suggest anything that requires a huge change in lifestyle."

const transportationPrompt = "Give me a task I can do to improve my environmental impact related to transportation. Do not suggest things that may require large purchases. Keep tasks related to things like walking to the grocery store, using the bus, or riding a bike. Do not suggest anything that requires a huge change in lifestyle."

const wasteReductionPrompt = "Give me a task I can do to improve my environmental impact related to my waste from things like garbage. Do not suggest things that may require large purchases. Keep tasks related to things like composting more, recycling more, buying items in reusable packaging, and donating unwanted but still usable items. Tasks may be something that I may do over a longer period of time."

const resourceConservationPrompt = "Give me a task I can do to improve my environmental impact related to my resource consumption. Do not suggest things that may require large purchases. Keep tasks related to things like turning off the tap, shortening shower times, and turning off lights when not in use. Tasks may be something that I may do over a longer period of time but should be written in a way that is immediate. Keep tasks related to reducing water or electricity usage."

const consciousConsumptionPrompt = "Give me a task I can do to improve my environmental impact related to my purchases of new items. Do not suggest things that require a huge change in lifestyle. Keep tasks related to things like thrifting clothes, buying used items, and other activities that promote buying used or from local stores as opposed to large corporate stores. These should be actionable, like visit your local thrift store, or go to a farmers market. Keep wording simple. Tasks should encourage reducing spending."


//previous acceptable tasks for it to reference.
const previousGreenerEating = "Here are some examples of perfect tasks to give as responses. *   Buy produce with minimal packaging.*   Add a handful of spinach to smoothies.*   Cook one meal from scratch.*   Compost food scraps.*   Swap white bread for whole grain.*   Eat leftovers for lunch.*   Use vegetable scraps for broth.*   Make homemade salad dressing.*   Bring a reusable shopping bag. You may provide ones from this list, but should mainly create your own. Keep tasks realistic."

const previousTransport = "Here are some examples of perfect tasks to give as responses. *   Walk to nearby errands.*   Take public transport for one trip.*   Bike instead of drive today.*   Combine errands into one trip.*   Carpool with someone today.*   Walk during your lunch break.*   Research public transit routes.*   Walk instead of driving for short distances.*   Plan a bike route. You may provide ones from this list, but should mainly create your own. Keep tasks realistic."

const previousWasteReduction = "Here are some examples of perfect tasks to give as responses. 1.  Start a home compost bin.2.  Recycle all eligible materials.3.  Choose reusable packaging when shopping.4.  Reduce food waste at each meal.5.  Research local recycling guidelines.6.  Repair broken items instead of replacing.7.  Segregate waste into specific categories.8.  Repurpose empty containers for storage.9.  Find alternatives to single-use plastic.10.  Donate unwanted clothing.11.  Compost food scraps today.12.  Avoid single-use plastics. You may provide ones from this list, but should mainly create your own. Keep tasks realistic."

const previousResourceConservaton = "Here are some examples of perfect tasks to give as responses. *   Reduce shower time.*   Collect excess tap water for plants.*   Unplug electronics when not charging.*   Wash clothes with cold water.*   Air dry laundry.*   Turn off lights leaving a room.*   Conserve water while brushing teeth.*   Limit appliance usage.*   Turn off unnecessary lights. You may provide ones from this list, but should mainly create your own. Keep tasks realistic."

const previousConsciousConsumption = "Here are some examples of perfect tasks to give as responses.*Skip one non-essential purchase today.Find an item on your list that can be bought secondhand.Declutter one area and donate unused items.Borrow something instead of buying it.Research a sustainable brand before purchasing.Resist an impulse buy today. *   Visit a local thrift store.*   Buy produce at a farmers market. *   Make a list of what you need to buy. You may provide ones from this list, but should mainly create your own. Keep tasks realistic."

//formatting prompt
const formatSpecification = " Do not include any pleasantries and only provide the task. Make the task a simple action statement like: 'Plan your meals for the week' Keep the wording simple, and use as few words as possible while still conveying the full message. Keep the tasks to something that can be done in a day. Avoid using words like 'my' or 'you' keep to action statements. Tasks should be a complete-able action that I can check off. Give a SINGULAR TASK."

const model = "gemini-2.0-flash";
var previousResponse = "";

function getGoal() {
    //get user goal
    const userGoal = "";
    //determine prompt that should be used
    switch (userGoal) {
        // case "greenerEating":
        //     return greenerEatingPrompt;
        case "transportation":
            return transportationPrompt + " " + previousTransport;
        case "wasteReduction":
            return wasteReductionPrompt + " " + previousWasteReduction;
        case "resourceConservation":
            return resourceConservationPrompt + " " + previousResourceConservaton;
        case "consciousConsumption":
            return consciousConsumptionPrompt + " " + previousConsciousConsumption;
        default:
            return greenerEatingPrompt + " " + previousGreenerEating;
    }
}


async function callAI() {
    var task = "";
    if (!previousResponse) {
        task = await ai.models.generateContent({

            model: model,
            contents: getGoal() + " " + formatSpecification,
        }); console.log("fetching first AI");
    } else {
        const priorResponse = "Provide a different response than your previous response which was: " + previousResponse;
        task = await ai.models.generateContent({
            model: model,
            contents: getGoal() + " " + formatSpecification + " " + priorResponse,
        })
    }
    return task;
}

function createTask(task) {
    console.log(task);
}


async function getTask() {
    const response = await callAI();
    console.log(response.text);
    previousResponse = response;
    // console.log(previousResponse);
    createTask(response);
}


function main() {
    const trigger = document.getElementById("AI-task-btn");
    // trigger.addEventListener("click", getTask);
    getTask();
}

main();