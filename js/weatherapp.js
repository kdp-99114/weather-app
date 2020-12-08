const api = {
    key: "c67f8cc38b170b1b191a90dc8a44982d",
    base: "http://api.openweathermap.org/data/2.5/"
}

var load = document.getElementsByTagName("body");

load.onload = document.querySelector('main').style.display = "none";

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C (min) / ${Math.round(weather.main.temp_max)}&deg;C (max)`;

    if(weather_el.textContent == 'Clear') {
        document.body.style.backgroundImage = "url(../images/clear.jpg)"
        document.getElementById('weather-img').src = "../icons/01d.png"
    } else if(weather_el.textContent == 'Haze' || weather_el.textContent == 'Smoke' || weather_el.textContent == 'Mist' ) {
        document.body.style.backgroundImage = "url(../images/haze.JPG)"
        document.getElementById('weather-img').src = "../icons/50d.png"
    } else if(weather_el.textContent == 'Rain') {
        document.body.style.backgroundImage = "url(../images/rain.jpg)"
        document.getElementById('weather-img').src = "../icons/10d.png"
    } else if(weather_el.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url(../images/cloud.jpg)"
        document.getElementById('weather-img').src = "../icons/04d.png"
    } else if(weather_el.textContent == 'Snow') {
        document.body.style.backgroundImage = "url(../images/snow.jpg)"
        document.getElementById('weather-img').src = "../icons/13d.png"
    } else if(weather_el.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url(../images/thunderstorm.jpg)"
        document.getElementById('weather-img').src = "../icons/11d.png"
    } else if(weather_el.textContent == 'Drizzle') {
        document.body.style.backgroundImage = "url(../images/drizzle.jpg)"
        document.getElementById('weather-img').src = "../icons/09d.png"
    }

    document.querySelector('main').style.display = "block";
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}