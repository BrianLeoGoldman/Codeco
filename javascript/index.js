import { parseDate, chooseWeatherPic } from './functions.js';

const fetchNews = async () => {
    try {
        let newsDiv = document.getElementById("news");
        const result = await fetch("https://inshorts.deta.dev/news?category=all");
        const json = await result.json();
        const data = json.data;
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "carousel-item";
            div.innerHTML = `
                <a href="${item.url}"><h4 class="title">${item.title}</h4></a>
                <p class="text">${item.content}</p>
            `;
            newsDiv.append(div); 
        });
    } catch(error) {
        console.log(error);
    }
}

const getWeather = async () => {
    try {
        let weatherDiv = document.getElementById("weather");
        const options = {
            method: 'GET',
        };
        let lat = '-34.61315';
        let lon = '-58.37723';
        const result = await fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`, options);
        const json = await result.json();
        const data = json.dataseries;
        data.forEach(item => {
            const forecastDiv = document.createElement("div");
            forecastDiv.className = "forecast";
            let {date, weather, temp2m} = item;
            forecastDiv.innerHTML = `
                <h4 class="title">${parseDate(date.toString())}</h4>
                <img class="weather-icon" src=${chooseWeatherPic(weather)} alt="Weather icon">
                <p class="text">MIN: ${temp2m.min} Cº</p>
                <p class="text">MAX: ${temp2m.max} Cº</p>
            `;
            let loading = document.getElementById("loading");
            loading.classList.add("invisible");
            weatherDiv.append(forecastDiv); 
        });
    } catch(error) {
        console.log(error);
    }
}

fetchNews();
getWeather();

