const baseUrl = "https://api.openweathermap.org/data/2.5"
const iconUrl = "https://openweathermap.org/img/wn";
const appId = "01d63a53d2b4d0591c22681c048295ad";

const lat = -25.38;
const lon = -49.18;

async function getCurrentWeather(lat, lon) {
    const exclude = "minutely,hourly,daily,alerts"
    const parameters = `lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${appId}`;

    try
    {
        const result = await fetch(`${baseUrl}/weather?${parameters}`);
        const data = await result.json();
        return extractWeatherData(data);
    }
    catch(error)
    {
        console.error(error);
    }
}

async function getForecast(lat, lon) {
    const parameters = `lat=${lat}&lon=${lon}&units=metric&appid=${appId}`;

    try
    {
        const result = await fetch(`${baseUrl}/forecast?${parameters}`);
        const data = await result.json();

        let forecasts = [data.list[4], data.list[12], data.list[20]];
        forecasts = forecasts.map(f => extractWeatherData(f));

        return forecasts;
    }
    catch(error)
    {
        console.error(error);
    }
}

function extractWeatherData(data) {
    return {
        date: data.dt_txt ? new Date(data.dt_txt) : new Date(),
        temperature: data.main.temp,
        description: data.weather[0].description,
        high: data.main.temp_max,
        low: data.main.temp_min,
        humidity: data.main.humidity,
        sunrise: data.sys.sunrise ? new Date(data.sys.sunrise) : null,
        sunset: data.sys.sunset ? new Date(data.sys.sunset) : null,
        icon: data.weather[0].icon
    }
}

async function get4DaysWeather(lat, lon) 
{
    const current = await getCurrentWeather(lat, lon);
    const next = await getForecast(lat, lon);
    const result = [current, ...next];
    return result;
}

//
//
//

const temperatureSpan = document.querySelector("#temperature");
const descriptionSpan = document.querySelector("#weatherDescription");
const highSpan = document.querySelector("#high");
const lowSpan = document.querySelector("#low");
const humiditySpan = document.querySelector("#humidity");
const sunriseSpan = document.querySelector("#sunrise");
const sunsetSpan = document.querySelector("#sunset");
const weatherIcon = document.querySelector("#weatherIcon");

const forecast1Span = document.querySelector("#forecast1");
const forecast2Span = document.querySelector("#forecast2");
const forecast3Span = document.querySelector("#forecast3");

const businesesDiv = document.querySelector("#businesesGrid");

get4DaysWeather(lat, lon).then(weathers => {
    temperatureSpan.innerHTML = weathers[0].temperature.toFixed(0);
    descriptionSpan.innerHTML = weathers[0].description;
    highSpan.innerHTML = weathers[0].high.toFixed(0);
    lowSpan.innerHTML = weathers[0].low.toFixed(0);
    humiditySpan.innerHTML = weathers[0].humidity;
    sunriseSpan.innerHTML = weathers[0].sunrise.toLocaleTimeString();
    sunsetSpan.innerHTML = weathers[0].sunset.toLocaleTimeString();
    weatherIcon.src = `${iconUrl}/${weathers[0].icon}.png`;

    const forecastSpans = [forecast1Span, forecast2Span, forecast3Span];

    const forecastDatas = weathers.map((w, i) => ({
        day: w.date.toLocaleDateString('en-US', { weekday: 'long' }),
        temperature: w.temperature.toFixed(0)
    }));

    for (let i = 0; i < 3; i++)
    {
        forecastSpans[i].innerHTML = `
            <strong>${forecastDatas[i + 1].day}</strong>: ${forecastDatas[i + 1].temperature}°C
        `;
    }
});

async function getMembers() {
    const result = await fetch("data/members.json");
    const data = await result.json();

    const goldOrSilverMembers = data.members.filter(m => m.level > 1);

    const randomIndexes = [];
    while (randomIndexes.length < 3)
    {
        const randomIndex = Math.floor(Math.random() * goldOrSilverMembers.length);

        if (!randomIndexes.includes(randomIndex)) 
        {
            randomIndexes.push(randomIndex);
        }
    }

    const randomMembers = randomIndexes.map(i => goldOrSilverMembers[i]);

    businesesDiv.innerHTML = "";
    randomMembers.forEach(member => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="images/logo.webp" alt="image">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="https://${member.url}" target="_blank">${member.url}</a>
        `;
        businesesDiv.appendChild(li);
    });
}
getMembers();