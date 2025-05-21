let longitude = 0;
let latitude = 0;
let weather = "";

const backendURLTest = "http://localhost:3000";
const APIResponse = await axios.get(backendURLTest + "/API/weatherAPI", {
            withCredentials: true,
        });
const API_key = APIResponse.data.apiKey;

let css_file = "";
let js_file = "";
let html_layout = "";

function getLocation() {
    return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject("geolocation is not supported.");
        }
    })
}

function getWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`)
    .then((response) => response.json())
    .then(data => {
        return data.weather[0].main;
    });
}

function PlaceAnimation() {
    const container = document.getElementById("garden-weather");
    const head = document.head;
    const body = document.body;

    if(css_file !== ""){
        var stylesheet = document.createElement("link");
        stylesheet.href = css_file;
        stylesheet.rel = "stylesheet";
        stylesheet.id ="weather-css";
        head.appendChild(stylesheet);
    }
    if(js_file !== ""){
        var script = document.createElement("script");
        script.src = js_file;
        script.id = "weather-js";
        body.appendChild(script);
    }
    container.innerHTML = html_layout;
}

function AssignAnimation() {
    weather = "Snow";
    switch(weather) {
        case "Rain":
            // credits: https://codepen.io/arickle/pen/XKjMZY
            css_file = "../weather/rain.css";
            js_file = "../weather/rain.js";
            html_layout = `
        <body class="back-row-toggle splat-toggle">
        <div class="rain front-row"></div>
        <div class="rain back-row"></div>
        </body>`;
        break;
        case "Snow":
            // credits: https://pajasevi.github.io/CSSnowflakes/
            css_file = "../weather/snow.css";
            html_layout = `
            <div class="snowflakes" aria-hidden="true">
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
            </div>`;
            break;
        default:
            break;
    }
}


async function main() {
    try {
        const pos = await getLocation();
        longitude = pos.coords.longitude;
        latitude = pos.coords.latitude;
        weather = await getWeather();
        switch(weather){
            case "Thunderstorm":
                weather = "Rain";
                break;
            case "Drizzle":
                weather = "Rain";
                break;
            case "Atmosphere":
                weather = "Clear";
                break;
            case "Clouds":
                weather = "Clear";
            default:
                break;
        }
        AssignAnimation();
        PlaceAnimation();
    } catch (error) {
        //default weather if we can't get location/weather data
        weather = "Clear";
    }
}

main();

function getWeather() {
  return weather;
}

module.exports = { getWeather };

