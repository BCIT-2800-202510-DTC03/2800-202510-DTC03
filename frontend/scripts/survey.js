/* global axios */

import { backendURL } from "../util.js";

const surveyQuestions = [
    {
        name: "Do you want to eat more plant-based meals?",
        options: {
            o1: { desc: "Yes, I'm ready to commit", point: 3 },
            o2: { desc: "Maybe, I want to try slowly", point: 2 },
            o3: { desc: "Not really", point: 1 },
        },
        type: "greenerEating",
    },
    {
        name: "Would you like to reduce how often you eat out?",
        options: {
            o1: { desc: "Yes, I want to cook more at home", point: 3 },
            o2: { desc: "A little, for health or sustainability", point: 2 },
            o3: { desc: "No, I enjoy eating out", point: 1 },
        },
        type: "greenerEating",
    },

    {
        name: "Would you like to rely less on personal vehicles?",
        options: {
            o1: { desc: "Yes, I want to switch to greener options", point: 3 },
            o2: { desc: "I’m open to some changes", point: 2 },
            o3: { desc: "No, it’s not realistic for me", point: 1 },
        },
        type: "transportation",
    },
    {
        name: "Do you want to use public transport, bike, or walk more?",
        options: {
            o1: { desc: "Yes, I want to make that shift", point: 3 },
            o2: { desc: "Occasionally, when convenient", point: 2 },
            o3: { desc: "No, I prefer driving", point: 1 },
        },
        type: "transportation",
    },

    {
        name: "Would you like to reduce your household waste?",
        options: {
            o1: { desc: "Yes, I want to minimize it", point: 3 },
            o2: { desc: "A little, where I can", point: 2 },
            o3: { desc: "Not a priority for me", point: 1 },
        },
        type: "wasteReduction",
    },
    {
        name: "Do you want to recycle or compost more consistently?",
        options: {
            o1: { desc: "Yes", point: 3 },
            o2: { desc: "A bit", point: 2 },
            o3: { desc: "Not really", point: 1 },
        },
        type: "wasteReduction",
    },

    {
        name: "Would you like to use less electricity or energy at home?",
        options: {
            o1: { desc: "Yes, I want to lower my impact", point: 3 },
            o2: { desc: "Maybe, if it's easy to start", point: 2 },
            o3: { desc: "Not really", point: 1 },
        },
        type: "resourceConservation",
    },
    {
        name: "Do you want to be more mindful of your water use?",
        options: {
            o1: { desc: "Yes, I’m actively trying to reduce it", point: 3 },
            o2: { desc: "Somewhat, I can improve a little", point: 2 },
            o3: { desc: "Not concerned about water use", point: 1 },
        },
        type: "resourceConservation",
    },

    {
        name: "Do you want to reduce how often you buy new things?",
        options: {
            o1: { desc: "Yes, I prefer second-hand or reusing", point: 3 },
            o2: { desc: "A mix is fine", point: 2 },
            o3: { desc: "No, I enjoy shopping new", point: 1 },
        },
        type: "consciousConsumption",
    },
    {
        name: "Would you like to choose more reusable items over single-use ones?",
        options: {
            o1: { desc: "Yes, I want to make the switch", point: 3 },
            o2: { desc: "Sometimes, if it's convenient", point: 2 },
            o3: { desc: "Not really", point: 1 },
        },
        type: "consciousConsumption",
    },
    {
        name: "Is buying environmentally friendly products a goal for you?",
        options: {
            o1: { desc: "Yes, that’s very important to me", point: 3 },
            o2: { desc: "It matters somewhat", point: 2 },
            o3: { desc: "Not something I focus on", point: 1 },
        },
        type: "consciousConsumption",
    },
];

var current = 0;
const userResponses = [];
const startButton = document.getElementById("start-button");
const questionName = document.getElementById("question-title");
const surveyContainer = document.getElementById("questions-form");

function main() {
    startButton.addEventListener("click", getNextQuestion);
}

function getNextQuestion() {
    if (current > 0) {
        const selected = document.querySelector(
            'input[name="option-' + (current - 1) + '"]:checked'
        );
        if (selected) {
            userResponses[current] = parseInt(selected.value);
        } else {
            alert("Please select an option before continuing.");
            return;
        }
    } else {
        const startText = document.getElementById("starting-text");
        startText.style = "display:none;";
        startButton.style = "transform: translateX(50%) translateY(-100%);";
    }
    surveyContainer.innerHTML = "";
    if (current === surveyQuestions.length - 1) {
        startButton.innerText = "Finish";
    } else {
        startButton.innerText = "Next Question";
    }
    if (current === surveyQuestions.length) {
        startButton.style = "display:none;";
        displayResults();
        return;
    }

    const question = surveyQuestions[current];
    questionName.innerText = question.name;
    Object.values(question.options).forEach((option) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
                    <input type="radio" class="survey-input" name="option-${current}" id="${option.desc}" value="${option.point}">
                    <label for="${option.desc}" class="option-label">${option.desc}</label>
                    `;
        surveyContainer.appendChild(div);
    });
    current++;
    console.log(userResponses);
}

function displayResults() {
    let resultText = "";
    let resultCategory = getResults();
    questionName.innerText = "Your goal is...";
    questionName.style = "height: 5vh;";
    switch (resultCategory) {
        case "greenerEating":
            resultText = "To eat greener!";
            break;
        case "transportation":
            resultText = "To change up your transit!";
            break;
        case "wasteReduction":
            resultText = "To reduce your waste!";
            break;
        case "resourceConservation":
            resultText = "To conserve more resources!";
            break;
        case "consciousConsumption":
            resultText = "To consume more environmentally conscious products!";
            break;
        default:
            resultText = resultCategory;
            break;
    }
    surveyContainer.innerHTML = `
        <p class="result-p">${resultText}</p>
        <button id="ctn-btn">Looks good!</button><br/>
        <div id="result-b-wrapper">
        <p class="result-p" id="again-p">Not quite what you were thinking?</p>
        <button class="result-b" id="choose-btn">Choose my own goal</button>
        </div>`;

    const continuebtn = document.getElementById("ctn-btn");
    continuebtn.addEventListener("click", async (event) => {
        event.preventDefault();
        // Redirect user to home page + store user goal
        try {
            await axios.post(
                `${backendURL}/user/updateInfo`,
                {
                    aboutMe: "",
                    pfp: "",
                    goal: resultCategory,
                },
                {
                    withCredentials: true,
                }
            );
            window.location.href = "../pages/home.html";
        } catch (error) {
            console.error("Failed to store user goal.", error);
        }
    });

    const choosebtn = document.getElementById("choose-btn");
    choosebtn.addEventListener("click", async (event) => {
        event.preventDefault();
        surveyContainer.innerHTML = `<p class="result-p">${resultText}</p>
        <button id="ctn-btn">Looks good!</button><br/>
        <div id="result-b-wrapper">
        <p class="result-p" id="again-p">Choose a goal</p>
        <div id="goal-select-wrap">
            <select id="goal-select">
                <option value="greenerEating">To eat greener!</option>
                <option value="transportation">To change up my transit!</option>
                <option value="wasteReduction">To reduce my waste!</option>
                <option value="resourceConservation">To conserve more resources!</option>
                <option value="consciousConsumption">To consume more environmentally conscious products!</option>
            </select>
        </div>
        <button id="choose-ctn-btn">Select Goal</button>
        </div>`;
        chooseOwnGoal();
    });
}

function chooseOwnGoal() {
    const ctnChoose = document.getElementById("choose-ctn-btn");
    ctnChoose.addEventListener("click", async (event) => {
        event.preventDefault();
        const chosenGoal = document.getElementById("goal-select").value;
        console.log(chosenGoal);
        try {
            await axios.post(
                `${backendURL}/user/updateInfo`,
                {
                    aboutMe: "",
                    pfp: "",
                    goal: chosenGoal,
                },
                {
                    withCredentials: true,
                }
            );
            window.location.href = "../pages/home.html";
        } catch (error) {
            console.error("Failed to store user goal.", error);
        }
    });
}

function getResults() {
    let categoryTotals = {
        greenerEating: 0,
        transportation: 0,
        wasteReduction: 0,
        resourceConservation: 0,
        consciousConsumption: 0,
    };

    let categoryCount = {
        greenerEating: 0,
        transportation: 0,
        wasteReduction: 0,
        resourceConservation: 0,
        consciousConsumption: 0,
    };

    surveyQuestions.forEach((question, index) => {
        const response = userResponses[index];

        categoryTotals[question.type] += response;
        categoryCount[question.type] += 1;
    });

    const Averages = {};
    for (const category in categoryTotals) {
        Averages[category] = categoryTotals[category] / categoryCount[category];
    }

    let highest = "";
    let highestAvg = 0;
    for (const category in Averages) {
        if (Averages[category] > highestAvg) {
            highestAvg = Averages[category];
            highest = category;
        }
    }

    return highest;
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
