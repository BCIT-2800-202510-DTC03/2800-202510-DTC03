const surveyQuestions = [
    {
        name: "How often do you eat out?",
        options: {
            o1: { desc: "Rarely (0-1 times a week)", point: 3 },
            o2: { desc: "Occasionally (2-3 times a week)", point: 2 },
            o3: { desc: "Frequently (4+ times a week)", point: 1 }
        },
        type: "greenerEating"
    },
    {
        name: "How do you usually get around?",
        options: {
            o1: { desc: "Walk or bike", point: 3 },
            o2: { desc: "Public transit", point: 2 },
            o3: { desc: "Drive alone", point: 1 }
        },
        type: "transportation"
    },
    {
        name: "How do you handle household waste?",
        options: {
            o1: { desc: "Compost and recycle consistently", point: 3 },
            o2: { desc: "Recycle sometimes", point: 2 },
            o3: { desc: "Mostly throw everything in the trash", point: 1 }
        },
        type: "wasteReduction"
    },
    {
        name: "How energy-efficient is your home?",
        options: {
            o1: { desc: "I actively monitor and reduce energy use", point: 3 },
            o2: { desc: "I try to conserve but don’t track it closely", point: 2 },
            o3: { desc: "I don’t do much to reduce energy use", point: 1 }
        },
        type: "energyConservation"
    },
    {
        name: "How often do you buy new items?",
        options: {
            o1: { desc: "Rarely – I try to reuse or buy second-hand", point: 3 },
            o2: { desc: "Sometimes – I mix new and used items", point: 2 },
            o3: { desc: "Frequently – I love shopping new", point: 1 }
        },
        type: "consciousConsumption"
    },
    {
        name: "How often do you use public transportation or carpooling?",
        options: {
            o1: { desc: "Very often", point: 3 },
            o2: { desc: "Occasionally", point: 2 },
            o3: { desc: "Never", point: 1 }
        },
        type: "transportation"
    },
    {
        name: "Do you recycle at home?",
        options: {
            o1: { desc: "Always", point: 3 },
            o2: { desc: "Sometimes", point: 2 },
            o3: { desc: "Never", point: 1 }
        },
        type: "wasteReduction"
    },
    {
        name: "How do you conserve water at home?",
        options: {
            o1: { desc: "Take shorter showers, fix leaks, use low-flow fixtures", point: 3 },
            o2: { desc: "Occasionally turn off the tap when not in use", point: 2 },
            o3: { desc: "Rarely think about water conservation", point: 1 }
        },
        type: "waterConservation"
    },
    {
        name: "How often do you use reusable products instead of single-use items?",
        options: {
            o1: { desc: "Very often", point: 3 },
            o2: { desc: "Sometimes", point: 2 },
            o3: { desc: "Never", point: 1 }
        },
        type: "sustainableHabits"
    },
    {
        name: "What factors influence your decision to buy eco-friendly products?",
        options: {
            o1: { desc: "Environmental impact", point: 3 },
            o2: { desc: "Cost", point: 2 },
            o3: { desc: "Brand reputation", point: 1 }
        },
        type: "consciousConsumption"
    }
];



var current = 0;
const userResponses = [];

function main() {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", getNextQuestion);
}

function getNextQuestion() {
    const startButton = document.getElementById("start-button");
    if (current > 0) {
        const selected = document.querySelector('input[name="option-' + (current - 1) + '"]:checked');
        if (selected) {
            userResponses.push(parseInt(selected.value));
        } else {
            alert("Please select an option before continuing.");
            return;
        }
    } else {
        const startText = document.getElementById("starting-text");
        startText.style ="display:none;"
        startButton.style="transform: translateX(50%) translateY(-100%);"
    }
    const surveyContainer = document.getElementById("questions-form");
    surveyContainer.innerHTML="";
    const questionName = document.getElementById("question-title");
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
    
}
main();