let currentTemp = 0;
let isCelsius = true;

async function getWeather() {

    const city = document.getElementById("city").value;

    const apiKey = "23485e267d4949a99f765454262106";

    const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if(data.error){
            document.getElementById("weather").innerHTML =
            `<p>${data.error.message}</p>`;
            return;
        }

        currentTemp = data.current.temp_c;

        let emoji = "☀️";

        if(data.current.condition.text.includes("Rain")){
            emoji = "🌧️";
        }
        else if(data.current.condition.text.includes("Cloud")){
            emoji = "☁️";
        }

        document.getElementById("weather").innerHTML =
        `
        <h2>${emoji} ${data.location.name}</h2>
        <p>Temperature: <span id="temp">${currentTemp}</span> °C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        `;

    }
    catch(error){
        document.getElementById("weather").innerHTML =
        "<p>Something went wrong.</p>";
    }
}

function convertTemp(){

    const tempElement = document.getElementById("temp");

    if(!tempElement) return;

    if(isCelsius){

        const f = (currentTemp * 9/5) + 32;

        tempElement.innerText = f.toFixed(1);

        isCelsius = false;

    }else{

        tempElement.innerText = currentTemp.toFixed(1);

        isCelsius = true;
    }
}