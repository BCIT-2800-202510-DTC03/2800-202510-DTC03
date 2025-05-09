let longitude = 0;
let latitude = 0;
let weather = "";
const API_key = "58b3a513722542c30fc78c2f02a5c896"

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
        console.log(data);
        return data.weather[0].main;
    });
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
                weather = "Clouds";
                break;
            default:
                break;
        }
        PlaceAnimation();
    } catch (error) {
        //default weather if we can't get location/weather data
        weather = "Clear";
    }
}
main();

//weather API key
//58b3a513722542c30fc78c2f02a5c896