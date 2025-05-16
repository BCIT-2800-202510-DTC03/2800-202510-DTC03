// const surveyQuestions = [
//     {
//         name: "How often do you eat out?",
//         options: {
//             o1: { desc: "Rarely (0-1 times a week)", point: 3 },
//             o2: { desc: "Occasionally (2-3 times a week)", point: 2 },
//             o3: { desc: "Frequently (4+ times a week)", point: 1 }
//         },
//         type: "greenerEating"
//     },
//     {
//         name: "How do you usually get around?",
//         options: {
//             o1: { desc: "Walk or bike", point: 3 },
//             o2: { desc: "Public transit", point: 2 },
//             o3: { desc: "Drive alone", point: 1 }
//         },
//         type: "transportation"
//     },
//     {
//         name: "How do you handle household waste?",
//         options: {
//             o1: { desc: "Compost and recycle consistently", point: 3 },
//             o2: { desc: "Recycle sometimes", point: 2 },
//             o3: { desc: "Mostly throw everything in the trash", point: 1 }
//         },
//         type: "wasteReduction"
//     },
//     {
//         name: "How energy-efficient is your home?",
//         options: {
//             o1: { desc: "I actively monitor and reduce energy use", point: 3 },
//             o2: { desc: "I try to conserve but don’t track it closely", point: 2 },
//             o3: { desc: "I don’t do much to reduce energy use", point: 1 }
//         },
//         type: "resourceConservation"
//     },
//     {
//         name: "How often do you buy new items?",
//         options: {
//             o1: { desc: "Rarely – I try to reuse or buy second-hand", point: 3 },
//             o2: { desc: "Sometimes – I mix new and used items", point: 2 },
//             o3: { desc: "Frequently – I love shopping new", point: 1 }
//         },
//         type: "consciousConsumption"
//     },
//     {
//         name: "How often do you use public transportation or carpooling?",
//         options: {
//             o1: { desc: "Very often", point: 3 },
//             o2: { desc: "Occasionally", point: 2 },
//             o3: { desc: "Never", point: 1 }
//         },
//         type: "transportation"
//     },
//     {
//         name: "Do you recycle at home?",
//         options: {
//             o1: { desc: "Always", point: 3 },
//             o2: { desc: "Sometimes", point: 2 },
//             o3: { desc: "Never", point: 1 }
//         },
//         type: "wasteReduction"
//     },
//     {
//         name: "How do you conserve water at home?",
//         options: {
//             o1: { desc: "Take shorter showers, fix leaks, use low-flow fixtures", point: 3 },
//             o2: { desc: "Occasionally turn off the tap when not in use", point: 2 },
//             o3: { desc: "Rarely think about water conservation", point: 1 }
//         },
//         type: "resourceConservation"
//     },
//     {
//         name: "How often do you use reusable products instead of single-use items?",
//         options: {
//             o1: { desc: "Very often", point: 3 },
//             o2: { desc: "Sometimes", point: 2 },
//             o3: { desc: "Never", point: 1 }
//         },
//         type: "consciousConsumption"
//     },
//     {
//         name: "What factors influence your decision to buy eco-friendly products?",
//         options: {
//             o1: { desc: "Environmental impact", point: 3 },
//             o2: { desc: "Cost", point: 2 },
//             o3: { desc: "Brand reputation", point: 1 }
//         },
//         type: "consciousConsumption"
//     }
// ];
const surveyQuestions = [
    {
        name: "Do you want to eat more plant-based meals?",
        options: {
            o1: { desc: "Yes, I'm ready to commit", point: 3 },
            o2: { desc: "Maybe, I want to try slowly", point: 2 },
            o3: { desc: "Not really", point: 1 }
        },
        type: "greenerEating"
    },
    {
        name: "Would you like to reduce how often you eat out?",
        options: {
            o1: { desc: "Yes, I want to cook more at home", point: 3 },
            o2: { desc: "A little, for health or sustainability", point: 2 },
            o3: { desc: "No, I enjoy eating out", point: 1 }
        },
        type: "greenerEating"
    },


    {
        name: "Would you like to rely less on personal vehicles?",
        options: {
            o1: { desc: "Yes, I want to switch to greener options", point: 3 },
            o2: { desc: "I’m open to some changes", point: 2 },
            o3: { desc: "No, it’s not realistic for me", point: 1 }
        },
        type: "transportation"
    },
    {
        name: "Do you want to use public transport, bike, or walk more?",
        options: {
            o1: { desc: "Yes, I want to make that shift", point: 3 },
            o2: { desc: "Occasionally, when convenient", point: 2 },
            o3: { desc: "No, I prefer driving", point: 1 }
        },
        type: "transportation"
    },

    {
        name: "Would you like to reduce your household waste?",
        options: {
            o1: { desc: "Yes, I want to minimize it", point: 3 },
            o2: { desc: "A little, where I can", point: 2 },
            o3: { desc: "Not a priority for me", point: 1 }
        },
        type: "wasteReduction"
    },
    {
        name: "Do you want to recycle or compost more consistently?",
        options: {
            o1: { desc: "Yes", point: 3 },
            o2: { desc: "A bit", point: 2 },
            o3: { desc: "Not really", point: 1 }
        },
        type: "wasteReduction"
    },

    {
        name: "Would you like to use less electricity or energy at home?",
        options: {
            o1: { desc: "Yes, I want to lower my impact", point: 3 },
            o2: { desc: "Maybe, if it's easy to start", point: 2 },
            o3: { desc: "Not really", point: 1 }
        },
        type: "resourceConservation"
    },
    {
        name: "Do you want to be more mindful of your water use?",
        options: {
            o1: { desc: "Yes, I’m actively trying to reduce it", point: 3 },
            o2: { desc: "Somewhat, I can improve a little", point: 2 },
            o3: { desc: "Not concerned about water use", point: 1 }
        },
        type: "resourceConservation"
    },

    {
        name: "Do you want to reduce how often you buy new things?",
        options: {
            o1: { desc: "Yes, I prefer second-hand or reusing", point: 3 },
            o2: { desc: "A mix is fine", point: 2 },
            o3: { desc: "No, I enjoy shopping new", point: 1 }
        },
        type: "consciousConsumption"
    },
    {
        name: "Would you like to choose more reusable items over single-use ones?",
        options: {
            o1: { desc: "Yes, I want to make the switch", point: 3 },
            o2: { desc: "Sometimes, if it's convenient", point: 2 },
            o3: { desc: "Not really", point: 1 }
        },
        type: "consciousConsumption"
    },
    {
        name: "Is buying environmentally friendly products a goal for you?",
        options: {
            o1: { desc: "Yes, that’s very important to me", point: 3 },
            o2: { desc: "It matters somewhat", point: 2 },
            o3: { desc: "Not something I focus on", point: 1 }
        },
        type: "consciousConsumption"
    }
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
        const selected = document.querySelector('input[name="option-' + (current - 1) + '"]:checked');
        if (selected) {
            userResponses[current] = parseInt(selected.value);
        } else {
            alert("Please select an option before continuing.");
            return;
        }
    } else {
        const startText = document.getElementById("starting-text");
        startText.style ="display:none;"
        startButton.style="transform: translateX(50%) translateY(-100%);"
    }
    surveyContainer.innerHTML="";
    if (current === surveyQuestions.length-1) {
        startButton.innerText = "Finish"
    } else {
        startButton.innerText="Next Question";
    }
    if(current === surveyQuestions.length) {
        startButton.style="display:none;"
        displayResults();
        return;
    }

    const question = surveyQuestions[current];
    questionName.innerText = question.name;
    Object.entries(question.options).forEach(([key, option]) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
                    <input type="radio" class="survey-input" name="option-${current}" id="${option.desc}" value="${option.point}">
                    <label for="${option.desc}" class="option-label">${option.desc}</label>
                    `
        surveyContainer.appendChild(div);
    });
    current++;
    console.log(userResponses);
}


function displayResults() {
    let resultText = "";
    let resultCategory = getResults();
    questionName.innerText = "Your goal is...";
    questionName.style="height: 5vh;"
    switch (resultCategory) {
        case("greenerEating"):
            resultText = "To eat greener!";
            break;
        case("transportation"):
            resultText = "To change up your transit!";
            break;
        case("wasteReduction"):
            resultText = "To reduce your waste!";
            break;
        case("resourceConservation"):
            resultText = "To conserve more resources!";
            break;
        case("consciousConsumption"):
            resultText = "To consume more environmentally conscious products!";
            break;
        default:
            resultText = resultCategory;
            break;
    };
    surveyContainer.innerHTML = `
        <p class="result-p">${resultText}</p>
        <button id="ctn-btn">Looks good!</button><br/>
        <div id="result-b-wrapper">
        <p class="result-p" id="again-p">Not quite what you were thinking?</p>
        <button class="result-b" id="choose-btn">Choose my own goal</button>
        </div>`;

    const continuebtn = document.getElementById("ctn-btn");
    continuebtn.addEventListener("click", () => {
        // Redirect user to home page + store user goal
    })
}

function getResults() {
    let categoryTotals = {
        greenerEating: 0,
        transportation: 0,
        wasteReduction: 0,
        resourceConservation: 0,
        consciousConsumption: 0
    };

    let categoryCount = {
        greenerEating: 0,
        transportation: 0,
        wasteReduction: 0,
        resourceConservation: 0,
        consciousConsumption: 0
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
        if(Averages[category] > highestAvg) {
            highestAvg = Averages[category];
            highest = category;
        }
    }

    return highest;
}

document.addEventListener("DOMContentLoaded", () => {
    main();
})