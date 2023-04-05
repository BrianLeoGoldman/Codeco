import { parseDate, chooseWeatherPic } from './functions.js';

const fetchNews = async () => {
    try {
        let news = document.getElementById("news");
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
            news.append(div); 
        });
    } catch(error) {
        console.log(error);
    }
}

const getWeather = async () => {
    try {
        let weather = document.getElementById("weather");
        const options = {
            method: 'GET',
        };
        const result = await fetch('http://www.7timer.info/bin/api.pl?lon=44.17&lat=23.09&product=civillight&output=json', options);
        const json = await result.json();
        const data = json.dataseries;
        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "forecast";
            let date = item.date;
            let weatherCode = item.weather;
            div.innerHTML = `
                <h4 class="title">${parseDate(date.toString())}</h4>
                <img class="weather-icon" src=${chooseWeatherPic(weatherCode)} alt="Weather icon">
            `;
            weather.append(div); 
        });
    } catch(error) {
        console.log(error);
    }
}

fetchNews();
getWeather();

