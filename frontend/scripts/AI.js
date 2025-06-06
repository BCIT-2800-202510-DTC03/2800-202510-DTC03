/* global axios */

import { GoogleGenAI } from "https://esm.run/@google/genai";

import { backendURL } from "../util.js";

import { loadUserTasks } from "./userTasks.js";

const apiKeyResponse = await axios.get(`${backendURL}/API/AIAPI`, {
    withCredentials: true,
});

const apiKey = apiKeyResponse.data.apiKey;
//replace this with a value from .env

const ai = new GoogleGenAI({ apiKey: `${apiKey}` });
const model = "gemini-2.0-flash";
var previousResponse = "";
let userGoal;
let thisTask = "";
let userID;

//goal prompts
const greenerEatingPrompt =
    "Give me a task I can do to eat in a way that reduces my wastage or is healthier for me. Do not suggest things like reducing portion size or anything related to diets. keep tasks related to things like zero-waste eating, adding more nutrients to meals, or eating less processed food. Do not suggest anything that requires a huge change in lifestyle.";

const transportationPrompt =
    "Give me a task I can do to improve my environmental impact related to transportation. Do not suggest things that may require large purchases. Keep tasks related to things like walking to the grocery store, using the bus, or riding a bike. Do not suggest anything that requires a huge change in lifestyle.";

const wasteReductionPrompt =
    "Give me a task I can do to improve my environmental impact related to my waste from things like garbage. Do not suggest things that may require large purchases. Keep tasks related to things like composting more, recycling more, buying items in reusable packaging, and donating unwanted but still usable items. Tasks may be something that I may do over a longer period of time.";

const resourceConservationPrompt =
    "Give me a task I can do to improve my environmental impact related to my resource consumption. Do not suggest things that may require large purchases. Keep tasks related to things like turning off the tap, shortening shower times, and turning off lights when not in use. Tasks may be something that I may do over a longer period of time but should be written in a way that is immediate. Keep tasks related to reducing water or electricity usage.";

const consciousConsumptionPrompt =
    "Give me a task I can do to improve my environmental impact related to my purchases of new items. Do not suggest things that require a huge change in lifestyle. Keep tasks related to things like thrifting clothes, buying used items, and other activities that promote buying used or from local stores as opposed to large corporate stores. These should be actionable, like visit your local thrift store, or go to a farmers market. Keep wording simple. Tasks should encourage reducing spending.";

//previous acceptable tasks for it to reference.
const previousGreenerEating =
    "Here are some examples of perfect tasks to give as responses. *   Buy produce with minimal packaging.*   Add a handful of spinach to smoothies.*   Cook one meal from scratch.*   Compost food scraps.*   Swap white bread for whole grain.*   Eat leftovers for lunch.*   Use vegetable scraps for broth.*   Make homemade salad dressing.*   Bring a reusable shopping bag. You may provide ones from this list, but should mainly create your own. Keep tasks realistic.";

const previousTransport =
    "Here are some examples of perfect tasks to give as responses. *   Walk to nearby errands.*   Take public transport for one trip.*   Bike instead of drive today.*   Combine errands into one trip.*   Carpool with someone today.*   Walk during your lunch break.*   Research public transit routes.*   Walk instead of driving for short distances.*   Plan a bike route. You may provide ones from this list, but should mainly create your own. Keep tasks realistic.";

const previousWasteReduction =
    "Here are some examples of perfect tasks to give as responses. 1.  Start a home compost bin.2.  Recycle all eligible materials.3.  Choose reusable packaging when shopping.4.  Reduce food waste at each meal.5.  Research local recycling guidelines.6.  Repair broken items instead of replacing.7.  Segregate waste into specific categories.8.  Repurpose empty containers for storage.9.  Find alternatives to single-use plastic.10.  Donate unwanted clothing.11.  Compost food scraps today.12.  Avoid single-use plastics. You may provide ones from this list, but should mainly create your own. Keep tasks realistic.";

const previousResourceConservaton =
    "Here are some examples of perfect tasks to give as responses. *   Reduce shower time.*   Collect excess tap water for plants.*   Unplug electronics when not charging.*   Wash clothes with cold water.*   Air dry laundry.*   Turn off lights leaving a room.*   Conserve water while brushing teeth.*   Limit appliance usage.*   Turn off unnecessary lights. You may provide ones from this list, but should mainly create your own. Keep tasks realistic.";

const previousConsciousConsumption =
    "Here are some examples of perfect tasks to give as responses.*Skip one non-essential purchase today.Find an item on your list that can be bought secondhand.Declutter one area and donate unused items.Borrow something instead of buying it.Research a sustainable brand before purchasing.Resist an impulse buy today. *   Visit a local thrift store.*   Buy produce at a farmers market. *   Make a list of what you need to buy. You may provide ones from this list, but should mainly create your own. Keep tasks realistic.";

//formatting prompt
const formatSpecification =
    " Do not include any pleasantries and only provide the task. Make the task a simple action statement like: 'Plan your meals for the week' Keep the wording simple, and use as few words as possible while still conveying the full message. Keep the tasks to something that can be done in a day. Avoid using words like 'my' or 'you' keep to action statements. Tasks should be a complete-able action that I can check off. Give a SINGULAR TASK.";

async function getUserId() {
    try {
        const response = await axios.post(
            `${backendURL}/user/userID`,
            {},
            { withCredentials: true }
        );
        return response.data.userId;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log(error.response.data.error_message);
        } else {
            console.log("Something is going wrong. Please try again.");
        }
    }
}
async function readUserGoal() {
    try {
        const userInfo = await axios.get(`${backendURL}/user/UserInfo`, {
            withCredentials: true,
        });
        console.log("userinfo", userInfo.data.goal);
        return userInfo.data.goal;
    } catch (error) {
        console.error("cannot read user's goal", error);
        return null;
    }
}

async function getGoal(userGoal) {
    //get user goal
    //determine prompt that should be used
    switch (userGoal) {
        // case "greenerEating":
        //     return greenerEatingPrompt;
        case "transportation":
            return transportationPrompt + " " + previousTransport;
        case "wasteReduction":
            return wasteReductionPrompt + " " + previousWasteReduction;
        case "resourceConservation":
            return (
                resourceConservationPrompt + " " + previousResourceConservaton
            );
        case "consciousConsumption":
            return (
                consciousConsumptionPrompt + " " + previousConsciousConsumption
            );
        default:
            return greenerEatingPrompt + " " + previousGreenerEating;
    }
}

async function callAI() {
    var task = "";
    if (!previousResponse) {
        task = await ai.models.generateContent({
            model: model,
            contents: (await getGoal()) + " " + formatSpecification,
        });
        console.log("fetching first AI");
    } else {
        const priorResponse =
            "Provide a different response than your previous response which was: " +
            previousResponse;
        task = await ai.models.generateContent({
            model: model,

            contents:
                (await getGoal()) +
                " " +
                formatSpecification +
                " " +
                priorResponse,
        });
    }
    return task;
}

function createTask(taskText) {
    thisTask = taskText;
    // populate the tasks in the pop-up cards
    const aiTask = document.getElementById("AI-task-desc");
    // aiTask.innerHTML = `Your new task is:<br>${task}`;
    // get another new task

    if (aiTask) {
        aiTask.innerHTML = `Your new task is:<br>${taskText}`;
    } else {
        console.warn("AI task display element not found in DOM.");
    }
}

async function getTask() {
    try {
        const response = await callAI();
        console.log(response.text);
        // taskText is the nested formate that Gemini returns. We have to dig through the array to get the description we want. Layout looks like:
        // {
        //     "response": {
        //       "candidates": [
        //         {
        //           "content": {
        //             "parts": [
        //               { "text": "Your generated task here" }
        //             ]
        //           }
        //         }
        //       ]
        //     }
        //   }
        const taskText =
            response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!taskText) {
            console.warn("Empty task text from Gemini.");
            alert("AI failed to generate a task. Try again.");
            return;
        }
        thisTask = taskText;
        previousResponse = taskText;
        console.log("thisTask:", thisTask);
        createTask(taskText);
    } catch (err) {
        console.error("Error in getTask:", err);
    }
}

async function saveTask() {
    //save the task to mongodb
    console.log("Saving task with thisTask:", thisTask);
    const AiTask = {
        isAIGenerated: true,
        description: thisTask,
        category: userGoal,
        completed: false,
    };
    console.log("task created", AiTask);

    try {
        const response = await axios.post(
            `${backendURL}/userTasks/add`,
            AiTask,
            { withCredentials: true }
        );
        if (response.status === 200) {
            console.log("sent ai task data to server");
            await loadUserTasks();
            // a pop up to show the new
            // const popup = document.getElementById("New-task-popup");
            // popup.style.display = "block";
        }
        let reloaded = false;

        if (!reloaded) {
            window.location.reload();
            reloaded = true;
        }
    } catch (error) {
        console.error("failed to sent ai task data to server", error);
    }
    // and we need to rerender the tasklist, maybe we need to pass it to home.js
}

function main() {
    const trigger = document.getElementById("AI-task-btn");

    trigger.addEventListener("click", getTask);
    // bind getTask to reroll button
    document.getElementById("AI-reroll").addEventListener("click", getTask);
    // bind taskAccept to accept button
    document.getElementById("AI-accept").addEventListener("click", saveTask);
}

userGoal = await readUserGoal();
userID = await getUserId();
if (!userGoal) {
    console.error("No goals found for user.");
}
if (userID) {
    console.log(userID);
}
main();
